# 18 商用 SaaS Production Readiness Checklist

> 每次正式 Release 前逐项检查。存在 Critical Blocker 时停止发布。

## Product

- [ ] 核心 Use Case 有明确 Acceptance Criteria
- [ ] Loading / Empty / Error / Success 状态齐全
- [ ] Dangerous Action 有确认
- [ ] Date/Timezone 定义清晰
- [ ] Browser refresh 不破坏关键状态
- [ ] Critical workflow 有 E2E

## Authentication

- [ ] Register/Login/Logout
- [ ] Password Reset
- [ ] Session Expiry
- [ ] Session Refresh
- [ ] Disabled User
- [ ] Privileged Role 考虑 MFA
- [ ] Brute-force/Rate Limit

## Authorization

- [ ] Permission Matrix 已审查
- [ ] Server-side Authorization
- [ ] Resource-level Authorization
- [ ] 不依赖隐藏按钮
- [ ] Vertical escalation tests
- [ ] Horizontal escalation tests

## Multi-Tenant

- [ ] Tenant Context 来自受信任身份
- [ ] Business tables tenant scoped
- [ ] A SELECT B 被拒绝
- [ ] A UPDATE B 被拒绝
- [ ] A DELETE B 被拒绝
- [ ] Search 不跨租户
- [ ] Dashboard 不跨租户
- [ ] Export 不跨租户
- [ ] Storage 不跨租户

## RLS / Database

- [ ] Exposed tables RLS reviewed
- [ ] GRANT reviewed
- [ ] SELECT policy
- [ ] INSERT with check
- [ ] UPDATE using/with check
- [ ] DELETE policy
- [ ] Views reviewed
- [ ] Service Role usage reviewed
- [ ] FK/Unique/Check constraints
- [ ] Indexes based on real queries

## Validation

- [ ] Client validation
- [ ] Server runtime validation
- [ ] Length limits
- [ ] Enum validation
- [ ] Date validation
- [ ] ID validation
- [ ] Allowed fields whitelist
- [ ] Mass assignment blocked

## Security

- [ ] SQL Injection review
- [ ] XSS review
- [ ] CSRF review
- [ ] SSRF review
- [ ] IDOR/BOLA review
- [ ] Secrets not in Git
- [ ] Secrets not in logs
- [ ] Dependencies reviewed
- [ ] Security headers reviewed
- [ ] Rate limiting

## Storage

- [ ] Private/public classification
- [ ] MIME validation
- [ ] Size limit
- [ ] Filename handling
- [ ] Tenant policies
- [ ] Signed URL expiry
- [ ] File delete lifecycle
- [ ] Backup strategy

## Audit

- [ ] Role changes logged
- [ ] Member changes logged
- [ ] Critical resource mutations logged
- [ ] Export logged if required
- [ ] Audit immutable to normal users
- [ ] request_id / actor / resource / time present

## Error Handling

- [ ] Unified error model
- [ ] User does not see stack
- [ ] User does not see SQL
- [ ] 4xx/5xx semantics reasonable
- [ ] Error logs include requestId
- [ ] Network retry does not duplicate mutations

## Tests

- [ ] Unit
- [ ] Integration
- [ ] E2E
- [ ] Allow cases
- [ ] Deny cases
- [ ] Regression
- [ ] lint
- [ ] typecheck
- [ ] build

## Performance

- [ ] Large list paginated
- [ ] SELECT fields minimal
- [ ] N+1 reviewed
- [ ] EXPLAIN critical queries
- [ ] Indexes reviewed
- [ ] DB connections monitored
- [ ] p95 latency observed
- [ ] Slow export backgrounded

## CI/CD

- [ ] PR CI required
- [ ] main protected
- [ ] CI secrets protected
- [ ] Staging exists
- [ ] Production approval defined
- [ ] Build artifact reproducible
- [ ] Deployment history available

## Migration

- [ ] Migration versioned
- [ ] Staging tested
- [ ] Backward compatibility reviewed
- [ ] Data backfill plan
- [ ] Lock risk reviewed
- [ ] Rollback/roll-forward plan

## Monitoring

- [ ] Error tracking
- [ ] Server logs
- [ ] Database logs
- [ ] Deployment alerts
- [ ] 5xx monitoring
- [ ] Latency monitoring
- [ ] Alert owner defined

## Backup / DR

- [ ] DB backup
- [ ] Storage backup
- [ ] Retention
- [ ] Restore tested
- [ ] RPO defined
- [ ] RTO defined
- [ ] Restore runbook
- [ ] Incident runbook

## SaaS Commercial

- [ ] Plan/Entitlement
- [ ] Quota server-enforced
- [ ] Trial behavior
- [ ] Upgrade
- [ ] Downgrade
- [ ] Cancellation
- [ ] Suspension
- [ ] Export window
- [ ] Customer offboarding
- [ ] Billing webhook idempotent

## Privacy / Healthcare

- [ ] Data inventory
- [ ] Data classification
- [ ] Third-party subprocessors
- [ ] Retention
- [ ] Deletion
- [ ] Test data synthetic
- [ ] Sensitive data excluded from logs
- [ ] Applicable legal/compliance review completed

## Release Blockers

以下任一项存在应暂停 Production：

- 跨租户数据泄漏
- 未授权管理员操作
- Secret 泄漏
- 无法恢复关键数据
- Production 无监控
- 高危 SQLi/XSS/SSRF
- 核心流程无测试
- Migration 明显不可恢复
