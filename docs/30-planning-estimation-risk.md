# 30 计划、估算、依赖与风险管理

## 参考资料

- Scrum Guide: https://scrumguides.org/scrum-guide.html
- GOV.UK Agile Planning: https://www.gov.uk/service-manual/agile-delivery
- GitHub Projects: https://docs.github.com/en/issues/planning-and-tracking-with-projects

---

## 一、计划不是预测未来完全准确

计划的作用：

- Align
- Prioritize
- Identify Dependency
- Manage Risk
- Communicate

---

## 二、Roadmap

Roadmap 应以 Outcome 为主：

不好：

```text
Q1 做 20 个页面
```

更好：

```text
让项目经理能完整管理项目风险。
```

---

## 三、Backlog Hierarchy

常见：

```text
Goal
↓
Epic
↓
Feature
↓
Story
↓
Task
```

不要把每个技术 Task 都直接当产品需求。

---

## 四、Estimation

可以用：

- T-shirt Size
- Story Point
- Ideal Day
- Historical Cycle Time

重点不是“算出精确小时”，而是：

> 比较复杂度和不确定性。

---

## 五、不确定性

估算必须考虑：

- 新技术
- 外部系统
- 数据质量
- 未确认需求
- Security Review
- Migration

高不确定 Feature 应先 Spike/Prototype。

---

## 六、Spike

Spike 是时间限制的探索任务：

> 先回答一个未知问题，不直接交付完整 Feature。

例如：

```text
验证医院 SSO 是否能与 Supabase Auth 集成。
```

---

## 七、Dependency

记录：

- Owner
- Needed by
- Status
- Risk
- Alternative

外部依赖是延期高发来源。

---

## 八、Critical Path

一些任务必须串行：

```text
DB Schema
→ API
→ UI
→ UAT
```

识别 Critical Path 能更早看到时间风险。

---

## 九、Risk Register

风险字段：

- Risk
- Probability
- Impact
- Exposure
- Owner
- Mitigation
- Trigger
- Contingency

例：

```text
医院不允许公网 SaaS
P: Medium
Impact: Critical
Mitigation: 提前完成部署模式确认
```

---

## 十、RAID

可以维护：

- Risks
- Assumptions
- Issues
- Dependencies

避免信息散在聊天记录。

---

## 十一、Buffer

未知工作不能假设为 0。

尤其：

- Integration
- Migration
- Security
- UAT
- Production

---

## 十二、Milestone

定义可验证事件：

- Schema Approved
- Auth Complete
- Tenant Isolation Passed
- UAT Approved
- Go-Live

不要只写：

> 开发完成 80%。

---

## 十三、Status

项目状态报告应聚焦：

- Outcome
- Milestone
- Risk
- Blocker
- Decision Needed

而不是列“今天写了几个文件”。

---

## 十四、实践

为毕业项目建立：

- Roadmap
- Backlog
- Milestones
- Dependencies
- Risk Register
- RAID
- 3 个 Spike

模板：
`templates/software-engineering/10-risk-register.md`
