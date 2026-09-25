# 14 测试与 Web 安全：用证据证明软件可靠

> 本章目标：从“我手工点过一次”升级到“系统有可重复、自动化的正确性与安全性证据”。

## 官方源资料

- Vitest Guide: https://vitest.dev/guide/
- Playwright: https://playwright.dev/docs/intro
- MDN Web Security: https://developer.mozilla.org/en-US/docs/Web/Security
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP WSTG: https://owasp.org/www-project-web-security-testing-guide/

---

# 第一部分：测试

## 一、为什么手工测试不够

你手工成功创建一次 Project，只证明：

```text
某个浏览器
某个账号
某个输入
某个时间
某个数据状态
```

下成功了。

并没有证明：

- 空输入
- 重复输入
- 无权限
- 未登录
- 跨租户
- 资源不存在
- API 超时
- 数据库错误
- 并发更新

所以需要自动化测试。

---

## 二、Unit Test

测试最小独立逻辑。

例如：

```typescript
calculateProgress(7, 10)
→ 70
```

适合：

- Pure Function
- Validation
- Permission helper
- Date calculation
- Status transition

---

## 三、Arrange / Act / Assert

```typescript
it("calculates progress", () => {
  // Arrange
  const completed = 7;
  const total = 10;

  // Act
  const result = calculateProgress(
    completed,
    total
  );

  // Assert
  expect(result).toBe(70);
});
```

---

## 四、Integration Test

测试多个组件一起工作。

例如：

```text
Route Handler
+
Validation
+
Database
+
RLS
```

测试：

```text
POST /projects
↓
201
↓
Database row exists
↓
Audit row exists
```

---

## 五、E2E Test

模拟用户真实操作。

```text
Open Browser
↓
Login
↓
Open Projects
↓
Create Project
↓
Save
↓
See Project
```

Playwright 适合：

- Chromium
- Firefox
- WebKit
- Screenshot
- Trace
- CI

---

## 六、Testing Pyramid

直觉：

```text
        E2E
      Integration
       Unit
```

通常：

- Unit 多、快
- Integration 中量
- E2E 少而关键

不要把每个边缘字段都用 E2E 测，否则慢且脆。

---

## 七、测试用例设计

每个功能至少考虑：

### Happy Path

正常输入。

### Validation

- required
- format
- max length
- enum
- date range

### AuthN

- anonymous
- expired session

### AuthZ

- role denied
- resource denied

### Tenant

- correct org
- wrong org

### Resource State

- not found
- archived
- deleted

### Failure

- database unavailable
- external service timeout

---

## 八、Deny Case

安全系统不能只测允许。

必须测：

```text
Admin A can read Project A
Engineer A cannot delete Project A
Admin A cannot read Project B
Anonymous cannot read Project A
```

“拒绝测试”是权限测试核心。

---

## 九、Mock

Mock 用假的依赖替代真实依赖。

适合：

- Email
- Payment
- Third-party API

但如果全部都 Mock：

> 你只证明了 Mock 与代码配合正常。

所以数据库、RLS 等关键部分必须有 Integration Test。

---

## 十、Fixture / Seed

准备可重复数据：

```text
org_a
admin_a
engineer_a
project_a

org_b
admin_b
project_b
```

这样跨租户测试非常清晰。

---

## 十一、Coverage

Coverage 告诉你：

> 哪些代码被执行过？

它不证明：

- 业务正确
- 权限安全
- 测试断言正确

所以 100% Coverage 不等于高质量。

---

## 十二、Regression Test

修 Bug 时：

```text
Reproduce Bug
↓
Write Failing Test
↓
Fix
↓
Test Pass
↓
Keep Test
```

防止以后 AI 重构又把同一个 Bug 引回来。

---

# 第二部分：安全

## 十三、Threat Modeling

在实现功能前思考：

### Asset

需要保护什么？

- 项目资料
- 用户身份
- 权限
- 文档
- Audit Log
- API Key

### Threat Actor

谁可能攻击？

- 未登录外部用户
- 普通用户
- 恶意租户
- 被盗账号

### Entry Point

- Web Form
- API
- File Upload
- Webhook
- Login
- Invite

---

## 十四、Trust Boundary

浏览器与服务器之间就是一个重要边界。

任何客户端输入：

> 默认不可信。

包括：

- Form
- Query
- Path
- Cookie
- Header
- JSON
- File

---

## 十五、SQL Injection

危险：

```typescript
const sql =
  "select * from users where name = '" +
  input +
  "'";
```

应使用参数化查询。

不要手工拼 SQL。

---

