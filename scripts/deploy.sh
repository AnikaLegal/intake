#/bin/bash
set -e

# https://docs.sentry.io/platforms/javascript/sourcemaps/
# https://docs.sentry.io/cli/releases/#upload-source-maps?platform=javascript#upload-source-maps
COMMIT_HASH=$(git rev-parse HEAD)

if [ -z "$SENTRY_PROJECT" ]
then
    # Do not do anything with Sentry
    echo -e "\n>>> Nothing to upload to Sentry"
else
    if [ -z "$SENTRY_AUTH_TOKEN" ]
    then
        echo "Error: SENTRY_AUTH_TOKEN must be set"
        exit 1
    fi
    # Create a new release in Sentry
    echo -e "\n>>> Creating release $COMMIT_HASH in Sentry project $SENTRY_PROJECT"
    yarn sentry-cli \
        --auth-token=${SENTRY_AUTH_TOKEN} \
        releases \
        --org=${SENTRY_ORG} \
        --project=${SENTRY_PROJECT} \
        new $COMMIT_HASH

    # Upload sourcemaps to Sentry release
    echo -e "\n>>> Uploading sourcemaps to Sentry project $SENTRY_PROJECT"
    yarn sentry-cli \
        --auth-token=${SENTRY_AUTH_TOKEN} \
        releases \
        --org=${SENTRY_ORG} \
        --project=${SENTRY_PROJECT} \
        files $COMMIT_HASH upload-sourcemaps \
        dist/build/ \
        --rewrite \
        --validate \
        --url-prefix '~/build/'
fi

# Compress HTML, JS, CSS
COMPRESS="html js css"
for SUFFIX in $COMPRESS
do
    FILES=$(find dist/ -name "*.$SUFFIX")
    for FILE in $FILES
    do
        gzip $FILE
        mv ${FILE}.gz $FILE
    done
done

CACHE_CONTROL="max-age=86400"
for S3_BUCKET_URL in $S3_BUCKET_URLS
do
    echo "\n>>> Uploading assets to S3 bucket $S3_BUCKET_URL"

    # Upload HTML with no cache, gzip encoding
    echo -e "\nUploading HTML to $S3_BUCKET_URL"
    aws s3 cp \
        --profile anika \
        --recursive \
        --content-encoding 'gzip' \
        --exclude '*' \
        --include '*.html' \
        --acl public-read \
        ./dist \
        $S3_BUCKET_URL



    # Upload CSS + JS with cache and gzip
    echo -e "\nUploading JS + CSS to $S3_BUCKET_URL"
    aws s3 cp \
        --profile anika \
        --recursive \
        --content-encoding 'gzip' \
        --exclude '*' \
        --include '*.css' \
        --include '*.js' \
        --cache-control $CACHE_CONTROL \
        --acl public-read \
        ./dist \
        $S3_BUCKET_URL

    # Upload everything else with cache and no gzip
    echo -e "\nUploading other assets to $S3_BUCKET_URL"
    aws s3 cp \
        --profile anika \
        --recursive \
        --exclude '*.css' \
        --exclude '*.js' \
        --exclude '*.map' \
        --exclude '*.html' \
        --cache-control $CACHE_CONTROL \
        --acl public-read \
        ./dist \
        $S3_BUCKET_URL
done

# Finalize Sentry release
if [ -z "$SENTRY_PROJECT" ]
then
    # Do not do anything with Sentry
    echo -e "\nNothing to finalize with Sentry"
else
    # Finalize the release in Sentry
    echo -e "\nFinalizing release $COMMIT_HASH in Sentry project $SENTRY_PROJECT"
    yarn sentry-cli \
        --auth-token=${SENTRY_AUTH_TOKEN} \
        releases \
        --org=${SENTRY_ORG} \
        --project=${SENTRY_PROJECT} \
        finalize $COMMIT_HASH

    echo -e "\nCreating a $SENTRY_ENV deploy for release $COMMIT_HASH in Sentry project $SENTRY_PROJECT"
    yarn sentry-cli \
        --auth-token=${SENTRY_AUTH_TOKEN} \
        releases \
        --org=${SENTRY_ORG} \
        --project=${SENTRY_PROJECT} \
        deploys $COMMIT_HASH new --env $SENTRY_ENV
fi


# # Clean up so you don't shoot yourself in the foot when doing dev work.
echo "Cleaning up post build..."
rm -rf ./dist
echo "Done."
