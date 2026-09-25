# Lab 08：Testing + Authorization Security

对应：

- docs/13-rbac-multitenant-rls-audit.md
- docs/14-testing-security.md

## 安装

```bash
npm install
```

## 运行

```bash
npm test
```

## 目标

理解安全测试必须同时有：

- Allow Case
- Deny Case
- Cross-tenant Case

## 文件

- `permission.js`：待测试权限函数
- `permission.test.js`：测试
- `security-cases.md`：攻击者思维练习

## 验收

不能只证明：

> Admin A 可以读 A。

还必须证明：

> Admin A 不可以读 B。
