# 08 HTTP / REST API / JSON

## HTTP Method
| Method | 用途 |
|---|---|
| GET | 查询 |
| POST | 创建 |
| PUT | 整体替换 |
| PATCH | 部分更新 |
| DELETE | 删除 |

## 状态码
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error

## 401 vs 403
401：
> 身份未确认。

403：
> 知道你是谁，但没有权限。

## Authentication vs Authorization
Authentication：
> 你是谁？

Authorization：
> 你能做什么？

## REST 示例
```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

## Request
```http
POST /api/projects
Content-Type: application/json
```

```json
{
  "name": "HIS Upgrade",
  "status": "planning"
}
```

## Response
```json
{
  "id": "p_001",
  "name": "HIS Upgrade",
  "status": "planning"
}
```

## 用 Postman/Bruno 练习
- GET
- POST
- PATCH
- DELETE
- 查看 Headers
- 查看 Body
- 查看状态码

## 验收
能解释一个 POST 请求从浏览器到数据库再返回的全过程。