#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build:h5

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# git remote remove origin
git remote add gitee https://gitee.com/flyingwxb/date-punch-taro.git

# 如果你要部署在 https://<USERNAME>.github.io
git push -f gitee   main:deploy

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -
