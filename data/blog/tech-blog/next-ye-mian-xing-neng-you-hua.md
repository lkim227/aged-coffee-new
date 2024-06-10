---
title: next 页面性能优化
date: '2023-12-25'
tags: ['common','original']
draft: false
summary: "Next.js 是一个基于 React 的框架，这篇文章主要介绍如何优化 Next.js 页面性能，提高网页加载速度和用户体验。"
---

<TOCInlineWithSticky toc={props.toc} />

## 开启 gzip 或者 brotli 压缩

一般如果动静分离已经将静态资源上传到了 CDN，正常 CDN 都是开启了以上的压缩方案的  
如果没有开启需要开启相关能力

## 图片压缩

尽量使用 webp 格式图片和压缩图片，可以减少图片的请求大小，从而减少加载时间，提升性能。  
```
如果是部署于 vercel 平台的服务图片默认开启相关的优化逻辑
```

## 图片懒加载

图片懒加载是一种常见的提升网页性能的技术，它会等到图片进入视窗再开始加载它们，可以避免一开始加载过多的资源。

```tsx
<Image loading="lazy" src={renderItem.img} alt="" fill  />
```

## 添加 dns-prefetch、preconnect meta 标签

DNS 预获取 (dns-prefetch) 和预连接 (preconnect) 是两种让浏览器提前进行域名解析和建立 TCP 握手的技术  
在加载一个新的页面时，浏览器需要花费一定的时间来解析域名和建立 TCP 握手。我们可以通过添加 dns-prefetch 和 preconnect meta 标签来预先完成这些操作，从而显著提高页面加载速度

```tsx
<Head>
  <link rel="dns-prefetch" href="//example.com" />
  <link rel="preconnect" href="//example.com" />
</Head>
```

## [自部署 next 服务的自定义图片 loader 优化](https://nextjs.org/docs/app/api-reference/components/image#loader)

下面的代码展示了一个自定义的图片 loader，它可以将图片优化的功能外包到另一个服务。

```tsx
'use client'

import React, { ComponentProps } from 'react';
import Image from 'next/image';

export const CustomLoaderImg = (props: ComponentProps<typeof Image>) => {
  return (
    <Image
      {...props}
      loader={({ src, width, quality }) => {
        // 确认一个可用的图片优化服务之后替换
        return `https://optimize-img.com?url=${src}?w=${width}&q=${quality || 75}`;
      }}
    />
  );
};
```

## 部分逻辑组件和渲染内容独立于服务端渲染

有些组件作为用户交互之后才需要展示的内容，例如预留好插槽的 Modal 组件，类似这样的组件没有服务器端渲染的必要，可以考虑修改他的实现为仅客户端渲染。同样，如果你正在渲染和时间有关的内容，由于服务器和客户端的时间可能存在微小差异，也可能导致错误。

这可以通过以下方法实行：

1. 使用 next 提供的 dynamic 

```tsx
import dynamic from 'next/dynamic';

//仅在客户端动态导入并渲染 Modal 组件
const DynamicModal = dynamic(
  () => import('../components/Modal'),
  { ssr: false }  // 这将禁用服务器端渲染（SSR）
);

// 仅在客户端动态导入并渲染 Time 相关组件
const DynamicTime = dynamic(
  () => import('../components/Time'),
  { ssr: false }  // 这将禁用服务器端渲染（SSR）
);
```

2. useEffect 中动态引入

```tsx
import React, { useState, useEffect } from 'react';

function YourComponent() {
  const [DynamicComponent, setDynamicComponent] = useState(null);

  useEffect(() => {
    import('../components/Modal').then((Modal) => {
      setDynamicComponent(() => Modal.default); // 注意 Modal.default
    });
  }, []);

  if (!DynamicComponent) return <p>Loading...</p>;

  return <DynamicComponent />;
}
```

3. 首帧之后才实际渲染最终内容

```tsx
import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';

function YourComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 在 useEffect 中设置标志表示现在是在客户端了
    setIsClient(true);
  }, []);

  if (!isClient) return <p>Loading...</p>;

  return <Modal />;
}
```

## 打包静态资源上传到 CDN 的插件

以下代码展示了如何将打包后的静态文件上传到 CDN，这样可以显著减少服务器的负载，同时由于 CDN 通常都具备很好的地理分布和加载优化，所以使用 CDN 可以进一步提升用户的加载体验。

```tsx
/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable max-depth */
const request = require('request');

function getCdnUrlPrefix(options) {
  return `${options.packageVersion}/${options?.isEnvProduction ? 'prod' : 'dev'}`;
}

function UploadCDN(options) {
  this.isEnvProduction = options?.isEnvProduction ?? false;
  this.options = options;
}

function upload(options) {
  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) reject(error);
      resolve();
    });
  });
}
UploadCDN.prototype.apply = function (compiler) {
  // eslint-disable-next-line react-func/max-lines-per-function
  compiler.hooks.emit.tapAsync('UploadCDN', async (compilation, callback) => {
    // formData list
    let optionsMap = {};
    let commonOptions = {
      method: 'POST',
      url: 'https://your-cdn-serverice/api/v1/files',
      headers: {
        module: this.options.module,
        _dir: '/',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      formData: {},
    };
    for (let fileName in compilation.assets) {
      if (!fileName.endsWith('map')) {
        const parts = fileName.split('/');
        const filename = parts.pop();
        const _dir = `${getCdnUrlPrefix(this.options)}/_next/${parts.join('/')}`;
        const formData = {
          value: compilation.assets[fileName].source(),
          options: {
            filename,
            contentType: null,
          },
        };
        if (!optionsMap[_dir]) {
          optionsMap[_dir] = {
            ...JSON.parse(JSON.stringify(commonOptions)),
          };
          optionsMap[_dir].headers._dir = _dir;
        }
        optionsMap[_dir].formData[filename] = formData;
      }
    }

    const optionsArr = Object.keys(optionsMap).map(key => optionsMap[key]);
    optionsArr.forEach(async options => await upload(options));
    callback();
  });
};

module.exports = {
  UploadCDN,
};
```

```js
// next.config.js
// ...
  assetPrefix: isProd ? `https://your-cdn-serverice/${yourModule}/${moduleName}/${packageVersion}/prod` : undefined,
  webpack: (config, context) => {
    isProd &&
      config.plugins.push(
        new UploadCDN({
          module: moduleName,
          packageVersion,
          isEnvProduction: isProd,
        }),
      );

    return config;
// ...
```

## 推荐阅读

[Next.js 官方文档](https://nextjs.org/docs/)  
[Google - Web 性能优化指南](https://developers.google.com/web/fundamentals/performance/why-performance-matters/)。