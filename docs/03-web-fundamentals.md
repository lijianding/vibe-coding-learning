# 03 Web 基础原理：从浏览器到数据库

> 本章目标不是记名词，而是建立一张“Web 系统运行地图”。以后学习 React、Next.js、Supabase、API、Docker 时，都要回到这张地图理解。

## 一、Web 应用到底是什么

一个典型 Web SaaS 可以抽象成：

```text
用户
  ↓
Browser / Client
  ↓
DNS → 找到服务器
  ↓
HTTPS Request
  ↓
Web Server / Next.js
  ↓
Authentication
  ↓
Authorization
  ↓
Business Logic
  ↓
Database / Storage / External API
  ↓
HTTPS Response
  ↓
Browser Render
```

HTTP 是 Web 上资源交换的基础协议，采用 client-server 模型。HTTP 本身是无状态的；Cookie、Session、Token 等机制是在它之上补充“连续身份状态”。

官方：
- MDN HTTP Overview: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview
- MDN HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP

---

## 二、Client 与 Server

### 1. Client

客户端是“发起请求的一方”。

在你的 SaaS 中通常是：

- Chrome
- Edge
- Safari
- 手机浏览器

客户端负责：

- 显示 UI
- 收集用户输入
- 响应点击、输入、拖拽
- 调用服务端
- 展示结果

### 2. Server

服务端负责：

- 接收请求
- 验证身份
- 判断权限
- 执行业务规则
- 查询或修改数据库
- 操作文件
- 调用第三方服务
- 返回结果
- 记录日志

### 3. 最重要的安全边界

浏览器处于用户控制之下。

用户可以：

- 修改页面 HTML
- 修改前端 JavaScript
- 手工调用 API
- 修改请求参数
- 删除前端“disabled”
- 绕过“隐藏按钮”

所以：

> 前端限制只能改善体验，真正的安全控制必须位于服务端和数据库边界。

---

## 三、Frontend 与 Backend 不是“两个软件”，而是两个职责域

### Frontend

解决：

> 用户看到什么，以及用户如何和系统交互？

典型内容：

- 页面布局
- 表单
- 表格
- Dashboard
- Modal
- loading
- error message
- client-side validation

### Backend

解决：

> 系统真正允许发生什么？

典型内容：

- 身份认证
- 权限
- 业务校验
- 数据库事务
- 审计日志
- 文件权限
- 第三方 API
- Rate Limit

### SaaS 示例

前端可能显示：

```text
[删除项目]
```

后端收到：

```http
DELETE /api/projects/123
```

后端不能因为页面显示了按钮就直接删除。

它必须再次检查：

```text
用户是否登录？
↓
属于哪个 Organization？
↓
是否拥有 project.delete？
↓
Project 123 是否属于该 Organization？
↓
项目是否允许删除？
↓
执行删除 / Soft Delete
↓
记录 Audit Log
```

---

## 四、从输入 URL 到网页显示：浏览器实际上做了什么

假设访问：

```text
https://saas.example.com/projects/123
```

### 1. 解析 URL

URL 中包含：

```text
https://    协议
saas.example.com  Host
/projects/123     Path
```

还可能有：

```text
?status=active
```

这是 Query String。

### 2. DNS

浏览器需要知道：

> saas.example.com 对应哪台服务器？

DNS 把域名解析为 IP。

可以把 DNS 类比为：

```text
域名 = 联系人姓名
IP   = 电话号码
DNS  = 通讯录
```

### 3. 建立连接

HTTPS 通常涉及：

```text
TCP/QUIC
+
TLS
+
HTTP
```

初学阶段不必深入协议实现，但要知道 HTTPS 的主要作用是：

- 传输加密
- 数据完整性
- 服务器身份验证

HTTPS **不会自动解决**：

- 越权
- SQL Injection
- XSS
- 错误的业务逻辑

---

## 五、Request 与 Response

HTTP 通信基本单位：

```text
Request
↓
Response
```

### Request 可能包含

- Method
- URL
- Headers
- Cookies
- Body

示例：

```http
POST /api/projects HTTP/1.1
Content-Type: application/json
Authorization: Bearer ...
```

Body：

```json
{
  "name": "XX医院 HIS 升级",
  "goLiveDate": "2026-12-01"
}
```

### Response 可能包含

- Status Code
- Headers
- Body

```http
HTTP/1.1 201 Created
Content-Type: application/json
```

```json
{
  "id": "p_1001",
  "name": "XX医院 HIS 升级"
}
```

---

## 六、HTTP 为什么说是 Stateless

HTTP 默认不会自动记住：

```text
上一个请求是谁发的
```

例如：

```text
Request 1: GET /login
Request 2: GET /projects
```

协议本身没有天然规定 Request 2 就和 Request 1 属于同一个人。

因此 Web 应用引入：

- Cookie
- Session
- Token
- JWT

来建立用户连续身份。

这也是 Authentication 学习的基础。

---

## 七、Cookie、Session、Token 的直觉

### Cookie

浏览器保存的一小段数据。

可以在满足规则时自动随请求发送。

常见用途：

- Session ID
- 偏好
- CSRF 相关信息

### Session

服务端保存：

```text
session-id → user-id
```

浏览器 Cookie 中携带 session-id。

### Token

Token 本身携带或引用身份信息。

常见形式：

```text
Authorization: Bearer <token>
```

### JWT

JWT 是一种 Token 格式。

注意：

> JWT 是编码和签名结构，不等于“天然安全”，也不等于“加密”。

---

## 八、Port 是什么

一台机器上可以同时运行很多服务。

IP 表示机器，Port 帮助定位具体服务。

例如：

```text
localhost:3000 → Next.js
localhost:5432 → PostgreSQL
localhost:6379 → Redis
```

`localhost` 表示：

> 当前这台电脑自己。

---

## 九、API 是什么

API 是系统之间约定好的调用接口。

可以把 API 理解成：

> 后端公开的一组“合法入口”。

项目 API：

```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

API 应明确：

- 输入
- 输出
- 权限
- 错误
- 状态码
- 数据格式

---

## 十、JSON 是什么

JSON 是 Web API 常见的数据交换格式。

```json
{
  "id": "p1",
  "name": "HIS Upgrade",
  "active": true,
  "manager": {
    "id": "u1",
    "name": "Zhang"
  },
  "tags": ["HIS", "upgrade"]
}
```

需要掌握：

- object
- array
- string
- number
- boolean
- null

JSON 不是 JavaScript 对象本身，只是文本格式。

---

## 十一、浏览器如何显示网页

一个页面通常涉及：

- HTML：结构
- CSS：样式
- JavaScript：行为

浏览器会把 HTML 解析成 DOM。

JavaScript 可以：

- 读取 DOM
- 修改 DOM
- 监听事件

React 又在此基础上提供组件化 UI 模型。

因此：

```text
HTML/CSS/JS
↓
React
↓
Next.js
```

不是三套互相无关的技术，而是层层建立。

---

## 十二、Browser DevTools 是你的第一排障工具

Chrome F12。

### Elements

看：

- DOM
- CSS
- 元素属性

### Console

看：

- console.log
- JavaScript error
- runtime error

### Network

最重要。

点击一个请求后检查：

- Request URL
- Method
- Status Code
- Headers
- Cookies
- Payload
- Response
- Timing

### Application

常用于看：

- Cookie
- Local Storage
- Session Storage

---

## 十三、一次“创建项目”的完整链路

用户：

```text
项目名称：A 医院升级
```

点击保存：

```text
React Form
↓
POST /api/projects
↓
Next.js Server
↓
读取当前 Session
↓
得到 user_id
↓
查询 organization membership
↓
检查 project.create
↓
验证 name/date
↓
开始 Transaction
↓
INSERT projects
↓
INSERT audit_logs
↓
Commit
↓
201 Created
↓
React 更新页面
```

这就是以后整个 SaaS 的核心工作方式。

---

## 十四、你必须形成的 6 个问题

以后看到任何功能，都问：

1. 请求从哪里发起？
2. 请求去了哪里？
3. 用户身份在哪里确认？
4. 权限在哪里确认？
5. 数据在哪里读写？
6. 出错在哪里记录和返回？

---

## 十五、动手实验

### 实验 1：Network

打开任意非敏感网站：

1. F12
2. Network
3. 刷新
4. 找 Document
5. 看 Status
6. 找 Fetch/XHR
7. 看 Request / Response

### 实验 2：curl

```bash
curl -I https://example.com
```

观察：

- HTTP status
- response headers

### 实验 3：localhost

以后创建 Next.js 后访问：

```text
http://localhost:3000
```

思考：

- localhost 是谁？
- 3000 是什么？
- Browser 和 Next.js 谁是 Client/Server？

---

## 十六、本章验收

你应该能不用背定义地解释：

- Browser 和 Server 有什么区别
- Frontend 和 Backend 的安全边界
- DNS 的作用
- IP 与 Port 的区别
- HTTP Request / Response
- 为什么 HTTP 是 Stateless
- Cookie / Session / Token 的基本关系
- HTTPS 能保护什么
- API 的作用
- JSON 是什么
- 点击“保存”后数据经过哪些层

## 推荐资料

- MDN Learn Web Development: https://developer.mozilla.org/en-US/docs/Learn_web_development
- MDN HTTP Overview: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview
- MDN HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP
- MDN Web Technology: https://developer.mozilla.org/zh-CN/docs/Web
