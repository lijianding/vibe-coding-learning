# 10 React 基础

官方：
https://react.dev/learn

## 目标
学会用组件构建页面，不追求 React 底层原理。

## 必学
- Component
- JSX
- Props
- State
- Event
- Form
- useState
- useEffect
- Conditional Rendering
- List Rendering

## Component
```tsx
function ProjectCard({ project }) {
  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.status}</p>
    </div>
  );
}
```

## Props
父组件把数据传给子组件。

## State
```tsx
const [status, setStatus] = useState("planning");
```

理解：
- status：当前值
- setStatus：修改值的方法

## 列表渲染
```tsx
{projects.map(project => (
  <ProjectCard
    key={project.id}
    project={project}
  />
))}
```

## 条件渲染
```tsx
{project.status === "completed"
  ? <span>已完成</span>
  : <span>进行中</span>}
```

## 表单
重点练：
- input
- select
- textarea
- submit
- validation

## 暂时不要深入
- Redux
- React 内部实现
- 复杂性能优化
- 高级状态管理

## 练习项目
把静态页面改造成 React：
- 项目列表
- 项目卡片
- 项目详情
- 任务列表
- 问题列表
- 搜索
- 筛选
- 表单
- 弹窗

数据仍可先使用假数据。

## 验收
能解释：
- Component
- Props
- State
- map 为什么常用于页面列表
- 用户点击按钮后如何触发事件