## 十六、XSS

攻击者让浏览器执行恶意脚本。

输入：

```html
<script>...</script>
```

防护：

- 输出编码
- React 默认文本转义
- 避免 raw HTML
- Sanitization
- CSP

`dangerouslySetInnerHTML` 要特别谨慎。

---

## 十七、CSRF

Cookie 认证场景下，浏览器可能自动带认证 Cookie。

攻击页面诱导请求。

防护包括：

- SameSite
- CSRF Token
- Origin checking
- 框架推荐机制

---

## 十八、SSRF

服务器根据用户提供 URL 发请求。

攻击者可能尝试访问：

- localhost
- 内网
- metadata service

防护：

- allowlist
- URL validation
- deny private IP range
- network controls

---

## 十九、Broken Access Control

SaaS 最大风险之一。

例如：

```text
Hospital A
GET /api/projects/B-project
→ 200
```

即严重越权。

防护：

- Server Authorization
- Tenant Filter
- RLS
- Automated Deny Tests

---

## 二十、IDOR / BOLA

用户把资源 ID 改掉：

```text
/projects/abc
↓
/projects/xyz
```

如果拿到别人的资源，就是资源级授权缺失。

UUID 不等于权限。

---

## 二十一、Mass Assignment

危险：

```typescript
db.update(req.body)
```

攻击者可能传入：

```json
{
  "role": "admin",
  "organization_id": "victim"
}
```

解决：

> 服务端白名单字段。

---

## 二十二、Session Security

考虑：

- Secure Cookie
- HttpOnly
- SameSite
- Expiry
- Logout
- Refresh
- Session Revocation
- MFA for privileged users

---

## 二十三、Rate Limiting

重点：

- Login
- OTP
- Password Reset
- Invite
- Public API
- Expensive Query
- AI Feature

保护：

- brute force
- abuse
- DoS
- cost explosion

---

## 二十四、File Upload

检查：

- size
- extension
- MIME
- filename
- path
- tenant
- private/public
- malware scanning（视风险）

不能只看文件扩展名。

---

## 二十五、Secrets

永远不要提交：

- DB password
- OAuth secret
- Service Role
- API key
- SMTP password

即使仓库 Private 也不应该。

泄漏后：

> Rotate，不是只删除 Git 当前文件。

因为 Git History 里可能仍存在。

---

## 二十六、Security Headers

需要理解：

- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- frame protection

现代平台可能帮你设置部分默认，但仍应知道用途。

---

## 二十七、Dependency Security

npm 项目通常有大量依赖。

需要：

- 少装包
- 看维护状态
- 看权限/用途
- 定期更新
- Dependabot
- Security advisories
- npm audit 作为辅助

AI 很容易为一个很小功能安装大型依赖，要 Review。

---

## 二十八、Logging Security

日志不要包含：

- Password
- Access Token
- Refresh Token
- Secret
- 不必要敏感数据

错误信息给用户也不要返回：

- SQL
- Stack trace
- Server filesystem path
- Secret

---

## 二十九、OWASP ASVS

ASVS 适合作为：

> 应用安全验收清单。

它覆盖：

- Architecture
- Authentication
- Session
- Access Control
- Validation
- Cryptography
- Logging
- API
- Files

不要背，用于 Review。

---

## 三十、OWASP WSTG

WSTG 更偏：

> 如何测试 Web 安全。

适合你以后做：

- Auth testing
- Authorization testing
- Session testing
- Input validation testing
- Configuration testing

---

## 三十一、安全 Review 流程

```text
Feature Plan
↓
Threat Model
↓
Implementation
↓
Unit/Integration Tests
↓
Authorization Tests
↓
Security Review
↓
E2E
↓
Release Checklist
```

---

## 三十二、实践任务

对 Project 功能写：

### Unit

- status transition
- validation

### Integration

- create row
- audit row
- RLS

### E2E

- admin creates project
- engineer denied delete
- org A denied org B

### Security

尝试：

- 改 ID
- 改 organizationId
- 加 admin 字段
- 删除 Token
- 超长输入
- XSS payload

只在自己的测试系统中做。

---

## 三十三、本章验收

应能解释：

- Unit / Integration / E2E
- AAA
- Testing Pyramid
- Fixture
- Mock
- Coverage 限制
- Regression
- Threat Modeling
- Trust Boundary
- SQL Injection
- XSS
- CSRF
- SSRF
- Broken Access Control
- IDOR/BOLA
- Mass Assignment
- Session Security
- Rate Limit
- File Upload
- Secret Rotation
- ASVS / WSTG 用法
