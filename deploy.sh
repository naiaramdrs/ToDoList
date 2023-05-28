#!/usr/bin/env bash

set -xe

echo Building backend
cd back
npm i
npm run build
cd ..
mv back/build deploy

echo Building frontend
cd front
npm i
npm run build
cd ..
mv front/dist deploy/public

cp .env deploy/.env

cd deploy
npm i --production
mkdir tmp
node ace migration:run --force