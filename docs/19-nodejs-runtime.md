# 19 Node.js 与运行时：理解 Next.js 服务端到底运行在哪里

> 本章目标：理解 Node.js、npm、Package、Module、Event Loop、异步 I/O、环境变量和服务端运行时。掌握这些后，你看到 Next.js Server 代码时才不会把它当成“黑盒”。

## 官方源资料

- Node.js Learn: https://nodejs.org/learn
- Getting Started: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
- Asynchronous Work: https://nodejs.org/en/learn/asynchronous-work
- Event Loop: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
- File System: https://nodejs.org/en/learn/manipulating-files/working-with-files
- Environment Variables: https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs
- Node.js with TypeScript: https://nodejs.org/en/learn/typescript/introduction
- Node.js Security: https://nodejs.org/en/learn/getting-started/security-best-practices

---

## 一、Node.js 是什么

JavaScript 最早主要运行在浏览器中。

Node.js 让 JavaScript 可以运行在服务器和命令行环境。

这意味着 JavaScript 可以：

- 启动 HTTP Server
- 读取文件
- 访问数据库
- 调用操作系统 API
- 运行 CLI
- 构建前端项目
- 执行测试

所以 Next.js 服务端代码很多情况下就是运行在 Node.js Runtime 中。

---

## 二、Browser Runtime 与 Node Runtime

### Browser 有

- window
- document
- DOM
- localStorage
- browser fetch

### Node 有

- process
- fs
- path
- server sockets
- environment variables

因此：

```javascript
document.querySelector(...)
```

不能默认在 Node Server 运行。

而：

```javascript
process.env.DATABASE_URL
```

是典型 Server-side 写法。

---

## 三、process

Node 全局对象之一：

```javascript
console.log(process.env.NODE_ENV);
```

可读取：

- 环境变量
- 命令行参数
- process id
- exit code

---

## 四、npm

npm 同时涉及：

- package registry
- package manager
- scripts

安装：

```bash
npm install
```

开发依赖：

```bash
npm install -D vitest
```

---

## 五、package.json

示例：

```json
{
  "name": "medical-saas",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "vitest"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

理解：

### dependencies

生产运行需要。

### devDependencies

开发/测试/构建需要。

---

## 六、package-lock.json

锁定实际依赖版本树。

价值：

> 不同开发机和 CI 尽量安装同一依赖版本。

生产 CI 常使用：

```bash
npm ci
```

它比普通 install 更适合可重复构建。

---

## 七、Semantic Versioning

常见：

```text
1.4.2
```

含义：

```text
Major.Minor.Patch
```

### Major

不兼容变化。

### Minor

向后兼容新功能。

### Patch

兼容 Bug Fix。

但实际 npm Range 还涉及：

```text
^
~
exact
```

你应理解依赖版本变化可能带来 Breaking Change。

---

## 八、Module

现代 Node/TypeScript 常使用 ESM：

```javascript
export function x() {}
import { x } from "./x.js";
```

历史上也有 CommonJS：

```javascript
module.exports = ...
require(...)
```

看到旧项目时需要认得。

---

## 九、File System

Node 可以读写文件：

```javascript
import { readFile } from "node:fs/promises";

const content = await readFile(
  "config.json",
  "utf8"
);
```

服务端文件操作必须考虑：

- Path traversal
- Permission
- Encoding
- File size
- Error handling

---

## 十、同步 vs 异步 I/O

同步：

```text
读文件
↓
程序停住等结果
↓
继续
```

异步：

```text
发起 I/O
↓
Node 可处理其他工作
↓
I/O 完成
↓
回调/Promise 继续
```

Web Server 非常依赖异步 I/O。

---

## 十一、Event Loop

Node 能用单线程 JavaScript 处理大量 I/O 的关键机制之一。

概念：

```text
Call Stack
↓
Runtime handles async operation
↓
Callback/Promise becomes ready
↓
Event Loop schedules continuation
```

不是：

> Node 同时运行无限 JavaScript 线程。

---

## 十二、CPU-bound vs I/O-bound

### I/O-bound

等待：

- Database
- File
- HTTP
- Network

Node 很适合大量此类工作。

### CPU-bound

例如：

- 大型图像处理
- 压缩
- 密集计算

会长时间阻塞 Event Loop。

这时可能需要：

- Worker Thread
- Separate Service
- Queue

---

## 十三、Blocking 的危险

如果一个 Request 做：

```text
CPU 计算 10 秒
```

Event Loop 可能无法及时处理其他请求。

因此要警惕：

- 大循环
- 同步文件 API
- 大 JSON parse
- 重 CPU 工作

---

## 十四、Environment Variables

例如：

```text
DATABASE_URL
SUPABASE_SERVICE_ROLE_KEY
NODE_ENV
```

读取：

```javascript
process.env.DATABASE_URL
```

原则：

- Code 与 Config 分离
- Secret 不进 Git
- Dev/Test/Prod 分离

---

## 十五、Error Handling

Node 中未处理异常可能导致进程问题。

应用层需要：

- try/catch
- centralized error handling
- logging
- process supervision

不要依赖：

> 出错自动忽略。

---

## 十六、HTTP Server 的底层直觉

Node 可以直接：

```javascript
import http from "node:http";

const server = http.createServer(
  (req, res) => {
    res.end("hello");
  }
);

server.listen(3000);
```

Next.js 帮你封装了很多这些底层工作。

理解这一点后，你会知道：

> Framework 不是魔法，它最终仍然监听 Port、接收 HTTP Request、返回 Response。

---

## 十七、运行时安全

需要注意：

- 不执行不可信 Shell 命令
- 不拼接文件路径
- 不泄露 Environment Variable
- 限制上传文件
- 及时更新依赖
- 不把 Error Stack 直接返回给用户

---

## 十八、练习

### 练习 A

写 Node CLI：

```bash
node hello.js
```

读取命令行参数。

### 练习 B

读取一个 JSON 文件并输出 Project 数量。

### 练习 C

写一个最小 HTTP Server，监听 3001。

### 练习 D

比较：

- synchronous file read
- asynchronous file read

理解阻塞差异。

---

## 十九、验收

你应能解释：

- Node 与 Browser Runtime
- npm
- package.json
- package-lock
- SemVer
- ESM/CommonJS
- Event Loop
- async I/O
- CPU-bound / I/O-bound
- process.env
- 为什么 Blocking 会影响 Server
