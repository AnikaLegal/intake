#!/bin/bash
set -e
S3_BUCKET_URL=s3://storybook.anikalegal.com

mkdir -p story
cp -R public/static story/static
yarn build-storybook \
    --output-dir story \
    --static-dir static

aws s3 cp \
    --profile anika \
    --recursive \
    --acl public-read \
    ./story \
    $S3_BUCKET_URL
