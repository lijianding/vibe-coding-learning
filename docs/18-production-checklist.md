# 18 商用 SaaS 上线检查表

> 页面能打开 ≠ 可以商用。

此清单用于每次 Production Release 前检查。

## 1. Product
- [ ] 核心业务流程完整
- [ ] 空状态合理
- [ ] 错误提示明确
- [ ] 删除等危险操作有确认
- [ ] 时区与日期逻辑明确
- [ ] 关键业务规则有文档

## 2. Authentication
- [ ] 注册流程正确
- [ ] 登录正确
- [ ] 登出正确
- [ ] 密码重置正确
- [ ] Session 过期行为正确
- [ ] 未登录用户无法访问受保护资源
- [ ] 必要时考虑 MFA

## 3. Authorization
- [ ] RBAC 权限矩阵已确认
- [ ] API 端做权限验证
- [ ] 服务端做权限验证
- [ ] 不是只隐藏前端按钮
- [ ] 管理员权限边界明确

## 4. Multi-Tenant
- [ ] 所有业务表租户归属明确
- [ ] Organization A 无法读 B
- [ ] A 无法改 B
- [ ] A 无法删 B
- [ ] A 无法访问 B 文件
- [ ] 导出数据不会跨租户
- [ ] 搜索不会跨租户
- [ ] Dashboard 聚合不会跨租户

## 5. RLS / Database
- [ ] 对暴露表启用必要 RLS
- [ ] Policy 已测试
- [ ] 主键完整
- [ ] 外键完整
- [ ] 唯一约束合理
- [ ] 索引合理
- [ ] Migration 有审查
- [ ] Migration 有回滚思路
- [ ] 长事务风险已检查

## 6. Input Validation
- [ ] 前端有基础校验
- [ ] 服务端再次校验
- [ ] 长度限制
- [ ] 类型限制
- [ ] 文件大小限制
- [ ] 文件类型限制
- [ ] 非法 ID 正确处理

## 7. Security
- [ ] 无硬编码 Secret
- [ ] .env 不提交
- [ ] Service Role Key 不在浏览器
- [ ] 检查 XSS
- [ ] 检查 SQL Injection
- [ ] 检查 CSRF
- [ ] 检查 SSRF
- [ ] 检查 Broken Access Control
- [ ] 登录接口考虑 Rate Limit
- [ ] 敏感操作有额外保护

## 8. File / Storage
- [ ] Bucket 权限正确
- [ ] Private 文件不公开
- [ ] Signed URL 生命周期合理
- [ ] 跨租户附件测试通过
- [ ] 恶意文件类型有限制
- [ ] 删除业务数据时附件策略明确

## 9. Audit
- [ ] 登录相关事件按需记录
- [ ] 权限变更记录
- [ ] 重要增删改记录
- [ ] 审计日志不可被普通用户篡改
- [ ] 时间、用户、资源、动作完整

## 10. Error Handling
- [ ] 用户看不到敏感堆栈
- [ ] 500 有统一处理
- [ ] API 错误结构一致
- [ ] 前端有 Error State
- [ ] 网络失败可恢复

## 11. Testing
- [ ] Unit Test 通过
- [ ] Integration Test 通过
- [ ] E2E 关键流程通过
- [ ] 权限测试通过
- [ ] 跨租户测试通过
- [ ] 回归测试通过
- [ ] lint 通过
- [ ] typecheck 通过
- [ ] build 通过

## 12. Performance
- [ ] 大列表有分页
- [ ] 常用查询有索引
- [ ] 无明显 N+1
- [ ] 图片/文件大小受控
- [ ] 慢查询可以发现

## 13. Logging / Monitoring
- [ ] Production 日志可访问
- [ ] 错误监控已配置
- [ ] HTTP 500 可告警
- [ ] 部署失败可发现
- [ ] 数据库异常可发现
- [ ] 日志不输出密码/Token/敏感数据

## 14. Backup / Recovery
- [ ] 数据库备份策略明确
- [ ] 文件备份策略明确
- [ ] 已进行 Restore 演练
- [ ] RPO 明确
- [ ] RTO 明确
- [ ] 误删除恢复流程明确

## 15. Deployment
- [ ] Development 与 Production 分离
- [ ] Environment Variables 分离
- [ ] CI 检查通过才能发布
- [ ] Production 发布步骤有文档
- [ ] Rollback 有文档
- [ ] 数据库 Migration 发布顺序明确

## 16. SaaS Commercial
- [ ] Organization 生命周期明确
- [ ] 用户邀请流程明确
- [ ] 套餐和权限关系明确
- [ ] 订阅状态处理明确
- [ ] 到期行为明确
- [ ] Usage Limit 明确
- [ ] 客户数据导出方案明确
- [ ] 客户注销/删除数据方案明确

## 17. Privacy / Compliance
如果只是普通实施项目管理系统：
- [ ] 不使用真实患者数据作为测试数据
- [ ] 收集哪些个人信息有清单
- [ ] 数据保存周期明确
- [ ] 删除机制明确
- [ ] 第三方服务清单明确

如果未来涉及真实患者、诊疗或受监管健康数据：
> 不要直接沿用普通 SaaS 的合规假设。应针对实际国家/地区和业务形态单独进行法律、隐私、安全与医疗监管评估。

## Release Gate
存在以下问题时，不建议发布正式商用版本：
- Critical 越权
- 跨租户数据泄漏
- 数据不可恢复
- Secret 泄漏
- 核心流程无测试
- Production 无监控
- 无回滚能力
