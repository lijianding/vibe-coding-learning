# Backup / Restore Drill

> 只在测试环境操作。

## 场景

假设误删除了一批 Projects。

## 演练步骤

1. 记录当前测试数据 Row Count。
2. 执行数据库 Backup。
3. 记录 Backup 时间。
4. 删除测试数据。
5. 确认应用确实受影响。
6. Restore 到隔离测试数据库。
7. 验证：
   - organizations
   - projects
   - tasks
   - attachments metadata
   - permissions
8. 记录恢复耗时。
9. 比较实际结果与目标 RPO/RTO。

## 输出

写下：

```text
Backup Timestamp:
Failure Timestamp:
Restore Start:
Restore Finish:
Estimated Data Loss:
Actual RTO:
Problems:
Follow-up Actions:
```
