---
title: React 编程新范式 - React Server Component
date: '2023-10-17'
tags: ['react', 'next', 'rsc', 'ssr']
draft: false
summary: '理解 RSC'
---

- [相关名词汇总](#相关名词汇总)
- [RSC 的整体介绍](#rsc-的整体介绍)
- [为什么设计 RSC？RSC 有什么用，解决了什么问题？](#为什么设计-rscrsc-有什么用解决了什么问题)
  - [React 世界中的 CSR 和 SSR](#react-世界中的-csr-和-ssr)
  - [React 世界中的数据请求](#react-世界中的数据请求)
  - [进一步认识 RSC](#进一步认识-rsc)
  - [RSC 和普通客户端组件共存时候的限制条件](#rsc-和普通客户端组件共存时候的限制条件)
  - [RSC 范式下特有的渲染数据格式](#rsc-范式下特有的渲染数据格式)
  - [实用的使用场景举例](#实用的使用场景举例)
- [未来 RSC](#未来-rsc)
- [参考资料](#参考资料)
  - [React Official Doc - React Server Components](#react-official-doc---react-server-components)
  - [Making Sense of React Server Components](#making-sense-of-react-server-components)
  - [RSC From Scratch. Part 1: Server Components](#rsc-from-scratch-part-1-server-components)
  - [React-Server-Components-From-Scratch - code flow](#react-server-components-from-scratch---code-flow)
  - [React Server Components: A Comprehensive Breakdown](#react-server-components-a-comprehensive-breakdown)
  - [servercomponents.dev](#servercomponentsdev)

## 相关名词汇总

- RSC: React Server Component 服务端组件
- SPA: Single Page Application 单页面应用
- MPA: Multiple Page Application 多页面应用
- CSR: Client Side Rendering 客户端渲染
- SSR: Server Side Rendering 服务端渲染
- SSG: Static Site Generator 静态页面生成（一种特殊的 SR）
- Hydration: 水合，指 SSR 模式下让静态不可交互页面变得可交互的过程
- FP: First Paint，是浏览器渲染任何在用户屏幕上可见的内容之后的时间
- FCP: First Content Paint，是浏览器渲染来自 DOM 的第一位内容（如文本，图像，背景图像或画布元素）后的时间
- TTI: Time to Interactive，指的是页面可交互的时间，其被定义为页面在足够稳定的时间，能忍受用户输入的响应

## RSC 的整体介绍

- RSC 是由 React 团队设计的一种新的应用架构。
  - 是一种开发范式的转变
  - 在开发的时候优先考虑服务端的渲染
- RSC 的设计理念结合了 SPA 和 MPA
- 在构建过程中，可以提前解析渲染并从 JavaScript 包中排除该 RSC 相关的代码
- 在服务器组件可以在不使用传统客户端渲染发送请求的方式来访问你的数据层，而是直接访问服务端相关代码，同时还能从文件系统读取或获取静态内容
- 当前自己运用 RSC 提供的能力完成一个应用需要配置很多打包逻辑，一般推荐使用第三方的框架封装，如 [next.js](https://github.com/vercel/next.js)、[remix](https://github.com/remix-run/remix)、[waku](https://github.com/dai-shi/waku) 等

## 为什么设计 RSC？RSC 有什么用？解决了什么问题？

### 什么是 CSR 和 SSR

最初大家用 React 编写 Web 应用基本采用 CRA（create-react-app）脚手架来创建 CSR（客户端渲染应用）  
下面是常见的最终产物页面代码形式

```html
<!doctype html>
<html>
  <body>
    <div id="root"></div>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>
```

但这样的应用无法满足 SEO 的需求，以及巨大的 bundle.js（包含 React、其他第三方依赖代码）往往需要较长的首屏加载时间

为了解决 SEO 的首要痛点，next.js 框架提供了`在服务端完成首次后台数据请求并填充到 React 模板生成对应的有实际意义的 html 发送到客户端`的 SSR（服务端渲染）模式

但是这个返回的 html 还是存在 bundle.js，这个时候这个 bundle.js 主要用于 Hydration-水合（让页面变得可以交互，事件、状态管理等）

```txt
Hydration is like watering the “dry” HTML with the “water” of interactivity and event handlers. - Dan Abramov

Hydration 就像用交互性和事件处理器的“水”来浇灌“干燥”的 HTML。
```

另外我们熟知的`SSG` 是 `SSR` 的一个变种，但一般在打包完成后服务端依赖的数据就被凝固了，一般不会在请求的时候发生动态的数据变化

### CSR 和 SSR 分别怎么实现数据请求

采用 CSR 形式前后端分离的模式一般涉及两个应用，一个客户端 React 程序和一个 RESTFul API 应用程序，请求形式如下图

![Ckp53X](https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/Ckp53X.png)

下面展示的 SSR 下的请求示意图

![J9gKa6](https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/J9gKa6.png)

SSR 的做法除了让页面具备了 SEO 的能力同时提升了页面首屏内容渲染（FP/FCP）的页面性能指标但是并没有提升页面可交互时间（TTI）指标

![ajfVqm](https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/ajfVqm.png)

查看 SSR 模式下的流程图会发现查询数据是在客户端发送请求到服务端服务端再进一步响应的，可不可以把数据请求这个流程前置

想象一下在没有 RSC 的时候使用 SSR 我们可以怎么实现这样的效果

![gEgmYL](https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/gEgmYL.png)

假设你的整个页面只涉及到一个影响全局页面的 get 请求，早期的 next.js 框架你只需要定义一个 getServerSideProps 来请求 API 并把获取到的数据作为顶层 Props 注入到这个页面组件  
而有了 RSC 之后的能力的区别就是不再需要定义这个 getServerSideProps 函数，而是直接在组件内部请求数据，然后使用这个数据，示例代码如下

```tsx
// 在传统的 next.js SSR 模式下
import db from 'imaginary-db'
// 这段代码只能在服务器上运行
export async function getServerSideProps() {
  const link = db.connect('localhost', 'root', 'passw0rd')
  const data = await db.query(link, 'SELECT * FROM products')
  return {
    props: { data },
  }
}
// 这段代码在服务器和客户端上运行
export default function Homepage({ data }) {
  // 在运用了 RSC 能力之后可以把 getServerSideProps 的能力搬到组件内部
  const link = db.connect('localhost', 'root', 'passw0rd')
  const data = await db.query(link, 'SELECT * FROM products')

  return (
    <>
      <h1>Trending Products</h1>
      {data.map((item) => (
        <article key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </article>
      ))}
    </>
  )
}
```

如果这个真实的 App 应用涉及到很多的 get 请求，我们需要在 getServerSideProps 这个函数中完整请求所有我们需要的服务端数据  
显然在真实情况中我们不能这么实现，所有的 get 请求在第一次请求中全部获取会有非常长时间的加载时间，另外我们还涉及到各种用户交互操作下的请求逻辑，所以说上图把所有请求挪到最前面只是一个理想的状态  
另外早期 next.js 和有了 RSC 的主要区别在于之前只能在页面或者路由层级做的事情，现在可以变成组件级别，也就是说我们有了更精细控制我们数据请求的代码编写空间

### 进一步认识 RSC

通过上面从 SSR 的进一步引入，我们已经知道他的一般特性就是可以直接在组件中发送请求获取数据，并且这个组件不需要在客户端中渲染  
RSC 和以前纯纯在客户端运行的组件想必并不是一个运行在服务端一个运行在客户端的区别，更准确的区分标准是按照下图所示的

![QULOVH](https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/QULOVH.png)

另外对于 RSC 有一些限制，如果这个组件是一个 RSC 他就不像现在的组件一样定义例如 useState、useEffect、useContext 或者 ContextProvider 之类的常见 React API  
不能在 RSC 中使用 BOM，如果使用 BOM 相关的方法但是可以忽略记得给方法加上 SERVER 端运行的容错，因为客户端组件也会在服务端运行，不然代码会报错  
所有需要被标识为客户端组件的组件需要在组件的头部用'use client'做标识  
下面是一个客户端组件的标记示例

```tsx
'use client'
import React from 'react'
function Counter() {
  const [count, setCount] = React.useState(0)
  return <button onClick={() => setCount(count + 1)}>Current value: {count}</button>
}
export default Counter
```

由于 RSC 在服务端被渲染，组件相关的代码就不需要加入 bundle.js，所以在编写代码的时候有一个注意点是所以可以成为 RSC 的组件尽量让他是 RSC，这样才能充分发挥 RSC 的作用，提升整个 App 的性能

### RSC 和普通客户端组件共存时候的限制条件

由于普通客户端组件如果定义了 state，就有可能将该 state 作为一个可相应更新的 prop 传递给子组件，如果一个 RSC 作为这个客户端组件的子组件，且 RSC 有只渲染一次不在响应更新的特性，就会导致应用出现问题，所以一旦在应用树的某个组件定义成了客户端组件，那这个组件的子组件也默认成为客户端组件

![kGujis](https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/kGujis.png)

但是这句话又不一定是绝对的例如一个 ContextProvider 被标记为客户端组件了，按照上面的说法他包裹的所有组件就成为客户端组件了  
但是由于 ContextProvider 中的 state 并不一定被他包裹的所有组件都用到，所以在这种情况下其中还是可以存在很多被优化的基于 RSC 的子树  
但是需要注意的是原来在 ContextProvider 中定义一个 state 然后靠一个 dispatch 可以改变 state 并且可以让页面组件自己重新渲染的模式理论上不再起效，需要变通实现

```tsx
'use client'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants.js'
import Header from './Header'
import MainContent from './MainContent'
function Homepage() {
  const [colorTheme, setColorTheme] = React.useState('light')
  const colorVariables = colorTheme === 'light' ? LIGHT_COLORS : DARK_COLORS
  return (
    <body style={colorVariables}>
      <Header />
      <MainContent />
    </body>
  )
}
```

```tsx
// /components/Homepage.js
import Header from './Header'
import MainContent from './MainContent'
import ColorProvider from './ColorProvider'
function Homepage() {
  return (
    <ColorProvider>
      <Header />
      <MainContent />
    </ColorProvider>
  )
}
```

对于这种有 RSC 和客户端组件交错的场景，在页面请求返回的结果中会有一些客户端组件的插槽信息告诉 React 要怎么渲染这个应用

```tsx
function Homepage() {
  return <p>Hello world!</p>
}
```

```tsx
<!DOCTYPE html>
<html>
  <body>
    <p>Hello world!</p>
    <script src="/static/js/bundle.js"></script>
    <script>
      self.__next['$Homepage-1'] = {
        type: 'p',
        props: null,
        children: "Hello world!",
      };
    </script>
  </body>
</html>
```

其中可以看到有冗余的两个表示一样信息的描述，一个是已经渲染好的 html，一个是告诉 React 要怎么渲染的描述  
前者其实是 SSR 作用的结果，例如如果配合 next.js 这样 SSR 起家的框架，就会尽可能多的渲染可以被渲染的 RSC 和客户端组件中可以被渲染的部分  
可以理解为现在 React 具备了在服务端被提前消化吸收一部分的能力，比如酸奶就比直接喝牛奶有更高的吸收效率  
综上来说，搭配了 RSC 的 next.js 相较于之前主要的好处是可以在服务端渲染颗粒度更细的内容，减少更多的 bundle.js 体积，从而提高页面的加载速度，主要是提高了 TTI 指标

### RSC 范式下特有的渲染数据格式

[以 waku 的官网传输的数据为例](https://waku.gg/docs/practices/router)  
![RNqKgU](https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/RNqKgU.png)  
可以手动复制上面图中传输的信息到[解析器](https://rsc-parser.vercel.app/)查看传输信息表示的含义  
总的来说可以看到一些已经被 SSR 为 HTML 的 RSC 和留的一些插槽信息表示客户端组件  
![Ftaxsv](https://cdn.jsdelivr.net/gh/klaaay/pbed@main/uPic/Ftaxsv.png)

### 实用的使用场景举例

例如你需要利用一个代码高亮库来进行代码高亮，由于他涵盖了很多的语言所以他基本需要好几个 mb，现在可以把这个逻辑交给服务端来做，直接返回高亮好结果的 html 和 css 样式结果  
最小化的使用示例建议参考[waku 的 example](https://github.com/dai-shi/waku/blob/main/examples/01_counter/src/entries.tsx)

## 未来 RSC

总的来说 RSC 概念虽然出现了很久，但现在还是金丝雀版本，目前看上去成熟可用的还只是 next.js 这一个框架的 App Router 模式，未来应该会有更多的框架封装 RSC 的能力，以及更多提供轻量能力的框架封装，以及配合 React 中 Suspense 以及前不久刚稳定的 Server Action 等能力进一步提升开发体验

## 对 RSC 的看法

社区中有很多声音说这样的开发模式仿佛回到了写 php 代码的感觉，个人感觉从写代码的心智负担上确实是这样，但更进一步的去看编码的内容其实完全不是这样，现在 RSC 这样的模式，说到底你还是在 JSX，只是现在 JSX 有了更多的能力，当然也有了更多的限制  
但由于这样的模式在编码的时候说到底还是非前后端分离的，以及打包过程中做的很多事情，以及背后封装的数据传输逻辑完全是不被开发者感知的，所以很多时候面对性能问题，以及数据安全相关问题，你往往是不容易考虑周全的，以及很多时候你只能依赖框架封装的能力所以是很无力的  
总的来说任何一件东西肯定有利有弊，还是需要根据实际需要来看是不是适合于当前的团队和业务

## 参考资料

### [React Official Doc - React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)

### [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/)

### [React Server Components: A Comprehensive Breakdown](https://www.youtube.com/watch?v=VIwWgV3Lc6s&list=WL&index=4&ab_channel=Theo-t3%E2%80%A4gg)

### [RSC From Scratch. Part 1: Server Components](https://github.com/reactwg/server-components/discussions/5)

### [React-Server-Components-From-Scratch - code flow](https://dev.to/bronifty/react-server-components-from-scratch-39ac)

### [servercomponents.dev](https://servercomponents.dev/)
