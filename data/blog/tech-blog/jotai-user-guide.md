---
title: Jotai 使用说明
date: '2024-06-25'
tags: ['react','original',"ai-partner"]
draft: false
summary: ""
---

## Jotai 是什么

[Jotai](https://jotai.org/) 是 React 的一个数据管理库，Jotai 是专门为解决 React Context 中额外重新渲染问题而开发的工具，同时支持了 Suspense 和 Concurrent 渲染。

Jotai 主要是基于原子类似于 useState 和 useReducer 这样的使用方式设计的，但不同点在于 jotai 的 atom 原子是跨组件面向整个 App 的，同时他也可以手动设定一个 Provider 的 Scope 人为的约束这些 atom 数据生效的范围，类似于 React Context，不同于 React Context 的点是他内部做了渲染优化，只渲染当前 atom 值发生变化的相关组件。  
不同于其他主流基于外部 Store 的实现方式，例如 Zustand 和 Redux toolkit，因此他是 useTransition 和内部 Suspense 友好的，内部实现也没有用到 useSyncExternalStore。

## Jotai 和 React Context 的关系

Jotai 是经过优化的 React Context 实现，在下面的核心实现中也可以直观的看到这一点，通过将全局状态拆分为多个独立的原子，使状态更新的粒度更细。每个原子的变动只会引起依赖它的组件重新渲染，避免了不必要的性能开销。这一优化解决了 React Context 在频繁更新情况下可能带来的性能问题，使得状态管理更加细致灵活，同时保持了简洁易用的 API 接口。

Jotai 相较于 React Context 的主要优化点

+ 分片状态：Jotai 将状态分割成多个原子，每个原子的改变只会影响相关的组件，将全局状态的更新粒度降到最低。
+ 避免不必要的渲染：只有依赖了相应原子的组件会在该原子更新时重新渲染，而不会影响不相关的组件。
+ 简洁的 API: Jotai 提供了简单直观的接口，降低了状态管理的复杂度。

```mermaid
graph TD
  A[React Context] --> |全局状态|B{组件A}
  A --> |全局状态|C{组件B}
  B --> D[重新渲染]
  C --> E[重新渲染]

  F[Jotai] --> |原子状态1|G{组件A}
  F --> |原子状态2|H{组件B}
  G --> I[最小渲染]
  H --> J[最小渲染]
```

## Jotai 技巧

基本用法参照[官网给出的 examples](https://tutorial.jotai.org/examples)

[Jotai Tips](https://blog.axlight.com/posts/jotai-tips/)

### 1.类原始 Atom

你可以派生一个行为完全相同的基本原子，并且可以添加一些副作用

![aKOTu4](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/aKOTu4.png)

### 2.提前返回

与 React hook 不同，Jotai 原子对于提前返回没有限制。

![nqzEZ6](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/nqzEZ6.png)

### 3.Promise 值

![nmq8y1](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/nmq8y1.png)

### 4.Store API

从 Jotai v2 开始，您可以在 React 之外获取/设置原子值。

![BtWwBx](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/BtWwBx.png)

### 5.useAtom

useAtom 是两个函数的结合

![UhkQXV](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/UhkQXV.png)

### 6.派生 Atom

不同的原子之间可以通过另外一个实务原子来完成对原子的操作

![xJK3VW](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/xJK3VW.png)


### 7.依赖 Prop 的 Atom

如果你想创建一个收到 prop 驱动的原子，可以使用 useMemo

![oewpEe](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/oewpEe.png)

### 8.具有本地存储的 Atom

![nlz39i](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/nlz39i.png)

### 9.交换 Atom

Jotai 原子可以容纳另一个原子

![1NzVTR](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/1NzVTR.png)

### 10.写 chian

Jotai atom 的 write 函数可以调用另一个 atom 的 write 函数

![TDJJpD](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/TDJJpD.png)

### 11.异步 Atom 中的 Promise.all

如果在异步原子中读取两个或多个原子，那么使用 Promise.all 会更好。

![179gdq](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/179gdq.png)

### 12.切换 Atom

![k4zvLt](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/k4zvLt.png)

### 13.两个参数

Jotai v1 只接受 write 函数的一个参数。从 v2 开始，write 函数可以接受两个或更多参数。 （此外，更好的 TS 支持零参数。）

![ehJzqp](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/ehJzqp.png)

### 14.选中 Atom

![lodE4p](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/lodE4p.png)

### 15.使用两个 Atom 优化渲染

![QVtXB1](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/QVtXB1.png)

第一个原子将在源原子更新时重新创建其引用不稳定的值（一个数组）。

第二个原子首先创建一个中间的 isEven 原子，确保只有当源原子从偶数切换到奇数或从奇数切换到偶数时才创建新值。

### 16.有条件地使用 Atom

![4JWYlv](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/4JWYlv.png)

### 17.Atom 创建者

![ZjoBx5](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/ZjoBx5.png)

### 18.刷新 Atom

![fMn8vt](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/fMn8vt.png)

### 19.默认 Atom

如果您使用一个带有读函数的原子 (atom)，它将是只读的。然而，我们可以将其与另一个保存默认值的原子结合起来，以实现可写功能。

![dN5L1I](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/dN5L1I.png)

### 20.仅在开始时异步

unwrap 是 Jotai 中的一个新工具，用于将异步原子 (atom) 转换为同步操作。通过将其与原始原子 (atom) 结合使用，可以创建一个仅在初始时是异步的原子 (atom)。

![e7KvFw](https://cdn.jsdelivr.net/gh/klaaay/pbed1@master/uPic/e7KvFw.png)

## Demo 实践

[Learning React State Manager Jotai With 7GUIS Tasks](https://blog.axlight.com/posts/learning-react-state-manager-jotai-with-7guis-tasks/)

### 1. [计数器](https://codesandbox.io/s/jotai-7guis-task1-counter-bdjhp?file=%2Fsrc%2Fatoms.ts%3A94-125)
jotai atom 最基础的使用方式

### 2. [温度转换器](https://codesandbox.io/s/jotai-7guis-task2-temperature-wvktn?file=%2Fsrc%2Fatoms.ts)
使用了 jotai atom 的读和写以及派生 atom

### 3. [航班预订](https://codesandbox.io/s/jotai-7guis-task3-flight-uwvv3?file=/src/atoms.ts)
使用了派生 atom
利用工厂函数来创建 atom

### 4. [计时器](https://codesandbox.io/s/jotai-7guis-task4-timer-qt0o4?file=%2Fsrc%2Fatoms.ts%3A928-940)
复杂的结合了 setTimeout 的派生 atom
使用了 atom 的 onMount 生命周期方法

### 5. [CRUD](https://codesandbox.io/s/jotai-7guis-task5-crud-tvmn6?file=%2Fsrc%2Fatoms.ts%3A943-944)
使用了存储了 atom 的 atom

### 6. [圆形绘制工具](https://codesandbox.io/s/jotai-7guis-task6-circle-ie65l?file=/src/atoms.ts)
派生 atom、读写 atom、实务 atom

### 7. [电子表格](https://codesandbox.io/s/jotai-7guis-task7-cells-mzoit?file=%2Fsrc%2Fatoms.ts)
使用了 atomFamily 用于统一管理有动态键的 atom 集合  
使用了 atom 的递归访问

## 结合 @tanstack/react-query 的使用

尽管我们完全可以在不使用 @tanstack/react-query 的情况下，完全使用 jotai 来完成所有和后端 API 的操作，但不可避免的需要做很多额外的工作来实现 @tanstack/react-query 的功能，如数据混存，loading 和 error 的自管理和无限查询、突变和乐观更新等。

其中有关缓存的逻辑可以查看[You Might Not Need React Query for Jotai](https://blog.axlight.com/posts/you-might-not-need-react-query-for-jotai/)

下面是给出了一个 todos 的 demo 示例

+ `GET /todos` 获取所有 todo 项目
+ `POST /todos` 创建一个新的 todo 项目
+ `PUT /todos/:id` 更新一个 todo 项目
+ `DELETE /todos/:id` 删除一个 todo 项目

确保当前项目已经安装了所有需要的依赖

### 配置 React Query 客户端

```tsx
// App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoComponent from './TodoComponent';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoComponent />
    </QueryClientProvider>
  );
};

export default App;

```

### 创建 Atoms

```tsx
// atoms.ts
import { atom } from 'jotai';

export const todosAtom = atom<Todo[]>([]);
export const todoInputAtom = atom<string>('');
```

### 创建 CRUD 操作的自定义 Hooks

```tsx
// hooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom, useAtomValue } from 'jotai';
import { todosAtom, todoInputAtom } from './atoms';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

const createTodo = async (title: string): Promise<Todo> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
};

const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
};

const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
};

export const useTodos = () => {
  const setTodos = useSetAtom(todosAtom);

  const query = useQuery('todos', fetchTodos);

  if (query.isSuccess) {
    setTodos(query.data);
  }

  return query;
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const todoInput = useAtomValue(todoInputAtom);

  return useMutation(() => createTodo(todoInput), {
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries('todos');
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
};
```

### 使用自定义 Hooks 在组件中实现 CRUD 功能

```tsx
// TodoComponent.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { todosAtom, todoInputAtom } from './atoms';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from './hooks';

const TodoComponent = () => {
  const [todos] = useAtom(todosAtom);
  const [todoInput, setTodoInput] = useAtom(todoInputAtom);

  const { isLoading, error } = useTodos();
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleCreateTodo = () => {
    if (todoInput.trim() === '') return;
    createTodoMutation.mutate();
    setTodoInput('');
  };

  const handleToggleTodo = (todo: Todo) => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input 
        type="text" 
        value={todoInput} 
        onChange={(e) => setTodoInput(e.target.value)} 
        placeholder="New Todo" 
      />
      <button onClick={handleCreateTodo}>Add Todo</button>
      
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggleTodo(todo)} 
            />
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComponent;
```

## 核心实现

下面是模拟的一个最小 jotai 的实现，用于简单说明 jotai 的工作原理  
这个例子只是以最简单的方式演示了内部实际是基于 useReducer、Context 来实现状态管理的，本身他是基于 vanilla 来实现核心功能的，以及有很多优化的细节都没有给出

```tsx
import React, { createContext, useContext, useReducer } from 'react';

// 创建 Atom 的函数，每个 Atom 都有一个初始值
const createAtom = (initialValue) => {
  const atom = { value: initialValue }; // Atom 定义为一个对象，保存初始值
  return atom;
};

// 创建一个 React 上下文，用于在组件树中共享状态
const StateContext = createContext();

// 定义一个 reducer 函数，根据 action 类型更新状态
const stateReducer = (state, action) => {
  switch (action.type) {
    case 'SET': // 当 action 类型为 'SET' 时
      return {
        ...state, // 复制当前状态
        [action.atom]: action.value, // 更新指定 Atom 的值
      };
    default:
      return state; // 默认返回当前状态
  }
};

// 状态提供者组件，用于包装应用并提供初始状态
export const Provider = ({ children, initialState = {} }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState); // 使用 useReducer 管理状态
  return (
    <StateContext.Provider value={{ state, dispatch }}> 
      {children} 
    </StateContext.Provider>
  );
};

// 自定义 Hook，用于组件中使用 Atom
export const useAtom = (atom) => {
  const { state, dispatch } = useContext(StateContext); // 获取当前状态和 dispatch 函数
  const setValue = (value) => {
    dispatch({ type: 'SET', atom, value }); // 定义设置新值的函数
  };
  return [state[atom] !== undefined ? state[atom] : atom.value, setValue]; // 返回当前值和设置函数
};

// 示例 Atom，用于计数
const countAtom = createAtom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom); // 使用自定义 Hook 获取当前计数值和设置函数
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button> 
      <p>Count: {count}</p> 
    </div>
  );
}

// 应用根组件，使用 Provider 包装并提供初始状态
function App() {
  return (
    <Provider initialState={{ [countAtom]: countAtom.value }}>
      <Counter />
    </Provider>
  );
}

export default App;
```


## 参考资料

[2024.4.3 Jotai Tips](https://blog.axlight.com/posts/jotai-tips/)

[2023.10.28 Why useSyncExternalStore Is Not Used in Jotai](https://blog.axlight.com/posts/why-use-sync-external-store-is-not-used-in-jotai/)  

[2023.7.28 How to Use Jotai and useTransition for Mutation](https://blog.axlight.com/posts/how-to-use-jotai-and-use-transition-for-mutation/)  

[2023.1.31 You Might Not Need React Query for Jotai](https://blog.axlight.com/posts/you-might-not-need-react-query-for-jotai/)

[2023.4.23 Why You Don't Need Signals in React](https://blog.axlight.com/posts/why-you-dont-need-signals-in-react/)  

[2022.12.6 Why We Need Jotai v2 API](https://blog.axlight.com/posts/why-we-need-jotai-v2-api/)

[2020.8.13 Developing React Global State Library With Atom Abstraction](https://blog.axlight.com/posts/developing-react-global-state-library-with-atom-abstraction/)
