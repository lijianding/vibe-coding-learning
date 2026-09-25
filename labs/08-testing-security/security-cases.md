# Security Cases

只在自己的测试环境中练习。

## Case 1：IDOR

正常：

```text
GET /projects/project-a
```

把 ID 改为：

```text
GET /projects/project-b
```

期待：

```text
403 或安全设计下的 404
```

---

## Case 2：Mass Assignment

正常表单：

```json
{
  "name": "Project A"
}
```

攻击输入：

```json
{
  "name": "Project A",
  "organizationId": "org-b",
  "role": "admin"
}
```

服务端必须忽略/拒绝不允许字段。

---

## Case 3：Anonymous

移除 Session/Token。

访问：

```text
/projects
```

期待拒绝。

---

## Case 4：Cross-Tenant Export

Org A 用户请求导出 Org B。

期待拒绝。

---

## Case 5：XSS

在自己的测试表单输入：

```html
<script>alert(1)</script>
```

检查 UI 是否作为普通文本显示，而不是执行。

---

## Case 6：Storage

Org A 用户获取 Org B private attachment URL。

期待：

```text
Denied
```
