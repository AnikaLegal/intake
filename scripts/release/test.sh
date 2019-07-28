#/bin/bash
set -e

export STATIC_URL=https://test-repairs.anikalegal.com/static/
export SERVER=https://test-clerk.anikalegal.com
export S3_BUCKET_URL=s3://test-repairs.anikalegal.com
export SENTRY_JS_DSN=
export GA_ID=

. ./scripts/build.sh
. ./scripts/deploy.sh
