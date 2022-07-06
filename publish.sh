#!/bin/sh
rm -rf ./out
git clone git@github.com:n0rt3l/n0rt3l.github.io.git ./out
npm run build
cd out
git add -A
git commit -m "publish commit"
git branch -M main
git push -u origin main
