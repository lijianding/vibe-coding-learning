# 15 Production Engineering：Docker、CI/CD、部署、可观测性与灾难恢复

> 本章目标：理解“本地能跑”与“生产可用”之间的工程差距。

## 官方源资料

- Docker Get Started: https://docs.docker.com/get-started/
- Dockerfile: https://docs.docker.com/reference/dockerfile/
- Docker Compose: https://docs.docker.com/compose/
- Docker Volumes: https://docs.docker.com/engine/storage/volumes/
- Docker Networking: https://docs.docker.com/engine/network/
- GitHub Actions: https://docs.github.com/en/actions
- GitHub Node CI: https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs
- Protected Branches: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
- Vercel Next.js: https://vercel.com/docs/frameworks/full-stack/nextjs
- Supabase Production Checklist: https://supabase.com/docs/guides/deployment/going-into-prod

---

# 第一部分：环境

## 一、四类环境

### Development

本地开发。

### Test

自动测试环境。

### Staging

尽量模拟 Production。

### Production

真实用户。

理想：

```text
Local
↓
PR
↓
CI
↓
Staging
↓
Verification
↓
Production
```

---

## 二、配置分离

不同环境使用不同：

- Database
- Auth
- Storage
- Domain
- SMTP
- OAuth
- Monitoring

不要在代码里写死。

使用 Environment Variables。

---

# 第二部分：Docker

## 三、Container 为什么存在

典型问题：

```text
我的电脑能跑
服务器不能跑
```

环境可能不同：

- Node version
- OS libraries
- dependency
- config

Container 让运行环境更一致。

---

## 四、Image

Image 是只读模板。

包含：

- Base OS/runtime layer
- Dependency
- Application
- Metadata

---

## 五、Container

Container 是 Image 的运行实例。

可以启动、停止、删除。

删除 Container 不应等同于删除业务持久数据。

---

## 六、Dockerfile

概念：

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
```

理解：

- FROM
- WORKDIR
- COPY
- RUN
- CMD

---

## 七、Layer

Docker Image 由 Layer 组成。

顺序影响缓存。

常见优化：

先复制 package files 安装依赖，再复制业务代码。

如果业务代码改了但依赖没变，可以复用依赖 Layer。

---

## 八、Multi-stage Build

生产 Image 可分：

```text
Build Stage
↓
Runtime Stage
```

好处：

- Image 更小
- 不携带不必要 Build Tool
- 减少攻击面

---

## 九、.dockerignore

排除：

```text
node_modules
.git
.next/cache
.env*
coverage
```

特别注意：

> 不要把 Secret 打进 Docker Build Context。

---

## 十、Volume

用于持久化数据。

例如自建 PostgreSQL：

```text
Container
↓
Volume
↓
Persistent DB files
```

但托管 Supabase 场景中数据库不存 Next.js Container 本地。

---

## 十一、Network

Container 之间通过 Network 通信。

例如：

```text
web
↓
postgres
↓
redis
```

不要默认所有 Port 都暴露到公网。

---

## 十二、Docker Compose

本地可组合：

```text
web
db
redis
mail test server
```

适合开发环境一键启动。

---

# 第三部分：Build 与 Release

## 十三、npm run build

Production Build 能发现一些开发模式未暴露的问题：

- Type error
- Server/Client boundary error
- missing env
- bundling error

所以：

> npm run dev 能跑 ≠ 可以部署。

---

## 十四、Build Artifact

理想：

```text
Commit SHA
↓
Build
↓
Artifact / Image
↓
Tests
↓
Deploy same artifact
```

不要在生产服务器临时修改源码。

---

## 十五、Deploy 与 Release

Deploy：

> 新代码已经部署。

Release：

> 新能力正式向用户开放。

大型系统可能：

- 先 Deploy
- Feature Flag 关闭
- 后 Release

---

# 第四部分：CI/CD

## 十六、Continuous Integration

目标：

每次 Pull Request 自动验证：

```text
Checkout
↓
Install
↓
Lint
↓
Typecheck
↓
Unit Test
↓
Integration Test
↓
Build
```

---

## 十七、GitHub Actions

基本结构：

```yaml
name: CI

on:
  pull_request:
  push:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
