#/bin/bash
set -e

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

# Upload HTML with no cache, gzip encoding
echo -e "\nUploading HTML"
aws s3 cp \
    --recursive \
    --content-encoding 'gzip' \
    --exclude '*' \
    --include '*.html' \
    --acl public-read \
    ./dist \
    $S3_BUCKET_URL

# Upload CSS + JS with cache and gzip
echo -e "\nUploading JS + CSS"
aws s3 cp \
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
echo -e "\nUploading other assets"
aws s3 cp \
    --recursive \
    --exclude '*.css' \
    --exclude '*.js' \
    --exclude '*.map' \
    --exclude '*.html' \
    --cache-control $CACHE_CONTROL \
    --acl public-read \
    ./dist \
    $S3_BUCKET_URL


# # Clean up so you don't shoot yourself in the foot when doing dev work.
echo "Cleaning up post build..."
rm -rf ./dist
yarn html
echo "Done."
