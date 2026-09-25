# 17 AI Coding Prompt 手册

> Prompt 的目的不是“写得很长”，而是减少歧义、明确边界、让 AI 的修改可验证。

---

## 一、通用 Prompt 模型

推荐结构：

```text
ROLE
CONTEXT
CURRENT STATE
TASK
CONSTRAINTS
SECURITY
ACCEPTANCE CRITERIA
TESTS
OUTPUT FORMAT
```

---

## 二、仓库理解

```text
不要修改代码。

请阅读仓库并说明：
1. 技术栈
2. 目录结构
3. 入口
4. 数据库层
5. Auth
6. Permission
7. 测试
8. CI
9. 关键风险

对于不确定内容明确说“不确定”，不要猜。
```

---

## 三、需求拆解

```text
不要写代码。

业务需求：
[需求]

请输出：
1. Actors
2. Use Cases
3. Business Rules
4. Data
5. Permission
6. Edge Cases
7. Error Cases
8. Acceptance Criteria
9. Out of Scope
10. Open Questions
```

---

## 四、数据库设计

```text
不要执行 SQL。

基于需求设计数据库：
- tables
- columns
- types
- PK
- FK
- unique
- check
- indexes
- tenant field
- audit fields
- delete strategy

另外说明：
- cardinality
- transaction boundary
- migration risk
- rollback
```

---

## 五、架构计划

```text
不要修改代码。

请基于当前仓库设计最小实现方案：
1. data flow
2. modules
3. files to modify
4. files to create
5. database changes
6. permission changes
7. API changes
8. tests
9. security risks
10. rollout/rollback

避免过度架构。
```

---

## 六、功能实现

```text
只实现已确认的 [FEATURE]。

约束：
- 不修改无关文件
- 不使用 any 消除错误
- 不使用 @ts-ignore
- 不降低现有权限/RLS
- 不增加非必要 dependency
- 不暴露 secret
- 保持 tenant isolation

完成后运行：
- lint
- typecheck
- test
- build

最后输出修改摘要和未解决风险。
```

---

## 七、代码教学

```text
不要修改代码。

我是有 SQL/Linux 基础、编程基础较弱的学习者。

解释：
1. 总体目的
2. input/output
3. data flow
4. functions
5. syntax
6. async behavior
7. error path
8. security
9. alternatives
10. exercises
```

---

## 八、错误分析

```text
不要立即修复。

错误：
[ERROR]

请输出：
1. error category
2. exact location
3. likely root causes
4. how to prove/disprove each
5. minimal fix
6. risks
7. regression tests
```

---

## 九、TypeScript 错误

```text
不要用 any/as/@ts-ignore 直接压掉。

解释：
- expected type
- actual type
- why incompatible
- business model implication
- correct solutions
```

---

## 十、Git Diff Review

```text
不要修改。

Review 当前 diff：
- requirement correctness
- unrelated changes
- breaking changes
- data model
- auth
- authorization
- tenant isolation
- validation
- error handling
- logging
- tests
- dependency changes

按 Critical/High/Medium/Low。
```

---

## 十一、安全 Review

```text
攻击者视角检查：
- anonymous access
- vertical privilege escalation
- horizontal privilege escalation
- tenant bypass
- IDOR/BOLA
- mass assignment
- SQLi
- XSS
- CSRF
- SSRF
- file upload
- storage policy
- secret exposure
- sensitive logging
- rate limit

每项输出：
Attack
Evidence
Impact
Fix
Required Test
```

---

## 十二、RLS Review

```text
不要修改数据库。

Review RLS：
1. table RLS enabled?
2. grants?
3. SELECT using?
4. INSERT with check?
5. UPDATE using + with check?
6. DELETE?
7. tenant source trusted?
8. service role bypass?
9. views?
10. allow/deny tests?
```

---

## 十三、Migration Review

```text
不要执行 migration。

检查：
- data loss
- locks
- nullability
- defaults
- index cost
- FK
- tenant
- RLS
- backfill
- compatibility
- rollback
```

---

## 十四、测试设计

```text
先只设计 test cases。

分类：
Happy path
Validation
Anonymous
Forbidden
Wrong tenant
Not found
Archived/deleted
Concurrency
Infrastructure failure

指出应该属于 Unit / Integration / E2E。
```

---

## 十五、性能 Review

```text
先测量，不要盲目优化。

检查：
- SQL queries
- indexes
- N+1
- pagination
- payload
- client bundle
- cache
- DB connections
- slow external call

给出如何测量每个怀疑点。
```

---

## 十六、Production Readiness

```text
把当前系统视为明天正式收费上线。

按以下审查：
Product
AuthN
AuthZ
Tenant
RLS
Validation
Security
Testing
Performance
Migration
CI/CD
Monitoring
Backup
Restore
Rollback
Privacy
Support

输出 blocking issues。
```

---

## 十七、事故分析

```text
不要先修改。

Production incident:
[INFO]

输出：
1. impact
2. scope
3. immediate mitigation
4. evidence to collect
5. root-cause hypotheses
6. safe recovery
7. permanent fixes
8. regression tests
9. postmortem outline
```

---

## 十八、Prompt 使用原则

不要盲信 AI 自我报告：

```text
“tests passed”
```

必须看真实 command output。

不要要求：

```text
make it secure
```

要明确安全目标。

不要一次让 AI 同时：

- 重构架构
- 换 DB
- 换 UI
- 加支付
- 修权限

一次一个主题。
