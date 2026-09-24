# 05 JavaScript 基础

官方：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide

## 必学内容
- const / let
- string / number / boolean / null / undefined
- object / array
- if / else
- for / for...of
- function
- map / filter / find / some / every / reduce
- module
- Promise
- async / await
- try / catch

## 对象
```javascript
const project = {
  id: 1,
  name: "XX医院升级项目",
  status: "active"
};
```

## 数组
```javascript
const projects = [
  { id: 1, name: "A", status: "active" },
  { id: 2, name: "B", status: "completed" }
];
```

## filter
```javascript
const active = projects.filter(
  p => p.status === "active"
);
```

## find
```javascript
const project = projects.find(
  p => p.id === 2
);
```

## async / await
```javascript
async function loadProjects() {
  const response = await fetch("/api/projects");
  return await response.json();
}
```

## 错误处理
```javascript
try {
  const response = await fetch("/api/projects");
  if (!response.ok) throw new Error("failed");
  return await response.json();
} catch (error) {
  console.error(error);
  return [];
}
```

## 练习
1. 筛选 active 项目
2. 找 id=2 项目
3. 计算任务完成率
4. 写一个请求 /api/issues 的异步函数

## 验收
不要求默写，但要能解释：
- 输入
- 输出
- 异步位置
- 出错位置
- 返回值