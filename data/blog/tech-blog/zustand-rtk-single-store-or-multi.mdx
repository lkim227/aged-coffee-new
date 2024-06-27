---
title: Zustand 和 Redux Toolkit (RTK) 在应用中的 Store 设计：单 Store 还是多 Store？
date: '2024-06-27'
tags: ['react','original',"ai-partner"]
draft: false
summary: ""
---

在现代 React 应用中，状态管理是一个核心问题。如何组织和设计状态管理，直接影响到应用的性能、可维护性和开发效率。Zustand 和 Redux Toolkit (RTK) 是两种流行的状态管理工具，它们在设计上有不同的理念和实现方式。本文将探讨如何在应用中使用 Zustand 和 RTK 时设计单 Store 或多 Store 的策略，以及它们之间的交互和数据共享。

## Zustand 和 RTK 的设计理念

Zustand 是一个轻量级的状态管理库，强调简洁和灵活。它的 API 非常简单，可以用来管理局部或全局状态。Zustand 的 store 是通过一个函数创建的，并且可以任意创建多个独立的 store。

Redux Toolkit (RTK) 是 Redux 的官方推荐工具包，提供了简化的 API 和增强的功能。RTK 强调集中化的状态管理，通常在应用中只有一个全局的 store，通过使用 createSlice 和 createAsyncThunk 等工具，将状态逻辑模块化，但最终仍然集中在一个 store 中。

## Zustand 的单 Store 和多 Store 设计

### 单一 Store

在使用 Zustand 时，通常的做法是在应用中只有一个 store，管理所有的状态：

```tsx
import create from 'zustand';

const useStore = create(set => ({
  user: { name: 'Alice', age: 25 },
  theme: 'light',
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme })
}));

// 在组件中使用
const Component = () => {
  const { user, theme, setUser, setTheme } = useStore(state => ({
    user: state.user,
    theme: state.theme,
    setUser: state.setUser,
    setTheme: state.setTheme
  }));

  return (
    <div>
      <p>User: {user.name}</p>
      <p>Theme: {theme}</p>
      <button onClick={() => setUser({ name: 'Bob', age: 30 })}>Change User</button>
      <button onClick={() => setTheme('dark')}>Change Theme</button>
    </div>
  );
};
```
**优点：**  
+ 简单易用，所有状态都在一个地方管理。
+ 适合小到中型应用，状态不多时管理起来非常方便。
+ 避免了跨 store 的数据同步和共享问题。


**缺点：**  
+ 当状态复杂且频繁更新时，单一 store 可能会变得难以维护。
+ 大量的状态更新可能会导致性能问题，因为所有状态变更都会触发 store 的重新计算。

### 多个 Store

在需要更加细粒度控制和性能优化时，可以考虑将状态拆分到多个独立的 store 中：

```tsx
// userStore.js
import create from 'zustand';

export const useUserStore = create(set => ({
  user: { name: 'Alice', age: 25 },
  setUser: (user) => set({ user })
}));

// preferencesStore.js
import create from 'zustand';

export const usePreferencesStore = create(set => ({
  theme: 'light',
  setTheme: (theme) => set({ theme })
}));
```

在组件中可以根据需要使用不同的 store：

```tsx
const UserComponent = () => {
  const { user, setUser } = useUserStore();
  return (
    <div>
      <p>User: {user.name}</p>
      <button onClick={() => setUser({ name: 'Bob', age: 30 })}>Change User</button>
    </div>
  );
};

const PreferencesComponent = () => {
  const { theme, setTheme } = usePreferencesStore();
  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Change Theme</button>
    </div>
  );
};
```

**优点：**  
+ 更好的性能：只有相关的 store 会在状态变化时重新计算。
+ 模块化：每个 store 管理自己的一部分状态，降低了单一 store 的复杂度。
+ 隔离性：不同的状态模块之间相互独立，减少了状态之间的耦合。

**缺点：**  
+ 需要处理跨 store 的数据共享和同步。
+ 增加了状态管理的复杂度，特别是在需要跨多个 store 协同工作时。

## RTK 的单 Store 和多 Store 设计

### 单一 Store（推荐）

RTK 和 Redux 的核心理念是单一 store，即整个应用通常只有一个 store，所有状态都集中管理：

```tsx
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import preferencesReducer from './preferencesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    preferences: preferencesReducer
  }
});
```

在组件中，通过 useSelector 和 useDispatch 使用全局状态：

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './userSlice';
import { setTheme } from './preferencesSlice';

const Component = () => {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.preferences.theme);
  const dispatch = useDispatch();

  return (
    <div>
      <p>User: {user.name}</p>
      <p>Theme: {theme}</p>
      <button onClick={() => dispatch(setUser({ name: 'Bob', age: 30 }))}>Change User</button>
      <button onClick={() => dispatch(setTheme('dark'))}>Change Theme</button>
    </div>
  );
};
```

**优点：**  
+ 状态集中管理，方便调试和维护。
+ Redux DevTools 提供了强大的状态追踪和调试功能。
+ 模块化的 createSlice 方法使得状态逻辑清晰和易于扩展。

**缺点：**  
+ 在非常大的应用中，单一 store 可能会变得过于庞大和复杂。
+ 需要注意避免不必要的全局状态更新带来的性能开销。

### 多个 Store（极少使用）

在极少数场景下，如微前端架构或非常复杂的应用模块化设计时，可能会有多个独立的 Redux store，但这种做法违背了 Redux 的设计理念，不推荐常规使用：

```tsx
// store1.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store1 = configureStore({
  reducer: {
    user: userReducer
  }
});

// store2.js
import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './preferencesSlice';

const store2 = configureStore({
  reducer: {
    preferences: preferencesReducer
  }
});
```

**优点：**  
+ 独立的模块化管理，可以在大型应用或微前端中实现较好的隔离。

**缺点：**  
+ 增加了跨 store 的数据共享和同步复杂性。
+ 不符合 Redux 单一 store 的设计原则。