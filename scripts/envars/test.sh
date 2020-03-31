#/bin/bash
set -e

echo "Using test environment variables."
export STATIC_URL=https://test-repairs.anikalegal.com/static/
export SERVER=https://test-clerk.anikalegal.com
export S3_BUCKET_URLS="s3://test-repairs.anikalegal.com s3://test-covid.anikalegal.com"
export SENTRY_JS_DSN=https://d562328a33ab4c1782706574e8a0bd92@sentry.io/1468089
export SENTRY_ENV=test
export SENTRY_ORG=anika-legal
export SENTRY_PROJECT=intake
export GA_ID=UA-133303109-2
export HOTJAR_ID=1449271
export FB_PIXEL_ID=
