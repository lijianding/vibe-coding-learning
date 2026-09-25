# 24 技术术语表与知识索引

> 遇到陌生词先来这里查，再跳到对应章节。

## A

### API
Application Programming Interface。系统间约定的调用接口。  
章节：08

### Authentication
身份认证：确认“你是谁”。  
章节：12、13

### Authorization
授权：确认“你能做什么”。  
章节：13

### Audit Log
记录谁在何时对什么资源执行了什么操作。  
章节：13

---

## B

### Backend
服务端业务、权限、数据处理。  
章节：03

### Branch
Git 中指向某个 Commit 的开发线。  
章节：07

---

## C

### Cache
缓存。保存可复用结果以减少重复计算/请求。  
章节：11、21

### CI
Continuous Integration。持续集成。  
章节：15

### Client Component
Next.js 中运行客户端交互逻辑的组件。  
章节：11

### Commit
Git 中的一次版本快照。  
章节：07

### Container
Docker Image 的运行实例。  
章节：15

### CORS
浏览器跨源访问控制机制。  
章节：08

### CRUD
Create/Read/Update/Delete。  
章节：12

### CSRF
跨站请求伪造。  
章节：14

---

## D

### Database Migration
数据库结构的版本化变更。  
章节：09、12、15

### DNS
将域名解析到网络地址。  
章节：03

### Docker Image
Container 的运行模板。  
章节：15

### DTO
Data Transfer Object。系统边界数据结构。  
章节：20

---

## E

### E2E Test
端到端测试。模拟真实用户完成完整流程。  
章节：14

### Event Loop
JavaScript/Node 异步调度机制的重要组成。  
章节：05、19

---

## F

### Foreign Key
外键。保证表之间引用关系。  
章节：09

### Frontend
用户界面和浏览器交互层。  
章节：03

---

## G

### Git
分布式版本控制系统。  
章节：07

### GitHub Actions
GitHub CI/CD 自动化平台。  
章节：15

---

## H

### HTTP
Web 基础通信协议。  
章节：03、08

### HTTPS
HTTP over TLS。  
章节：03

---

## I

### Idempotency
同一操作重复执行是否保持同一最终效果。  
章节：08、20、22

### Index
数据库索引。加速特定查询，但有写入和存储成本。  
章节：09

### Integration Test
多个组件联合测试。  
章节：14

---

## J

### JSON
常用结构化文本数据格式。  
章节：03、08

### JWT
JSON Web Token，一种签名 Token 格式。  
章节：12

---

## L

### Latency
请求完成耗时。  
章节：21

### Least Privilege
最小权限原则。  
章节：13、23

---

## M

### Migration
见 Database Migration。

### Multi-Tenant
一套 SaaS 服务多个客户并隔离数据。  
章节：13

### MVCC
PostgreSQL 多版本并发控制。  
章节：09

---

## N

### N+1 Query
一次列表查询后对每行再发一次查询导致大量 Query。  
章节：21

### Node.js
服务端/命令行 JavaScript Runtime。  
章节：19

---

## O

### Observability
通过 Logs/Metrics/Traces 理解系统内部状态。  
章节：15

### ORM
Object Relational Mapping。把应用对象与数据库映射的工具类别。

---

## P

### Permission
可执行动作，例如 project.update。  
章节：13

### PostgreSQL
关系型数据库。  
章节：09

### Promise
表示未来异步结果。  
章节：05

### Pull Request
GitHub 代码审查与合并流程。  
章节：07

---

## R

### RBAC
Role-Based Access Control。  
章节：13

### RLS
Row Level Security。PostgreSQL 行级安全。  
章节：13

### RPO
Recovery Point Objective。最大可接受数据丢失时间。  
章节：15

### RTO
Recovery Time Objective。最大可接受恢复时间。  
章节：15

---

## S

### SaaS
Software as a Service。  
章节：22

### Server Action
Next.js 服务端数据变更机制。  
章节：11

### Server Component
Next.js 服务端组件。  
章节：11

### Session
持续用户认证状态。  
章节：12

### SLI/SLO/SLA
服务指标/目标/协议。  
章节：15

### Soft Delete
逻辑删除。  
章节：09

### SSRF
Server-Side Request Forgery。  
章节：14

### State
React 中组件需要记住的变化数据。  
章节：10

---

## T

### Tenant
SaaS 中的客户组织边界。  
章节：13

### Threat Modeling
识别资产、攻击者、入口与威胁。  
章节：14

### Transaction
数据库事务。  
章节：09

### TypeScript
带静态类型检查的 JavaScript。  
章节：06

---

## U

### Unit Test
最小逻辑单元测试。  
章节：14

---

## V

### Vibe Coding
使用 AI Coding Agent 高比例参与编码，但由人控制需求、设计、审查和验收。  
章节：01

---

## W

### Webhook
第三方系统向你的系统发送事件通知。  
章节：22

---

## X

### XSS
Cross-Site Scripting。  
章节：14

---

# 按问题找章节

### “用户点保存后发生什么？”
03 → 08 → 11 → 12

### “为什么别人能看到我的数据？”
13 → 14

### “数据库为什么越来越慢？”
09 → 21

### “AI 写坏代码怎么办？”
07 → 14

### “怎么上线？”
15

### “怎么收费？”
22

### “医疗行业需要注意什么？”
23

### “项目代码越来越乱怎么办？”
20
