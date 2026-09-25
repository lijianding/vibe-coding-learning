# 实践路线：从“看懂”到“会做”

本仓库从现在开始采用四层学习结构：

```text
教材正文 docs/
↓
可运行实验 labs/
↓
练习与答案 exercises/
↓
毕业项目 projects/
```

## 学习规则

每一章都按下面顺序：

1. 先阅读对应 `docs/` 章节。
2. 不看答案，先完成 `exercises/`。
3. 运行 `labs/` 中的代码。
4. 修改代码制造错误，再尝试修复。
5. 对照 `solutions/` 或同目录 solution 文件。
6. 用 Git Commit 保存学习结果。
7. 最后进入阶段项目。

---

## 阶段一：基础语言

### Web / HTML / CSS
- 实验：`labs/html-css-dashboard/`
- 目标：手工完成一个后台 Dashboard，不使用 React。

### JavaScript
- 实验：`labs/javascript-basics/`
- 目标：掌握数组、函数、异步、错误处理。

### TypeScript
- 实验：`labs/typescript-basics/`
- 目标：掌握 interface、union、narrowing、generic、unknown。

---

## 阶段二：服务端与数据

### HTTP API
- 实验：`labs/http-api/`
- 目标：使用 Node.js 原生 HTTP 模块理解 Request/Response。

### PostgreSQL
- 实验：`labs/postgresql/`
- 目标：完成 SaaS schema、seed、查询、约束、索引。

---

## 阶段三：React / Next.js / Supabase

这一阶段建议在本地创建真实 Next.js 项目，并按照：

`projects/medical-implementation-saas/README.md`

逐个里程碑实现。

---

## 阶段四：测试与安全

每个 Feature 必须至少补：

- Unit Test
- Integration Test
- 一条 Deny Case
- 一条跨租户测试
- Git Diff Review

---

## 阶段五：Production

最终必须完成：

- Docker
- GitHub Actions
- Staging
- Monitoring
- Backup
- Restore Drill
- Rollback

---

## Git 学习记录建议

每完成一个实验：

```bash
git add .
git commit -m "learn: complete javascript array exercises"
```

不要把多个章节混在一次 Commit。
