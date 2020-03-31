#/bin/bash
set -e

echo "Using production environment variables."
export STATIC_URL=https://repairs.anikalegal.com/static/
export SERVER=https://clerk.anikalegal.com
export S3_BUCKET_URLS="s3://repairs.anikalegal.com s3://covid.anikalegal.com"
export SENTRY_JS_DSN=https://d562328a33ab4c1782706574e8a0bd92@sentry.io/1468089
export SENTRY_ENV=prod
export SENTRY_ORG=anika-legal
export SENTRY_PROJECT=intake
export GA_ID=UA-133303109-1
export HOTJAR_ID=1449266
export FB_PIXEL_ID=580273702543728