# 14 测试与 Web 安全

## 一、测试

商业系统不能只靠“点了一下，好像能用”。

### Unit Test
测试独立函数。

工具：
https://vitest.dev/guide/

例如：
```text
10 个任务
7 个完成
=> 70%
```

### Integration Test
测试多个组件组合，例如：
```text
API + Database
```

### E2E
模拟用户：
```text
打开网站
↓
登录
↓
进入 Projects
↓
创建项目
↓
保存
↓
看到新项目
```

工具：
https://playwright.dev/docs/intro

## 二、每个功能至少测试
- 正常输入
- 空输入
- 非法输入
- 未登录
- 无权限
- 跨租户
- 数据不存在
- 服务异常

## 三、安全基础
重点理解：
- Broken Access Control
- SQL Injection
- XSS
- CSRF
- SSRF
- Authentication Failure
- Session Security
- File Upload Security
- Secrets Management
- Dependency Vulnerability
- Rate Limiting
- Logging

## OWASP ASVS
https://owasp.org/www-project-application-security-verification-standard/

不要背标准。
把它当上线检查表。

## 四、Secret
永远不要提交：
- 数据库密码
- API Key
- Service Role Key
- SMTP 密码
- 支付密钥

使用环境变量。

## 五、AI Security Review Prompt
```text
不要修改代码。
请以 Application Security Engineer 身份审查本次改动。

重点检查：
1. 越权
2. 跨租户访问
3. SQL Injection
4. XSS
5. CSRF
6. 敏感信息泄漏
7. 文件权限
8. Session
9. Rate Limit
10. 审计日志

按 Critical / High / Medium / Low 输出。
```

## 验收
能解释为什么“有登录”不代表“安全”。