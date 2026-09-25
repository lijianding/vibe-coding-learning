# Lab 04 — React Dashboard

对应：
[React 教材](../../docs/10-react.md)

## 官方资料

- React Learn: https://react.dev/learn
- State: https://react.dev/learn/state-a-components-memory
- Rendering Lists: https://react.dev/learn/rendering-lists
- Choosing State Structure: https://react.dev/learn/choosing-the-state-structure

## 运行

```bash
cd labs/04-react-dashboard
npm install
npm run dev
```

浏览器打开终端显示的本地地址。

## 当前项目演示

- Component
- Props
- State
- Event
- List Rendering
- key
- derived data
- conditional rendering
- responsive CSS

## 必做练习

1. 新增 `criticalIssues` 字段，并增加 KPI Card。
2. 增加文本搜索。
3. 把 `status` 和 `search` 同时用于筛选。
4. 添加一个按钮，将某个 Project 状态修改为 completed。
5. 修改时不要直接 mutation 原数组对象。
6. 增加：
   - loading state
   - error state
   - empty state
7. 解释为什么 `activeCount` 不需要额外 useState。
8. 判断这里是否真正需要 useEffect，并说明原因。

## AI 提示

让 AI 帮你时要求：

```text
先解释当前 state model。
不要直接加入 useEffect。
只有外部系统同步确实需要时才使用 Effect。
```
