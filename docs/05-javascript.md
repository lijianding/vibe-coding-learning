# 05 JavaScript：真正理解 AI 生成代码

> JavaScript 是本路线最重要的语言基础。TypeScript、React、Next.js 都建立在 JavaScript 之上。

官方主教材：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide

---

## 一、JavaScript 运行在哪里

JavaScript 常见运行环境：

### Browser

有：

- DOM
- window
- document
- localStorage
- fetch

### Node.js

有：

- 文件系统
- process
- server-side runtime

所以：

```javascript
window.location
```

在 Browser 可以存在。

但在纯 Node Server 环境中不一定存在。

这也是以后 Next.js 区分 Server / Client 的基础。

---

## 二、变量与内存直觉

```javascript
const name = "Project A";
let status = "planning";
```

### const

不能重新绑定：

```javascript
const x = 1;
x = 2; // error
```

但对象内部可以改：

```javascript
const project = { status: "planning" };
project.status = "active";
```

因为 const 锁定的是变量绑定，不是对象深层不可变。

---

## 三、Primitive 与 Object

常见 primitive：

- string
- number
- boolean
- null
- undefined
- bigint
- symbol

Object 包括：

- 普通 object
- array
- function
- Date 等

---

## 四、值与引用：理解 Bug 的关键

```javascript
const a = { status: "active" };
const b = a;

b.status = "closed";

console.log(a.status); // closed
```

因为 a、b 指向同一个对象。

React 状态更新时为什么常使用：

```javascript
const next = {
  ...project,
  status: "closed"
};
```

原因之一就是避免直接修改旧对象。

---

## 五、=== 与 ==

推荐：

```javascript
===
!==
```

因为 `==` 会发生类型转换。

例如：

```javascript
"1" == 1  // true
"1" === 1 // false
```

商业代码尽量减少隐式类型转换带来的歧义。

---

## 六、Truthy / Falsy

JavaScript 会把一些值放到布尔上下文判断。

Falsy 包括常见：

- false
- 0
- ""
- null
- undefined
- NaN

例如：

```javascript
if (!project) {
  return;
}
```

需要知道它并不只检查 null。

---

## 七、Object

```javascript
const project = {
  id: "p1",
  name: "HIS Upgrade",
  status: "active"
};
```

读取：

```javascript
project.name
project["name"]
```

解构：

```javascript
const { id, name } = project;
```

Spread：

```javascript
const updated = {
  ...project,
  status: "completed"
};
```

---

## 八、Array

```javascript
const projects = [
  { id: 1, status: "active" },
  { id: 2, status: "closed" }
];
```

重点掌握：

- map
- filter
- find
- some
- every
- reduce

### map

转换每一项。

```javascript
const names = projects.map(p => p.name);
```

### filter

筛选多项。

```javascript
const active = projects.filter(
  p => p.status === "active"
);
```

### find

找第一项。

```javascript
const target = projects.find(
  p => p.id === 2
);
```

### some

是否至少一个满足。

### every

是否全部满足。

### reduce

把多个值汇总成一个。

---

## 九、函数

函数本质：

> 输入 → 处理 → 输出

```javascript
function calculateProgress(done, total) {
  if (total === 0) return 0;
  return done / total * 100;
}
```

重点：

- 参数
- return
- scope
- pure function
- side effect

### Pure Function

相同输入产生相同输出，不修改外部环境。

这种函数更容易测试。

---

## 十、Scope

```javascript
function demo() {
  const local = "A";
}
```

local 只存在于函数内部。

以后你会遇到：

- module scope
- function scope
- block scope

---

## 十一、Closure

先掌握直觉。

内部函数可以“记住”创建时所在作用域。

```javascript
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}
```

Closure 在：

- React hooks
- callback
- event handler

中非常常见。

---

## 十二、Callback

函数可以作为值传递。

```javascript
projects.filter(project => {
  return project.status === "active";
});
```

这里传入 filter 的就是函数。

