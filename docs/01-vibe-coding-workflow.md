# 01 Vibe Coding：如何正确地让 AI 参与软件开发

> 本章目标：建立正确的软件开发工作方式。Vibe Coding 不是“不会编程也能随便让 AI 写”，而是让 AI 作为高效率 Coding Agent，人负责目标、边界、设计、审查与验收。

## 推荐源资料

- GitHub Copilot Docs: https://docs.github.com/en/copilot
- Cursor Docs: https://cursor.com/docs
- NIST SSDF: https://csrc.nist.gov/projects/ssdf
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/

---

## 一、Vibe Coding 的正确理解

错误理解：

```text
我说一句需求
↓
AI 写完整系统
↓
页面打开
↓
完成
```

正确理解：

```text
业务目标
↓
需求分析
↓
数据模型
↓
权限模型
↓
技术设计
↓
Implementation Plan
↓
AI Coding
↓
测试
↓
Diff Review
↓
Security Review
↓
Commit
↓
Release
```

AI 提高的是“实现速度”，不是自动消除工程风险。

---

## 二、AI 擅长什么

AI 很适合：

- 生成样板代码
- 创建组件
- 重构重复代码
- 写测试
- 解释错误
- 查找相关文件
- 生成 Migration 草案
- 生成 SQL
- 写文档
- Review Diff

---

## 三、AI 不应该替你最终决定什么

你必须掌握：

- 产品需求
- 数据边界
- Tenant Boundary
- 权限
- 安全
- 数据库不可逆变更
- Production Release
- Compliance

特别是：

> AI 生成的权限代码必须人工验证。

---

## 四、Context 是 AI Coding 的核心

AI 输出质量取决于它知道多少正确上下文。

一个好 Prompt 应包含：

```text
Context
Current State
Task
Constraints
Acceptance Criteria
Files/Modules
Security Requirements
Tests
```

---

## 五、任务一定要小

不要：

```text
帮我完成整个 SaaS
```

改成：

```text
只实现 Projects List：
- 支持分页
- 只能显示当前 Organization
- 需要 project.read
- 包含 loading/empty/error
- 不修改其他模块
```

---

## 六、Plan First

大型改动先要求：

```text
不要修改代码。
先阅读仓库。
给出实现计划。
```

计划应回答：

- 哪些文件
- 数据库是否变化
- 权限是否变化
- API 是否变化
- 测试怎么写
- 风险是什么

---

## 七、Acceptance Criteria

例如：

```text
Given Admin A belongs to Org A
When opening /projects
Then only Org A projects are shown

Given Admin A tries Org B project URL
Then access is denied
```

没有验收标准，AI 很容易“看起来实现了”。

---

## 八、最小 Diff 原则

要求 AI：

> 不改无关文件，不进行无关重构。

理由：

- Diff 更容易审查
- Bug 范围更小
- 回滚更容易
- PR 更清晰

---

## 九、每次修改后的标准动作

```text
git status
git diff
lint
typecheck
unit test
integration test
build
```

关键权限功能再跑 E2E / Security Test。

---

## 十、为什么要看 Git Diff

AI 可能：

- 删除安全检查
- 修改 unrelated config
- 安装新依赖
- 把 secret 打日志
- 用 any 消除类型错误

Diff 是发现这些问题的第一道人工防线。

---

## 十一、双 AI Review

一种实用流程：

### AI A

负责实现。

### AI B

只 Review：

- logic
- auth
- tenant
- security
- tests

不要把“写代码的同一个思路”当唯一审查视角。

---

## 十二、Debug 的正确方式

不要一报错就：

```text
修复所有问题
```

更好：

```text
先不要修改代码。
解释：
1. Error layer
2. Root cause hypotheses
3. 如何验证
4. 最小修复
5. 需要回归哪些测试
```

---

## 十三、不要让 AI 隐藏错误

危险行为：

- 加 any
- @ts-ignore
- catch 后什么都不做
- 删除测试
- 关闭 lint rule
- 放宽 RLS

原则：

> 修复根因，不是让红色消失。

---

## 十四、AI 生成依赖时要审查

每安装一个 package 问：

- 为什么需要？
- 内置能力能否完成？
- 是否长期维护？
- 下载量/生态如何？
- 是否有安全问题？
- Bundle 是否过大？

---

## 十五、数据库变更必须更谨慎

AI 提议：

```sql
drop column
drop table
delete from
```

必须停下来检查：

- 是否丢数据
- 是否有 Backup
- Migration 是否兼容
- 是否需要 Backfill
- 是否能 Rollback

---

## 十六、Vibe Coding 安全红线

不要直接把以下内容发给不明确的数据处理环境：

- Production Secret
- Password
- Real Patient Data
- Access Token
- Private Key
- Production Database Dump

学习阶段全部使用 synthetic data。

---

## 十七、推荐工作循环

```text
Understand
↓
Specify
↓
Plan
↓
Implement
↓
Run
↓
Test
↓
Review
↓
Commit
↓
Document
```

---

## 十八、本章实践

让 AI 对一个假项目执行：

1. 只读取结构
2. 生成 Project List Plan
3. 生成 Acceptance Criteria
4. 实现
5. 解释 Diff
6. 自己检查
7. 让另一个会话 Security Review

---

## 十九、验收

你应能解释：

- 为什么 AI 不是最终责任人
- 为什么 Plan First
- 为什么任务要小
- 什么是 Acceptance Criteria
- 为什么要看 Diff
- 为什么测试不能省
- 为什么不能用 any/ignore 掩盖错误
- 为什么 DB Migration 更危险
- 为什么敏感数据不能随便发给 AI
