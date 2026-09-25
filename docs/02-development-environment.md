# 02 开发环境：建立可重复、可调试的工作台

## 官方源资料

- Node.js: https://nodejs.org/
- Node Learn: https://nodejs.org/learn
- Git: https://git-scm.com/
- Git Book: https://git-scm.com/book/
- Docker Desktop: https://docs.docker.com/desktop/
- VS Code Docs（编辑器基础可参考）: https://code.visualstudio.com/docs
- Chrome DevTools: https://developer.chrome.com/docs/devtools/

---

## 一、推荐工具

### 必需

- Cursor
- Node.js LTS
- Git
- Chrome/Edge
- GitHub

### 推荐

- DBeaver
- Docker Desktop
- Postman 或 Bruno
- Windows Terminal
- WSL2（Windows）
- GitHub CLI（后期）

---

## 二、为什么使用 LTS

LTS = Long-Term Support。

生产学习优先稳定版本，而不是追最新实验版本。

Node 版本变化可能影响：

- Framework
- package
- build
- CI

---

## 三、验证环境

```bash
node -v
npm -v
git --version
```

后期：

```bash
docker --version
docker compose version
```

---

## 四、Terminal 基础

必须熟练：

```bash
pwd
ls
cd
mkdir
cp
mv
rm
cat
grep
find
curl
```

你已有 Linux 基础，应把重点放在：

> 能独立定位项目、运行命令、读日志。

---

## 五、Shell 中最危险的命令

例如：

```bash
rm -rf
```

AI 给出命令时先理解再执行。

Production Server 上尤其不要盲目复制。

---

## 六、项目目录

典型：

```text
project/
├── app/
├── components/
├── features/
├── lib/
├── public/
├── tests/
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env.local
├── .gitignore
└── README.md
```

---

## 七、README 应该写什么

至少：

- 项目是什么
- 技术栈
- 环境要求
- 如何安装
- 环境变量
- 如何运行
- 如何测试
- 目录说明

让半年后的你也能重新启动项目。

---

## 八、.env

例如：

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

不要提交。

使用：

```text
.env.example
```

只放变量名：

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

不放真实值。

---

## 九、Node/npm 常见命令

```bash
npm install
npm ci
npm run dev
npm run build
npm run lint
npm run test
```

### npm install

开发安装/更新依赖。

### npm ci

根据 lockfile 做可重复安装，适合 CI。

---

## 十、浏览器 DevTools

必须会：

### Elements
HTML/CSS。

### Console
Runtime error。

### Network
HTTP。

### Application
Cookie/Storage。

### Performance
性能。

---

## 十一、DBeaver

用于：

- 看 Schema
- 查数据
- 执行 SQL

但不要形成：

> 直接手工改 Production 数据

习惯。

重要变更应通过应用流程或 Migration。

---

## 十二、Postman / Bruno

用于 API 调试。

实践：

- GET
- POST
- Auth Header
- JSON Body
- Status
- Response

也可保存 API Collection 作为测试/文档。

---

## 十三、Docker Desktop

初期只安装验证。

后面生产章节再学：

- Image
- Container
- Compose
- Volume
- Network

---

## 十四、Windows + WSL2

如果 Windows 开发，WSL2 可提供更接近 Linux 的开发环境。

优点：

- Shell 一致
- Linux tooling
- Docker integration

但不是必须。

不要为了“配置完美”卡几天不写代码。

---

## 十五、路径与权限

理解：

- Absolute Path
- Relative Path
- File permission

Linux：

```bash
chmod
chown
```

不要遇到 Permission Error 就直接：

```bash
sudo chmod -R 777
```

这会掩盖真实权限问题。

---

## 十六、Port

本地常见：

```text
3000 Next.js
5432 PostgreSQL
```

如果 Port 被占用：

```text
EADDRINUSE
```

需要找出哪个进程占用，而不是随机重装软件。

---

## 十七、Process

Linux/macOS 常见：

```bash
ps
kill
```

理解：

> npm run dev 启动的是一个长期运行进程。

---

## 十八、curl

非常实用：

```bash
curl -I https://example.com
```

或调用 API。

它帮你区分：

> Browser 问题还是 Server/API 问题？

---

## 十九、本地工作目录建议

```text
development/
└── medical-saas/
```

避免：

- 中文/奇怪符号路径（有些工具兼容性差）
- OneDrive 实时同步大型 node_modules
- 多份 final-final 目录

代码历史交给 Git。

---

## 二十、环境验收清单

- [ ] node -v
- [ ] npm -v
- [ ] git --version
- [ ] 能 git clone
- [ ] 能 npm install
- [ ] 能 npm run dev
- [ ] 能访问 localhost
- [ ] 会 DevTools Network
- [ ] 会创建 .env.local
- [ ] .env.local 已 gitignore
- [ ] 会使用 DBeaver
- [ ] 会用 curl/Postman

完成再继续 Web 基础。
