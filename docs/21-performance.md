# 21 Web 性能：让 SaaS 在数据增长后仍然可用

> 本章目标：知道性能瓶颈可能发生在哪一层，以及如何测量，而不是凭感觉优化。

## 推荐源资料

- web.dev Performance: https://web.dev/performance/
- web.dev Core Web Vitals: https://web.dev/articles/vitals
- Next.js Performance Docs: https://nextjs.org/docs
- PostgreSQL EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html
- PostgreSQL Indexes: https://www.postgresql.org/docs/current/indexes.html

---

## 一、性能不是“页面快一点”

完整链路：

```text
DNS
↓
Network
↓
Server
↓
Database
↓
Serialization
↓
Browser Download
↓
JavaScript
↓
Render
```

任何一层都可能慢。

---

## 二、Latency 与 Throughput

### Latency

一次请求多久完成。

### Throughput

单位时间能处理多少请求。

系统可能：

- 单次很快，但并发一高就崩
- 单次稍慢，但吞吐稳定

---

## 三、p50 / p95 / p99

不要只看平均值。

例如：

```text
p50 = 100ms
p95 = 800ms
p99 = 5s
```

说明少量用户体验很差。

Production Monitoring 常看 Percentile。

---

## 四、数据库往往是后台 SaaS 核心瓶颈

典型原因：

- 无索引
- N+1 Query
- SELECT *
- 深 Offset
- 大 Join
- Lock
- Connection exhaustion

---

## 五、EXPLAIN

不要猜 SQL 慢原因。

使用：

```sql
EXPLAIN
SELECT ...
```

更进一步：

```sql
EXPLAIN ANALYZE
SELECT ...
```

注意 ANALYZE 会真的执行查询，生产环境谨慎。

---

## 六、N+1

假设：

```text
1 query → 100 projects
100 query → each manager
```

总计 101 Query。

可通过：

- Join
- Batch
- eager loading

减少。

---

## 七、Pagination

不要一次返回：

```text
100000 rows
```

使用：

- page
- cursor
- keyset pagination

---

## 八、Payload Size

API 只返回需要字段。

不要：

```text
Project list
↓
每条带完整 comments、audit、attachments
```

列表只需要摘要字段。

---

## 九、Caching

可以缓存：

- 静态字典
- 不常变化配置
- Public content

谨慎缓存：

- Permission
- Audit
- 实时任务状态

缓存问题：

- stale data
- invalidation
- tenant leak

缓存 key 必须包含正确 tenant/context。

---

## 十、Browser Bundle

客户端 JavaScript 越大：

- 下载更慢
- Parse 更慢
- Hydration 更慢

所以 Next.js Server Component 可以减少不必要 Client JS。

---

## 十一、Code Splitting

让用户只下载当前页面需要代码。

现代框架会自动做部分切分，但大型组件/Library 仍需关注。

---

## 十二、Image

优化：

- 尺寸
- 格式
- lazy loading
- responsive image

后台 SaaS 图片通常不是主要问题，但附件预览可能成为瓶颈。

---

## 十三、Core Web Vitals

面向 Web 用户体验的重要指标：

- LCP
- INP
- CLS

后台企业 SaaS 不一定追求公共网站 SEO 分数，但这些指标仍有助于发现真实交互体验问题。

---

## 十四、Connection Pool

数据库连接不是无限。

Serverless 环境尤其要避免：

```text
每个请求新建大量 DB connections
```

需要理解：

- Pool
- Proxy
- Connection limit

---

## 十五、Rate Limit 与性能

Rate Limit 不只是安全，也保护系统容量。

例如：

```text
Export API
Search
AI API
```

应限制滥用。

---

## 十六、Background Job

慢操作：

- Export 10 万行
- 批量导入
- 大文件处理

不要让 Request 卡 2 分钟。

可转为 Job。

---

## 十七、性能优化流程

正确：

```text
Measure
↓
Find bottleneck
↓
Change
↓
Measure again
```

错误：

```text
感觉慢
↓
到处加缓存
```

---

## 十八、练习

- 用 DevTools 看 Network Timing
- 用 EXPLAIN 看一个 Project Query
- 给大列表加分页
- 删除不必要 SELECT 字段
- 找一次 N+1
- 比较优化前后耗时

---

## 十九、验收

能解释：

- Latency/Throughput
- p95
- EXPLAIN
- N+1
- Pagination
- Payload
- Cache
- Bundle
- Connection Pool
- Background Job
- 为什么性能优化必须先测量
