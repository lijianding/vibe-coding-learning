# 34 产品指标、反馈与持续迭代：上线后用证据决定下一步

## 参考资料

- GOV.UK Service Lifecycle: https://www.gov.uk/service-manual/agile-delivery/running-your-service-in-a-sustainable-way
- GOV.UK User Research in Live: https://www.gov.uk/service-manual/user-research/user-research-in-live/
- Google SRE: https://sre.google/books/

---

## 一、上线不是终点

Live 阶段需要持续：

- User Research
- Analytics
- Support Analysis
- Reliability
- Security
- Performance
- Roadmap

---

## 二、Outcome Metric

不要只看：

- Page Views
- Feature 数量

看：

> 用户是否更好地完成工作。

例如：

```text
周报生成平均时间
延期任务发现提前量
关键 Issue 关闭时长
```

---

## 三、Input / Output / Outcome

### Input
投入资源。

### Output
交付 Feature。

### Outcome
用户行为/业务结果变化。

产品管理重点最终是 Outcome。

---

## 四、North Star / Product Metric

不是每个产品都需要一个“神奇指标”，但要有少数核心指标帮助判断价值。

医疗实施 SaaS 可以观察：

- Weekly Active PM
- Active Projects with updated status
- Overdue Task resolution
- Issue resolution time

---

## 五、Funnel

例如：

```text
Invite
↓
Accept
↓
Login
↓
Create Project
↓
Create Task
↓
Weekly return
```

看掉在哪一步。

---

## 六、Retention

B2B SaaS 关注：

- Weekly/Monthly active
- Organization retention
- Seat activity
- Feature adoption

---

## 七、Qualitative Feedback

数字告诉你：

> 哪里有问题。

访谈告诉你：

> 为什么。

持续结合：

- Analytics
- Interview
- Support Ticket
- Customer Success

---

## 八、Support Ticket Mining

定期分类：

- Bug
- UX confusion
- Missing feature
- Performance
- Permission
- Data

重复出现的问题可能比新 Feature 更重要。

---

## 九、Experiment

如果不确定方案：

```text
Hypothesis
↓
Change
↓
Metric
↓
Observe
↓
Decision
```

B2B 用户量少时，不一定适合严格 A/B，可用小范围 Pilot。

---

## 十、Roadmap Update

每轮迭代输入：

- Metrics
- User Research
- Bugs
- Risk
- Cost
- Strategy

再做优先级。

---

## 十一、Technical Health

产品指标之外持续看：

- Error Rate
- p95
- Security findings
- Dependency age
- Test stability
- Cost
- Incident

技术健康也是产品持续交付能力。

---

## 十二、Review Cadence

可建立：

### Weekly
- Incidents
- Support
- Delivery blockers

### Monthly
- Product metrics
- Reliability
- Cost

### Quarterly
- Strategy
- Roadmap
- Architecture debt

---

## 十三、实践

定义毕业项目：

- 3 个 Outcome Metric
- 3 个 Reliability Metric
- 3 个 Adoption Metric
- 2 个 Feedback Channel
- Monthly Review Template

模板：
`templates/software-engineering/16-product-metrics-plan.md`
