# 27 需求工程：把用户需要变成可实现、可测试的规格

## 参考资料

- SWEBOK: https://www.computer.org/education/bodies-of-knowledge/software-engineering
- GOV.UK User Stories: https://www.gov.uk/service-manual/agile-delivery/writing-user-stories
- Scrum Guide: https://scrumguides.org/scrum-guide.html

---

## 一、需求工程不是写 PRD

完整需求工程包含：

```text
Elicitation
↓
Analysis
↓
Specification
↓
Validation
↓
Management
```

---

## 二、需求来源

可能来自：

- User Research
- Stakeholder
- Contract
- Regulation
- Support
- Analytics
- Technical Constraint
- Security
- Operations

来源不同，优先级和约束不同。

---

## 三、User Need

例：

```text
项目经理需要知道哪些任务会影响上线。
```

这是需求背景，不是 UI。

---

## 四、User Story

常用：

```text
As a [role]
I want [capability]
So that [value].
```

例：

```text
As a project manager,
I want to filter overdue tasks,
so that I can identify delivery risk.
```

User Story 不是完整规格。

还需要 Acceptance Criteria。

---

## 五、Acceptance Criteria

推荐 Given/When/Then：

```text
Given I am PM of Org A
And there are overdue tasks
When I select "Overdue"
Then only overdue tasks in Org A are shown
```

Acceptance Criteria 应：

- 可测试
- 明确边界
- 包含错误/权限情形

---

## 六、Use Case

复杂流程更适合 Use Case：

- Actor
- Trigger
- Preconditions
- Main Flow
- Alternate Flow
- Exception
- Postconditions

例如：

> 邀请 Organization Member

通常比一条 User Story 更适合完整描述。

---

## 七、Functional Requirement

使用明确语言：

```text
FR-001:
系统应允许 Organization Admin 创建 Project。
```

避免：

- 尽量
- 快速
- 友好
- 合理

这些无法直接验证。

---

## 八、Non-Functional Requirement

分类：

### Performance
```text
NFR-PERF-001:
Project List 在 5000 个 Project 数据规模下，
p95 API 响应时间应低于 1 秒。
```

### Security
```text
NFR-SEC-001:
任何 Organization 用户不得读取其他 Organization 的 Project。
```

### Availability
```text
Monthly availability target ...
```

### Recovery
- RPO
- RTO

### Usability
- Task completion
- Accessibility

### Maintainability
- Test
- Observability

---

## 九、Requirement Quality

好的 Requirement：

- Correct
- Unambiguous
- Complete
- Consistent
- Verifiable
- Traceable
- Feasible
- Prioritized

---

## 十、Scope

明确三类：

### In Scope
本版本做。

### Out of Scope
明确不做。

### Future
未来可能做。

Out of Scope 非常重要，可以防止范围无限扩张。

---

## 十一、Prioritization

可使用：

### MoSCoW
- Must
- Should
- Could
- Won't now

### Value / Effort
高价值低成本优先。

### Risk-first
先验证最危险假设。

不要把所有需求标 Must。

---

## 十二、Dependency

需求可能依赖：

- API
- Vendor
- Data
- Policy
- Other Feature

必须显式记录。

---

## 十三、Requirement Traceability

建立：

| Requirement | Design | Code/Feature | Test | Release |
|---|---|---|---|---|
| FR-001 | ADR-003 | Project Create | TC-010 | v1.2 |

价值：

- 知道需求有没有实现
- 变更影响分析
- 测试覆盖
- 审计

---

## 十四、Requirement Validation

在开发前和用户/Stakeholder 确认：

- 是否解决真实问题
- 是否遗漏流程
- 是否可以测试
- 是否存在矛盾
- 是否越权

---

## 十五、Change Management

需求变化不可避免。

关键不是“禁止变”，而是：

```text
Change
↓
Impact Analysis
↓
Decision
↓
Update Requirements
↓
Update Design/Test/Plan
```

---

## 十六、需求文档组合

小功能：

- User Story
- Acceptance Criteria

中等 Feature：

- Mini PRD
- User Story
- NFR
- Test notes

大型模块：

- PRD
- SRS
- Data Model
- Architecture Spec
- Traceability

---

## 十七、实践

为“Project Archive”写：

- User Need
- User Story
- 5 条 Acceptance Criteria
- 3 条 NFR
- Out of Scope
- Risk
- Traceability

模板：
`templates/software-engineering/05-srs.md`