```

实际 Action 主版本应参考当时官方模板，不要长期复制过时版本。

---

## 十八、Workflow / Job / Step

### Workflow

整个自动流程。

### Job

一组在 Runner 上执行的任务。

### Step

Job 内的单步命令或 Action。

---

## 十九、Secrets in CI

CI 需要 Secret：

- Test DB URL
- API key

放 GitHub Secrets / Environment Secrets。

不要：

```yaml
DATABASE_PASSWORD: abc123
```

直接写进 YAML。

---

## 二十、Branch Protection

可配置：

- main 禁止直接 push
- PR required
- CI required
- Review required
- 禁止 force push

把“团队约定”变成平台强制规则。

---

## 二十一、CD

CI 通过后：

```text
Build
↓
Staging Deploy
↓
Smoke Test
↓
Approval
↓
Production
```

医疗软件相关 SaaS 初期可采用：

> Production 人工批准

而不是盲目全自动。

---

# 第五部分：数据库发布

## 二十二、Migration 与代码兼容

危险：

```text
先删除 DB column
↓
旧代码仍在运行
↓
500
```

推荐 Expand / Migrate / Contract。

### Expand

先新增兼容字段。

### Migrate

新旧代码都可运行，迁移数据。

### Contract

确认旧代码完全退出后再删除旧字段。

---

## 二十三、Backward Compatibility

数据库变更尽量：

- 新字段先 nullable/default
- 新旧版本共存
- 数据 backfill
- 最后加 strict constraint

减少 Zero-downtime Deployment 风险。

---

# 第六部分：Observability

## 二十四、Logs

回答：

> 发生了什么？

推荐结构化日志：

```json
{
  "level": "error",
  "requestId": "req_123",
  "route": "/api/projects",
  "message": "db timeout"
}
```

不要记录 Token/Password。

---

## 二十五、Metrics

回答：

> 系统整体表现怎样？

常见：

- Request Rate
- Error Rate
- Latency
- CPU
- Memory
- DB Connections
- Queue depth

---

## 二十六、Tracing

回答：

> 一个请求耗时在哪里？

```text
Next.js 40ms
↓
Database 700ms
↓
External API 1.2s
```

---

## 二十七、Logs / Metrics / Traces

三类信号互补：

```text
Logs → 具体事件
Metrics → 整体趋势
Traces → 调用链
```

---

# 第七部分：Monitoring 与 Alerting

## 二十八、Monitor 什么

至少：

- HTTP 5xx
- Error rate
- Latency
- DB error
- Login failure spike
- Storage failure
- Deployment failure

---

## 二十九、Alert Fatigue

如果任何小错误都报警：

最终所有人忽略报警。

好的 Alert：

- 有用户影响
- 有明确阈值
- 有责任人
- 有处理动作

---

# 第八部分：Reliability

## 三十、SLI

Service Level Indicator。

实际测量：

```text
成功请求比例
p95 latency
availability
```

## 三十一、SLO

内部可靠性目标。

例如：

```text
Monthly availability ≥ 99.9%
```

## 三十二、SLA

对客户的正式服务承诺，可能带商业责任。

不要把 SLA 与 SLO 混为一谈。

---

# 第九部分：Backup / Restore

## 三十三、Backup 不等于 Recovery

真正问题：

> 备份文件能不能恢复？

所以必须演练。

---

## 三十四、RPO

Recovery Point Objective：

> 最多可接受丢多少时间的数据？

---

## 三十五、RTO

Recovery Time Objective：

> 最多允许多久恢复服务？

---

## 三十六、数据库与文件分别处理

```text
PostgreSQL Backup
≠
Storage Object Backup
```

分别制定：

- Backup
- Retention
- Restore
- Verification

---

## 三十七、恢复演练

```text
Backup
↓
Test Environment
↓
Delete/Corrupt Test Data
↓
Restore
↓
Verify Rows
↓
Verify Files
↓
Verify Permissions
↓
Record Time
```

---

# 第十部分：Rollback 与 Incident

## 三十八、Code Rollback

新版本有问题：

- 回滚 Deploy
- Git revert
- Disable Feature Flag

---

## 三十九、Database Rollback

比代码回滚更复杂。

因为新版本可能已经写入新数据格式。

所以：

> 数据库变化尽量向后兼容。

---

## 四十、Incident Response

```text
Detect
↓
Triage
↓
Assess impact
↓
Mitigate
↓
Restore
↓
Root cause
↓
Corrective actions
```

---

## 四十一、Postmortem

记录：

- Summary
- Impact
- Timeline
- Root Cause
- Detection
- Response
- What worked
- What failed
- Action Items

目标是改进系统，不是简单找人背锅。

---

## 四十二、实践任务

### Docker

容器化 Next.js。

### CI

GitHub Actions 自动：

- lint
- typecheck
- test
- build

### Staging

建立独立环境变量。

### Monitoring

人为制造测试 Error，确认日志可定位。

### Backup

在测试数据上做完整 Restore 演练。

---

## 四十三、本章验收

能够解释：

- Dev/Test/Staging/Prod
- Image/Container
- Dockerfile
- Layer
- Multi-stage
- Volume
- Network
- Compose
- Build/Deploy/Release
- CI/CD
- Workflow/Job/Step
- Secret
- Branch Protection
- Expand/Migrate/Contract
- Logs/Metrics/Traces
- Monitoring/Alert
- SLI/SLO/SLA
- RPO/RTO
- Restore
- Rollback
- Incident/Postmortem

并且能回答：

> Production 挂了，你如何发现、定位、止损、恢复、复盘？
