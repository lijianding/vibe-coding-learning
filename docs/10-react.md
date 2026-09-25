# 10 React：组件、状态与声明式 UI

主教材：
https://react.dev/learn

React 官方学习路线核心包含：

- Describing the UI
- Adding Interactivity
- Managing State
- Escape Hatches

理解这些“心智模型”比记 API 更重要。

---

## 一、React 解决什么问题

传统 JS 可能：

```text
找到 DOM
↓
修改 DOM
↓
再判断状态
↓
继续修改 DOM
```

复杂页面会越来越难同步。

React 的思路：

> UI = f(state)

也就是：

```text
给定当前数据/状态
↓
React 描述应该显示什么
```

你不主要命令“把这个 div 改红”，而是描述：

```tsx
{hasError && <ErrorMessage />}
```

---

## 二、Component

Component 是 UI 的可组合单元。

```tsx
function ProjectCard({ project }) {
  return (
    <article>
      <h2>{project.name}</h2>
      <p>{project.status}</p>
    </article>
  );
}
```

组件不是简单“HTML 模板”。

它可以包含：

- Props
- State
- Event
- Rendering Logic

---

## 三、JSX

JSX 是 JavaScript 语法扩展。

```tsx
const element = <h1>Hello</h1>;
```

最终会转换成 JavaScript 调用。

所以 JSX：

- 不是 HTML
- 但看起来很像 HTML

差异例如：

```tsx
className
htmlFor
```

---

## 四、Props

Props 是父组件传给子组件的数据。

```tsx
<ProjectCard project={project} />
```

子：

```tsx
function ProjectCard({ project }) {}
```

核心：

> Props 是输入。

组件不应该随意修改自己的 Props。

---

## 五、State

State 是组件需要记住的变化数据。

```tsx
const [status, setStatus] =
  useState("planning");
```

更新：

```tsx
setStatus("active");
```

State 更新会触发重新渲染。

---

## 六、State 是 Snapshot

React 的一个重要心智模型：

> 每次 render 看到的是某一时刻的 State Snapshot。

例如：

```tsx
setCount(count + 1);
setCount(count + 1);
```

并不一定等于 +2。

因为两次可能都读到同一个 snapshot。

需要基于旧值：

```tsx
setCount(c => c + 1);
setCount(c => c + 1);
```

---

## 七、Render 应尽量 Pure

组件 render 应尽量：

- 相同 Props/State → 相同 UI
- 不在 render 里直接产生不可控副作用

不要在 render 里：

- 写数据库
- 发邮件
- 修改外部对象

---

## 八、Event Handler

```tsx
<button
  onClick={() => setStatus("active")}
>
  开始实施
</button>
```

Event Handler 是执行副作用/状态更新的合理位置之一。

---

## 九、Conditional Rendering

```tsx
{isLoading ? (
  <Spinner />
) : (
  <ProjectList />
)}
```

或：

```tsx
{error && <ErrorMessage />}
```

---

## 十、List Rendering 与 key

```tsx
{projects.map(project => (
  <ProjectCard
    key={project.id}
    project={project}
  />
))}
```

key 不是为了“消除 warning”。

React 用它识别列表项身份。

稳定 key 应来自数据 ID。

不要轻易用数组 index，特别是列表会增删/排序时。

---

## 十一、State 应放在哪里

原则：

> 把共享 State 提升到需要它的最接近共同父组件。

例如：

```text
ProjectPage
├── Filter
└── ProjectList
```

Filter 和 List 都依赖 selectedStatus，则 State 可以放 ProjectPage。

这叫 lifting state up。

---

## 十二、Avoid Redundant State

如果可以根据现有 State 计算，就不要额外存。

错误：

```tsx
const [tasks, setTasks] = ...
const [completedCount, setCompletedCount] = ...
```

更合理：

```tsx
const completedCount =
  tasks.filter(t => t.done).length;
```

否则容易两个 State 不一致。

---

## 十三、Controlled Form

```tsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={e => setName(e.target.value)}
/>
```

UI Value 由 React State 控制。

---

## 十四、useEffect：最容易滥用的 Hook

Effect 用于：

> 让 React 与外部系统同步。

例如：

- 连接第三方系统
- 订阅
- Browser API
- 某些网络同步

不要把所有计算都放 Effect。

错误思路：

```tsx
useEffect(() => {
  setFullName(first + last);
}, [first, last]);
```

如果 fullName 可直接 render 计算，就没必要 Effect。

React 官方特别强调：

> You Might Not Need an Effect.

---

## 十五、Effect Dependency

```tsx
useEffect(() => {
  // ...
}, [projectId]);
```

dependency 表示 Effect 依赖什么响应值。

乱删 dependency warning 会产生 stale closure 等 Bug。

---

## 十六、Cleanup

如果 Effect 创建：

- timer
- subscription
- event listener

通常应 cleanup：

```tsx
useEffect(() => {
  const id = setInterval(...);

  return () => {
    clearInterval(id);
  };
}, []);
```

---

## 十七、Context

Context 可把数据传给深层组件，而不用逐级 Props。

适合：

- theme
- auth context
- locale

但不要把所有业务 State 都扔进 Context。

---

## 十八、Server State 与 Client State

以后使用 Next.js/Supabase 时要区分：

### Client State

例如：

- Modal 是否打开
- 当前选中 Tab
- 表单未提交内容

### Server State

例如：

- Projects
- Issues
- Users

Server State 的真实来源在服务端/数据库。

不要在前端复制一堆长期“真实数据副本”。

---

## 十九、React 常见 Bug

- 直接修改 state object
- key 使用 index
- Effect 无限循环
- Effect 缺依赖
- 保存派生 State
- Props drilling 过深
- 一个组件几千行
- 把 API 权限逻辑只写在前端

---

## 二十、练习

实现：

### ProjectList

支持：

- Loading
- Error
- Empty
- Data

### Filter

按 status 筛选。

### ProjectForm

包含：

- name
- status
- goLiveDate

### Modal

打开/关闭 State。

---

## 二十一、验收

你应该能解释：

- Declarative UI
- Component
- JSX
- Props
- State
- State Snapshot
- Pure Render
- Event Handler
- key
- Lifting State
- Redundant State
- useEffect 的真正用途
- Cleanup
- Client State vs Server State

## 推荐资料

- React Learn: https://react.dev/learn
- Describing UI: https://react.dev/learn/describing-the-ui
- Adding Interactivity: https://react.dev/learn/adding-interactivity
- Managing State: https://react.dev/learn/managing-state
- Synchronizing with Effects: https://react.dev/learn/synchronizing-with-effects
- You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect
