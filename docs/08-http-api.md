# 08 HTTP、REST API 与 JSON：系统之间如何通信

主教材：
- MDN HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP
- MDN HTTP Methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods
- MDN Status Codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

---

## 一、HTTP Message

HTTP 通信基本模型：

```text
Client
↓ Request
Server
↓ Response
Client
```

Request 主要包含：

- Method
- Target URL
- Headers
- Body

Response：

- Status Code
- Headers
- Body

---

## 二、HTTP Method 的语义

### GET

读取资源。

```http
GET /api/projects
```

GET 理论上应是 safe/idempotent read。

### POST

创建资源或触发非幂等动作。

```http
POST /api/projects
```

### PUT

通常表示完整替换资源。

### PATCH

部分更新。

```http
PATCH /api/projects/p1
```

Body：

```json
{
  "status": "completed"
}
```

### DELETE

删除资源。

---

## 三、Idempotency

一个操作执行一次和多次，最终效果是否相同。

典型：

- GET：通常 idempotent
- PUT：设计上通常 idempotent
- DELETE：通常按资源最终状态理解为 idempotent
- POST：常常不是

支付、下单类 POST 常需要额外设计 Idempotency Key 防重复。

---

## 四、URL 设计

例如：

```text
/api/projects
/api/projects/p1
/api/projects/p1/tasks
```

### Path Parameter

```text
/projects/:id
```

表示特定资源。

### Query Parameter

```text
/projects?status=active&page=2
```

适合：

- filter
- sort
- pagination
- search

---

## 五、Headers

常见：

### Content-Type

```http
Content-Type: application/json
```

告诉接收方 Body 类型。

### Authorization

```http
Authorization: Bearer <token>
```

### Accept

告诉服务器希望得到什么格式。

---

## 六、Status Code 分类

```text
1xx 信息
2xx 成功
3xx 重定向
4xx 客户端请求问题
5xx 服务端问题
```

常用：

### 200 OK

成功。

### 201 Created

资源创建成功。

### 204 No Content

成功但无 Body。

### 400 Bad Request

请求格式/校验错误。

### 401 Unauthorized

实际语义更接近：

> 当前请求没有有效身份认证。

### 403 Forbidden

身份知道，但权限不足。

### 404 Not Found

资源不存在。

有时出于安全考虑也可对“无权知道存在的资源”返回 404。

### 409 Conflict

资源状态冲突。

例如重复唯一字段。

### 422 Unprocessable Content

某些 API 用于语义校验失败。

### 429 Too Many Requests

Rate Limit。

### 500 Internal Server Error

服务端未预期错误。

---

## 七、API Contract

一个 API 不只是 URL。

完整 Contract 应明确：

- Method
- Path
- Auth
- Permission
- Request Schema
- Response Schema
- Status Code
- Error Format
- Side Effects

例如：

```text
POST /api/projects

Auth:
required

Permission:
project.create

Request:
{
  name: string,
  goLiveDate?: string
}

Response 201:
Project

Possible errors:
400 validation
401 unauthenticated
403 forbidden
409 duplicate
500 unexpected
```

---

## 八、为什么要统一错误格式

不建议：

接口 A：

```json
{"error":"bad"}
```

接口 B：

```json
{"message":"failed"}
```

接口 C：

```json
{"code":123}
```

更合理：

```json
{
  "error": {
    "code": "PROJECT_NAME_REQUIRED",
    "message": "Project name is required",
    "requestId": "req_xxx"
  }
}
```

这样前端、日志和客服更容易定位。

---

## 九、REST 是一种设计风格，不是协议

HTTP 是协议。

REST 是架构风格。

常见思想：

- Resource-oriented
- Stateless
- 使用标准 HTTP 语义
- 统一接口

不要把“URL 有 /api/”就叫 REST。

---

## 十、JSON 的边界

JSON 支持：

- object
- array
- string
- number
- boolean
- null

不直接支持：

- Date 类型
- undefined
- function
- Map
- Set

日期通常以字符串传输：

```json
{
  "createdAt": "2026-09-25T10:00:00Z"
}
```

所以 API 层需要约定时区和格式。

---

## 十一、CORS

浏览器有 Same-Origin Policy。

如果：

```text
Frontend:
https://app.example.com

API:
https://api.example.com
```

浏览器会检查跨 Origin 请求是否被服务端允许。

CORS 是：

> 浏览器层的跨源访问控制机制。

CORS 不是服务器 API 的真正权限系统。

恶意脚本或 curl 不会因为你的 CORS 配置就失去调用服务器的能力。

---

## 十二、Cookie Authentication 与 Bearer Token

### Cookie

浏览器可自动携带。

注意：

- SameSite
- Secure
- HttpOnly

### Bearer Token

通常放 Authorization Header。

两种方式都有安全边界，不存在“Token 一定比 Cookie 安全”的简单结论。

---

## 十三、CSRF 与 Cookie

如果浏览器自动携带 Cookie，攻击者可能诱导用户浏览器发请求。

所以要理解：

- SameSite
- CSRF token
- Origin/Referer validation

具体实现以后跟框架/Auth 平台结合。

---

## 十四、Rate Limiting

常用于：

- Login
- Password Reset
- OTP
- Public API
- Expensive Search
- AI 功能

如果无限调用：

可能：

- 暴力破解
- 滥用
- 成本爆炸
- DoS

---

## 十五、Pagination

不要：

```text
GET /api/audit-logs
→ 返回 100 万条
```

常见：

### Offset

```text
?page=3&pageSize=20
```

### Cursor

```text
?after=cursor_xxx&limit=20
```

Cursor 对大数据/实时变化通常更稳。

---

## 十六、API Versioning

产品成熟后可能需要：

```text
/api/v1/projects
/api/v2/projects
```

但不要太早制造版本复杂度。

---

## 十七、API 安全检查

每个 API 都问：

1. 是否需要登录？
2. 需要什么 Permission？
3. Resource 属于哪个 Organization？
4. Request 是否做 runtime validation？
5. 是否有字段允许用户自行指定但不应该信任？
6. 是否可能 Mass Assignment？
7. 是否需要 Rate Limit？
8. 是否写 Audit Log？

例如绝不能直接信任：

```json
{
  "organizationId": "B"
}
```

然后把它当真实租户。

当前租户应从受信任身份上下文推导。

---

## 十八、Postman / Bruno 实验

对自己的本地 API：

- GET
- POST
- PATCH
- DELETE

尝试：

- 去掉 Token
- 使用错误 ID
- 传空 name
- 传超长字段
- 改 organizationId
- 重复提交

观察状态码。

---

## 十九、本章验收

你应该掌握：

- HTTP Method
- Headers
- Body
- Status Code
- Idempotency
- Path vs Query
- API Contract
- REST
- JSON 限制
- CORS
- Cookie/Token 基础
- Rate Limit
- Pagination
- API 权限边界

## 推荐资料

- MDN HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP
- MDN Methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods
- MDN Status: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- MDN CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
