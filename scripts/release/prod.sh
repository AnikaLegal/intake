#/bin/bash
set -e

export $(grep -v '^#' env/prod.env | xargs)
. ./scripts/build.sh
. ./scripts/deploy.sh
