# 17 AI Coding Prompt 模板

这些 Prompt 用于“让 AI 可控地工作”，而不是一次生成整个系统。

## 1. 需求整理
```text
不要写代码。

请把下面业务需求整理成软件需求规格，输出：
1. 用户角色
2. 使用场景
3. 功能要求
4. 业务规则
5. 权限要求
6. 数据要求
7. 异常情况
8. 验收标准
9. 暂不实现内容

如果有歧义，请明确列为“假设”。
```

## 2. 数据库设计
```text
不要写前端代码。

根据需求设计数据库，输出：
- 表
- 字段
- 类型
- 主键
- 外键
- 唯一约束
- 索引
- organization_id 等租户字段
- created_at / updated_at / deleted_at
- 设计理由
- 潜在数据一致性问题
```

## 3. 权限设计
```text
设计 RBAC 权限矩阵。

请按角色列出：
- READ
- CREATE
- UPDATE
- DELETE
- 特殊动作

并额外检查：
1. 跨租户访问
2. 资源归属
3. 管理员边界
4. 前端与服务端权限是否一致
```

## 4. 开发前 Plan
```text
先阅读整个项目，不修改代码。

我要实现：[功能]

请输出：
1. 当前相关代码结构
2. 实现方案
3. 要修改的文件
4. 是否需要数据库迁移
5. 是否影响权限
6. 是否新增 API
7. 是否新增环境变量
8. 测试方案
9. 回滚方案
10. 风险
```

## 5. 只实现一个 Feature
```text
按照已确认计划，只实现：[功能]

要求：
- 不修改无关模块
- 保持现有代码风格
- 避免 any
- 正确处理错误
- 正确处理权限
- 增加必要测试
- 完成后运行 lint、typecheck、test、build
- 最后总结修改文件和验证结果
```

## 6. 代码解释
```text
不要修改代码。

请用适合“有 SQL/Linux 基础但编程基础较弱”的方式解释这段代码。

按以下结构：
1. 这段代码总体做什么
2. 输入
3. 输出
4. 每个函数的职责
5. 数据流
6. 哪些是异步操作
7. 哪些地方可能报错
8. 权限相关位置
9. 我必须掌握的语法
10. 给我 3 道变式练习
```

## 7. Bug 分析
```text
先分析，不要直接修改。

错误信息：
[粘贴]

请输出：
1. 错误发生在哪一层
2. 最可能根因
3. 如何验证根因
4. 最小修复方案
5. 是否可能影响其他功能
6. 修复后应该跑哪些测试
```

## 8. Git Diff Review
```text
不要修改代码。

请 Review 当前 Git Diff。

重点检查：
1. 是否符合需求
2. 是否修改无关文件
3. 是否有 Breaking Change
4. 类型问题
5. 错误处理
6. 数据一致性
7. 权限
8. 跨租户
9. 测试覆盖
10. 是否适合提交

按 Critical / High / Medium / Low 输出。
```

## 9. Security Review
```text
不要修改代码。

请以 Application Security Engineer 身份进行审查。

重点检查：
- Broken Access Control
- 跨租户越权
- SQL Injection
- XSS
- CSRF
- SSRF
- Session
- 敏感信息泄漏
- 文件上传
- Storage 权限
- Secret
- Rate Limit
- Audit Log

不要只说明理论，请指出具体代码路径和攻击场景。
```

## 10. 测试生成
```text
请先根据当前功能列出测试用例，不写测试代码。

分类：
- 正常流程
- 边界
- 非法输入
- 未登录
- 无权限
- 跨租户
- 资源不存在
- 服务异常

我确认后再生成测试代码。
```

## 11. 数据库 Migration Review
```text
不要执行数据库修改。

Review 这次 migration：
1. 是否破坏已有数据
2. 是否需要默认值
3. 是否会锁表
4. 索引是否合理
5. 外键是否合理
6. 是否支持回滚
7. 多租户字段是否完整
8. RLS 是否需要同步更新
```

## 12. Production 上线前 Review
```text
不要修改代码。

把当前版本当作即将正式收费的 SaaS，
从以下方面做上线前审查：

- 功能
- Authentication
- Authorization
- Multi-Tenant
- RLS
- 输入验证
- 错误处理
- Audit Log
- Secret
- Testing
- Performance
- Backup
- Monitoring
- Deployment
- Rollback
- Privacy

输出：
Critical blockers
High priority
Medium priority
可上线后优化
```
