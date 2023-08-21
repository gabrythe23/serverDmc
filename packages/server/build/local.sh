#!/usr/bin/env bash

docker build \
 --build-arg PROJECT="$PROJECT"  \
 -t "asset-manager-$PROJECT:latest"\
 --platform=linux/arm64 .
