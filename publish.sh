#!/bin/sh
git clone git@github.com:n0rt3l/n0rt3l.github.io.git ./github
npm run build
mv ./github/.git ./out/
cd out
echo > .nojekyll
git add -A
git commit -m "publish commit"
git branch -M main
git push -u origin main
