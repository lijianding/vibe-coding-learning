# Incident Runbook Template

## 1. Detection

谁发现？

```text
Alert / Customer / Engineer
```

## 2. Impact

- 哪些客户？
- 哪些功能？
- 是否有数据泄漏？
- 是否有数据损坏？

## 3. Immediate Mitigation

优先恢复安全与可用性：

- disable feature
- rollback
- block endpoint
- revoke secret
- switch read-only

## 4. Evidence

保留：

- request ID
- logs
- deploy SHA
- timestamps
- affected tenant

不要破坏证据。

## 5. Recovery

明确：

- code rollback
- DB action
- restore
- validation

## 6. Communication

谁通知：

- internal team
- customer
- security/legal（如适用）

## 7. Postmortem

- Timeline
- Root Cause
- Detection Gap
- What Worked
- What Failed
- Action Items
