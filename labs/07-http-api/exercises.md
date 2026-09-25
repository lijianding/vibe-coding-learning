# HTTP API Exercises

## Exercise 1：GET by ID

实现：

```text
GET /projects/p1
```

存在：

```text
200
```

不存在：

```text
404
```

---

## Exercise 2：POST

实现：

```text
POST /projects
```

Body：

```json
{
  "name": "Hospital B Project"
}
```

成功返回：

```text
201 Created
```

---

## Exercise 3：Validation

以下输入必须 400：

```json
{}
```

```json
{
  "name": ""
}
```

```json
{
  "name": 123
}
```

---

## Exercise 4：Invalid JSON

无效 JSON：

```text
400 INVALID_JSON
```

---

## Exercise 5：统一 Error Contract

所有错误格式：

```json
{
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

---

## 思考题

1. 为什么 401 和 403 不一样？
2. 为什么 GET 不应该修改 projects？
3. POST 重复调用为什么可能创建两条记录？
4. API 为什么不能直接相信客户端 organizationId？