---

## 十三、Event Loop：为什么异步代码不会简单“从上到下等完”

JavaScript 单线程执行主要 JavaScript 代码，但 Browser/Node 可以把 I/O 等操作交给运行环境。

例如：

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

通常输出：

```text
A
C
B
```

这涉及：

- Call Stack
- Web APIs / runtime
- Task Queue
- Event Loop

不要求深入 V8，但必须知道：

> 异步回调不会等同于普通同步代码顺序。

---

## 十四、Promise

Promise 表示：

> 一个未来才知道结果的值。

状态：

```text
pending
fulfilled
rejected
```

例：

```javascript
fetch("/api/projects")
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

---

## 十五、async / await

async/await 是 Promise 的更易读写法。

```javascript
async function loadProjects() {
  const response = await fetch("/api/projects");
  const data = await response.json();
  return data;
}
```

注意：

```javascript
async function x() {}
```

一定返回 Promise。

---

## 十六、错误处理

```javascript
async function loadProjects() {
  try {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
```

这里有两类失败：

### Network Failure

fetch 本身失败。

### HTTP Error

服务器返回 404/500。

注意：

> fetch 收到 500 时不一定自动 throw，所以通常需要检查 response.ok。

---

## 十七、Optional Chaining

```javascript
project.manager?.name
```

如果 manager 是 null/undefined：

不会继续读取 name。

---

## 十八、Nullish Coalescing

```javascript
const name =
  user.nickname ?? user.name;
```

只在左侧 null/undefined 时使用右侧。

与 `||` 不完全相同。

---

## 十九、Module

```javascript
export function calculateProgress() {}
```

另一文件：

```javascript
import { calculateProgress }
from "./progress";
```

现代大型项目靠 module 拆分职责。

---

## 二十、Mutation 与 Immutability

Mutation：

```javascript
project.status = "closed";
```

创建新对象：

```javascript
const nextProject = {
  ...project,
  status: "closed"
};
```

React 中后者非常重要，因为状态变化通常通过引用变化判断。

---

## 二十一、常见错误

### 1. 忘记 await

```javascript
const data = response.json();
```

得到的是 Promise，不是最终 JSON。

### 2. map 忘记 return

### 3. 修改共享对象导致副作用

### 4. 把 null 当普通对象

### 5. 异步循环误用

例如 `forEach(async...)` 经常不是想象中的等待行为。

---

## 二十二、医疗 SaaS 综合例子

```javascript
async function getVisibleProjects(user) {
  if (!user?.organizationId) {
    return [];
  }

  try {
    const response = await fetch(
      `/api/projects?organizationId=${user.organizationId}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed: ${response.status}`
      );
    }

    const projects = await response.json();

    return projects
      .filter(p => !p.deletedAt)
      .map(p => ({
        id: p.id,
        name: p.name,
        status: p.status
      }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
```

你应逐行解释：

- optional chaining
- template string
- await
- response.ok
- filter
- map
- object creation
- catch

---

## 二十三、练习

### 练习 A

计算：

```javascript
const tasks = [
  { status: "done" },
  { status: "done" },
  { status: "todo" }
];
```

输出完成率。

### 练习 B

从 issues 中找到：

- priority=critical 的全部问题
- 第一个 status=open 的问题
- 是否存在 overdue=true
- 是否所有问题都已 closed

### 练习 C

写：

```javascript
async function getIssues(projectId)
```

要求：

- 调用 API
- 检查 response.ok
- 成功返回数组
- 失败返回 []
- 打印错误

---

## 二十四、学习验收

看到陌生 JavaScript 代码，你至少能定位：

- 数据
- 函数
- 判断
- 循环/数组变换
- Promise
- 异步
- Error Handling
- Mutation
- Module

不要求脱离 AI 手写大型程序。

## 推荐资料

- MDN JavaScript Guide: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide
- MDN JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- javascript.info（补充教程）: https://javascript.info/
