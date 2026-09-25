# 22 SaaS 商业化：从“系统”到“产品”

> 本章目标：理解真正收费 SaaS 除功能之外还需要哪些产品与运营能力。

## 推荐源资料

- Stripe Billing Docs: https://docs.stripe.com/billing
- Stripe Subscriptions: https://docs.stripe.com/billing/subscriptions/overview
- Stripe Usage-based Billing: https://docs.stripe.com/billing/subscriptions/usage-based
- Stripe Webhooks: https://docs.stripe.com/webhooks
- Stripe Customer Portal: https://docs.stripe.com/customer-management

> Stripe 只是理解 SaaS Billing 的一种主流参考实现。你未来面向中国市场时可替换为适合当地的支付/合同体系。

---

## 一、SaaS 与普通 Web 系统区别

SaaS 需要持续考虑：

- Tenant
- Subscription
- Plan
- Usage
- Billing
- Upgrade/Downgrade
- Cancellation
- Trial
- Customer Support
- Data export
- Offboarding

---

## 二、Plan

例如：

```text
Free
Professional
Enterprise
```

Plan 不只是价格。

它定义：

- 功能
- 用户数
- 项目数
- Storage
- API
- Support
- Audit retention

---

## 三、Entitlement

比在代码到处写：

```text
if plan == pro
```

更好设计：

```text
plan
↓
entitlements
↓
feature access
```

例如：

```text
advanced_audit = true
max_projects = 50
storage_gb = 100
```

---

## 四、Seat-based Pricing

按用户数：

```text
10 users × price
```

适合协作 SaaS。

但要定义：

- active seat
- invited seat
- suspended seat
- billing seat

---

## 五、Usage-based Pricing

按：

- API Calls
- Storage
- AI Tokens
- Export jobs

计费。

需要可靠 Usage Metering。

---

## 六、Subscription State

不能只有：

```text
active / inactive
```

真实可能有：

- trialing
- active
- past_due
- canceled
- unpaid
- paused

业务行为要定义清楚。

---

## 七、Trial

要明确：

- Trial 多久
- 是否要支付方式
- 到期后什么行为
- 数据是否保留
- 是否允许 Export

---

## 八、Upgrade

例如 Free → Pro：

- 立即生效？
- 按比例计费？
- 权限何时更新？

---

## 九、Downgrade

更复杂。

如果客户当前：

```text
100 projects
```

降到：

```text
max 10
```

怎么办？

常见策略：

- 禁止新增
- 保留读取
- 要求先清理
- 下周期生效

必须产品上明确。

---

## 十、Cancellation

取消订阅不等于立即删除数据。

要定义：

```text
cancel
↓
grace period
↓
read-only?
↓
export window
↓
retention
↓
delete/anonymize
```

---

## 十一、Webhook

支付平台通常通过 Webhook 通知：

- payment succeeded
- subscription updated
- canceled

Webhook 必须：

- 验证签名
- 幂等
- 可重试
- 记录 event id

---

## 十二、Webhook 幂等

同一个事件可能重复发送。

不要：

```text
收到两次
↓
执行两次订单
```

存：

```text
provider_event_id
```

已处理就跳过。

---

## 十三、Invoice

企业客户可能需要：

- Invoice
- Tax
- Contract
- Purchase Order

如果面向医院，实际销售流程往往比纯在线信用卡 SaaS 更复杂。

可能是：

```text
合同
↓
实施
↓
授权
↓
年度续费
```

所以产品架构要支持“手工企业订阅”。

---

## 十四、Tenant Lifecycle

Organization：

```text
created
↓
trial
↓
active
↓
suspended
↓
closed
```

需要明确每个状态：

- Login
- Read
- Write
- Export
- Billing

---

## 十五、Invite

SaaS 基础能力：

```text
Admin invites email
↓
Invitation token
↓
User accepts
↓
Membership created
```

需要考虑：

- Expiry
- Revoke
- Duplicate
- Wrong email
- Existing user

---

## 十六、Email

系统邮件：

- Invite
- Password Reset
- Notification
- Billing

生产要考虑：

- Domain verification
- SPF/DKIM/DMARC
- Bounce
- Rate
- Unsubscribe（营销类）

---

## 十七、Support

真正商用后需要：

- Support email
- Ticket
- Incident
- Customer context
- Admin tools

不要让平台管理员直接进数据库乱改数据。

建立受审计 Support/Admin 工具。

---

## 十八、Data Export

客户会问：

> 我能把自己的数据导走吗？

要设计：

- CSV
- Excel
- Attachment export
- Audit export

大 Export 可能需要 Background Job。

---

## 十九、Data Retention

明确：

- Active customer
- Canceled customer
- Audit log
- Backup
- Deleted account

各自保存多久。

---

## 二十、Terms / Privacy

商用至少需要考虑：

- Terms of Service
- Privacy Policy
- Data Processing terms
- Subprocessors
- Security statement

具体法律文本应由适用司法辖区的专业人士审查。

---

## 二十一、Usage Limit

Quota 必须在服务端执行。

不能只显示：

```text
You reached 10 projects
```

而 API 仍然能创建第 11 个。

---

## 二十二、Feature Flag 与 Plan

不要完全绑定：

```text
feature = plan name
```

因为 Enterprise 可能定制。

推荐 Entitlement 层。

---

## 二十三、练习

设计：

```text
plans
subscriptions
entitlements
usage_records
billing_events
```

定义：

Free / Pro / Enterprise。

---

## 二十四、验收

应理解：

- Plan
- Entitlement
- Seat/Usage pricing
- Subscription state
- Trial
- Upgrade/Downgrade
- Cancellation
- Webhook
- Idempotency
- Tenant lifecycle
- Invite
- Email
- Support
- Export
- Retention
- Quota
