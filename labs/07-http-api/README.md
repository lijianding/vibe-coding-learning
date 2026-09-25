# Lab 07：HTTP API

对应：

- docs/03-web-fundamentals.md
- docs/08-http-api.md
- docs/19-nodejs-runtime.md

## 目标

不用 Express/Next.js，直接用 Node.js 原生 HTTP 模块理解：

- Request
- Response
- Method
- URL
- Status Code
- JSON Body
- Validation
- Error Contract

## 运行

```bash
node server.js
```

GET：

```bash
curl http://localhost:3001/projects
```

POST：

```bash
curl -X POST http://localhost:3001/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Hospital A Upgrade"}'
```

## 练习

见 `exercises.md`。

完成后对照 `server-solution.js`。

## 验收

能解释：

```text
curl
↓
TCP/HTTP
↓
Node Server
↓
Route Logic
↓
JSON Response
```
