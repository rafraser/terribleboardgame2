#!/usr/bin/env bash
# Build both the server + the Vue application
# The end result will be in the dist/ folder
cd server && npm run build && cd -
cd vue && npm run build && cd -