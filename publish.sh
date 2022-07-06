#!/bin/sh
rm -rf ./out/*
cd out
git init
git remote add origin git@github.com:n0rt3l/n0rt3l.github.io.git
git pull
cd ..
npm run build
cd out
git add -A
git commit -m "publish commit"
git branch -M main
git push -u origin main
