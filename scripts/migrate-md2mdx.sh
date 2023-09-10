#!/bin/bash

# 指定目录路径
directory="./data"

# 递归查找并修改文件名
find "$directory" -type f -name "*.md" -exec sh -c 'mv "$0" "${0%.md}.mdx"' {} \;