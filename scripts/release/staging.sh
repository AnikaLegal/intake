#/bin/bash
set -e

export $(grep -v '^#' env/staging.env | xargs)
. ./scripts/build.sh
. ./scripts/deploy.sh
