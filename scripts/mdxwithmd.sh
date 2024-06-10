#!/bin/bash

# 指定目录路径
directory="./data"

# 递归查找 mdx 文件，并创建相同内容但扩展名为 .md 的文件
find "$directory" -type f -name "*.mdx" -exec sh -c 'cp "$0" "${0%.mdx}.md"' {} \;
