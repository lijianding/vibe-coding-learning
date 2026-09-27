# 26 产品发现与问题定义：先确认值得做什么

## 参考资料

- GOV.UK Discovery: https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works
- GOV.UK User Needs: https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs
- GOV.UK User Research: https://www.gov.uk/service-manual/user-research
- Nielsen Norman Group: https://www.nngroup.com/articles/which-ux-research-methods/

---

## 一、Discovery 的目标

Discovery 不是：

> 收集客户要哪些按钮。

它要回答：

- 谁遇到问题？
- 他们真正要完成什么？
- 现在怎么完成？
- 哪里最痛？
- 为什么现有方案不行？
- 问题多大？
- 是否值得投入？

---

## 二、Problem Statement

推荐结构：

```text
[用户]
在 [场景]
需要完成 [目标]
但因为 [障碍]
导致 [影响]。
```

例：

```text
实施项目经理在多个医院项目并行推进时，
需要快速识别延期风险，
但任务、Issue、上线计划分散在 Excel 和群聊中，
导致风险暴露晚、状态沟通成本高。
```

---

## 三、不要过早进入 Solution

错误：

```text
客户要一个 Dashboard
→ 直接做 Dashboard
```

更好：

```text
客户为什么要 Dashboard？
→ 他想做什么决策？
→ 哪些数据支持决策？
→ 数据是否可靠？
```

---

## 四、Stakeholder Mapping

典型：

- End User
- Buyer
- Decision Maker
- Admin
- Support
- Security
- Legal
- Operations
- Integration Partner

医疗实施 SaaS 可能包括：

- 项目经理
- 实施工程师
- 医院信息科
- 科室负责人
- 客户管理层
- 平台管理员

---

## 五、User Research

常见方法：

- Interview
- Observation
- Contextual Inquiry
- Existing Data Review
- Support Ticket Analysis
- Analytics
- Survey

对于复杂 B2B 产品，访谈和实际工作流程观察通常比单纯问卷更重要。

---

## 六、Interview 不要问诱导问题

不好：

> 你觉得一个自动提醒功能是不是很好？

更好：

> 你上次发现项目延期是什么时候？当时怎么发现？用了什么工具？

问过去真实行为，比问未来想象更可靠。

---

## 七、Jobs / Tasks

重点研究：

> 用户想完成什么工作？

例如：

```text
快速知道哪些项目下周上线。
```

比：

```text
需要一个红色卡片
```

更稳定。

---

## 八、Current Journey

画出现状：

```text
医院提出需求
↓
微信群
↓
实施人员记录 Excel
↓
项目经理汇总
↓
周会
↓
再更新 Excel
```

标出：

- Delay
- Handoff
- Duplicate entry
- Missing data
- Manual work

---

## 九、Assumption Mapping

列出假设：

```text
用户每天都会登录系统
医院允许使用云 SaaS
项目经理愿意维护 Task
Issue 数据可以标准化
```

按：

- Impact
- Uncertainty

排序。

高影响 + 高不确定优先验证。

---

## 十、Opportunity

Discovery 输出的不是 Feature List，而是 Opportunity。

例如：

```text
降低项目风险状态收集成本
```

可能有很多解决方案：

- Dashboard
- 自动摘要
- 日报
- 邮件提醒
- 集成现有系统

---

## 十一、Success Metric

必须提前定义：

- 使用率
- 完成率
- 时间节省
- 错误率
- Satisfaction
- Retention

例：

```text
项目经理完成周报所需时间从 60 分钟降到 15 分钟。
```

---

## 十二、Discovery 输出物

建议：

- Problem Statement
- Stakeholder Map
- User Needs
- Current Journey
- Assumptions
- Constraints
- Opportunities
- Success Metrics
- Open Questions
- Recommendation

---

## 十三、退出条件

只有能回答：

> 这是值得解决的问题，并且我们知道为什么。

才进入下一阶段。

如果证据不足：

- 继续研究
- 缩小范围
- 停止项目

停止错误项目也是成功结果。

---

## 十四、实践

对 Medical SaaS 写：

1. 3 个核心用户
2. 每人 3 个 User Need
3. Current Journey
4. 10 个 Assumption
5. 3 个 Success Metric
6. 5 个“不做”的 Scope

使用：
`templates/software-engineering/02-discovery-plan.md`
