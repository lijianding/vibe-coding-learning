# 16 毕业项目：Medical Implementation SaaS

这是整套学习路线的最终实战。

## 项目边界
用于医院软件实施项目协作。

学习阶段禁止保存真实患者诊疗数据。

## 角色
- Platform Admin
- Organization Admin
- Project Manager
- Implementation Engineer
- Customer User

## 模块

### 1. Authentication
- Login
- Logout
- Password Reset

### 2. Organization
- 医院 / 组织
- Organization Members

### 3. Project
- 项目列表
- 项目详情
- 项目成员
- 里程碑
- 上线日期
- 项目状态

### 4. Task
- 负责人
- 优先级
- 截止日期
- 状态
- 评论

### 5. Requirement
- 需求标题
- 描述
- 来源
- 优先级
- 状态
- 负责人

### 6. Issue
- 问题单
- 严重程度
- 状态
- 负责人
- 解决记录

### 7. Attachment
- 实施方案
- 测试报告
- 截图
- 上线材料

### 8. Dashboard
- 项目总数
- 进行中项目
- 逾期任务
- 高优先级 Issue
- 即将上线项目

### 9. Authorization
- RBAC
- Multi-Tenant
- RLS

### 10. Audit Log
记录重要增删改和权限相关操作。

## 推荐开发顺序
```text
项目骨架
↓
Organization
↓
Project CRUD
↓
Authentication
↓
Task
↓
Issue
↓
RBAC
↓
Multi-Tenant
↓
RLS
↓
Audit Log
↓
Attachment
↓
Search/Pagination
↓
Dashboard
↓
Testing
↓
Security Review
↓
Deployment
↓
Monitoring
↓
Backup/Restore
```

## Definition of Done
一个功能只有满足以下条件才算完成：
- 需求明确
- 正常流程可用
- 异常流程可处理
- 权限正确
- 跨租户隔离正确
- 有必要的测试
- lint/typecheck/build 通过
- 有日志
- 文档已更新
- Git Commit 清晰

## 毕业标准
你能独立从一个业务需求出发：
1. 写需求
2. 设计数据
3. 设计权限
4. 让 AI 出计划
5. 实现
6. 测试
7. Review
8. 部署
9. 排障
10. 回滚

达到这里，你已经不再只是“会让 AI 生成页面”。