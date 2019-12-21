#/bin/bash
set -e

case $CIRCLE_BRANCH in
    "develop")
        . ./scripts/envars/test.sh
        ;;
    "master")
        . ./scripts/envars/prod.sh
        ;;
esac

. ./scripts/deploy.sh
