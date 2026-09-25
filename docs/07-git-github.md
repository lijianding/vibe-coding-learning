# 07 Git 与 GitHub：版本控制、协作与可恢复开发

> Git 不是“上传代码工具”，而是软件开发的历史记录系统。对于 Vibe Coding，它尤其重要，因为 AI 很容易一次改动大量文件，而 Git 让你能够看清变化、回滚错误、隔离实验和进行代码审查。

主教材：
- Pro Git: https://git-scm.com/book/
- GitHub Docs: https://docs.github.com/

---

## 一、为什么需要版本控制

没有 Git：

```text
project-final/
project-final2/
project-final-new/
project-final-really-final/
```

你无法可靠回答：

- 哪次修改导致 Bug？
- 这个文件以前是什么样？
- 谁改了权限逻辑？
- 如何撤回 AI 的错误修改？
- 两个人如何同时开发？

Git 的核心价值：

> 把每一次重要变化保存成可追踪、可比较、可恢复的历史。

---

## 二、Git 的三个核心区域

理解这个模型非常重要：

```text
Working Directory
      ↓ git add
Staging Area
      ↓ git commit
Repository
```

### Working Directory

你正在修改的文件。

### Staging Area

准备进入下一次 Commit 的修改。

### Repository

已经提交的历史。

这意味着：

```bash
git add .
```

并不是“上传 GitHub”，只是把修改放进暂存区。

---

## 三、Commit 是什么

Commit 可以理解成：

> 某个时间点的一组有意义的代码变化快照。

一个 Commit 通常包含：

- Parent Commit
- Tree
- Author
- Timestamp
- Message

Commit 通过 SHA 标识。

例如：

```text
a1b2c3d
```

---

## 四、好的 Commit 应该是“一个逻辑单位”

不好：

```text
update files
```

更好：

```text
feat: add project creation
fix: enforce tenant isolation
test: add unauthorized access tests
docs: expand auth guide
```

一个 Commit 尽量只完成一个主题。

这让：

- Review 更容易
- Revert 更安全
- Bug 定位更简单

---

## 五、git status

这是最常用命令之一：

```bash
git status
```

它告诉你：

- 哪些文件修改了
- 哪些文件未追踪
- 哪些修改已 staged
- 当前分支

AI 改代码以后第一步就应该看它。

---

## 六、git diff

```bash
git diff
```

显示还没 staged 的变化。

```bash
git diff --staged
```

显示即将 Commit 的变化。

Vibe Coding 中非常重要：

> 永远不要因为 AI 说“完成了”就直接 commit，先看 diff。

---

## 七、Branch 的原理

Branch 本质上是：

> 指向某个 Commit 的可移动指针。

例如：

```text
main
  ↓
A ─ B ─ C
                 D ─ E
             ↑
       feat/project-list
```

你可以在 Feature Branch 实验，而不影响 main。

创建：

```bash
git switch -c feat/project-list
```

切换：

```bash
git switch main
```

---

## 八、Merge

当功能完成：

```text
feature branch
↓
review
↓
merge
↓
main
```

Git 会把两个历史整合。

---

## 九、Merge Conflict

如果两个分支修改同一位置，Git 无法自动决定。

可能看到：

```text
<<<<<<< HEAD
旧代码
=======
新代码
>>>>>>> feature
```

需要人工判断最终内容。

不要让 AI 在不了解业务含义时盲目解决冲突。

---

## 十、Remote

本地 Git 和 GitHub 是两层。

```text
Local Repository
↓ push
GitHub Remote
```

常见：

```bash
git remote -v
git push
git pull
git fetch
```

### fetch

下载远端信息，不自动合并。

### pull

通常相当于：

```text
fetch + merge/rebase
```

---

## 十一、Pull Request

PR 不是 Git 本身的概念，是 GitHub 协作流程。

典型：

```text
Feature Branch
↓
Push
↓
Pull Request
↓
CI
↓
Code Review
↓
Approve
↓
Merge
```

对于一个人学习，也建议使用 PR。

原因：

- 强迫你总结修改
- 能集中看 Diff
- 可以让 AI Review
- 可以关联测试结果

---

## 十二、Revert 与 Reset 的区别

### Revert

创建一个新的 Commit，把旧 Commit 的效果反向撤销。

适合共享历史。

### Reset

移动当前分支指针。

可能重写本地历史。

初学阶段对已推送共享分支谨慎使用。

原则：

> Production / shared branch 出错优先考虑 revert，而不是随意 force reset。

---

## 十三、.gitignore

不要提交：

- node_modules
- .env
- build artifacts
- OS 临时文件

常见：

```text
node_modules/
.next/
.env
.env.local
coverage/
```

注意：

如果 Secret 已经提交过，再加 .gitignore 也不能从历史自动消失。

应立即：

- 吊销 Secret
- 更换 Secret
- 必要时清理 Git 历史

---

## 十四、Git 与 AI 的安全工作流

推荐：

```text
main 处于可运行状态
↓
新建 feature branch
↓
让 AI 做一个功能
↓
git status
↓
git diff
↓
运行测试
↓
让 AI Review diff
↓
commit
↓
PR
↓
CI
↓
merge
```

---

## 十五、常用命令

```bash
git status
git diff
git diff --staged
git log --oneline --graph
git add .
git commit -m "..."
git switch -c feat/name
git switch main
git fetch
git pull
git push
git branch
git merge
```

---

## 十六、GitHub Actions 与 Git 的关系

Push/PR 可以触发自动流程：

```text
push
↓
GitHub Actions
↓
npm install
↓
lint
↓
typecheck
↓
test
↓
build
```

这叫 Continuous Integration 的一部分。

后面生产工程章节深入。

---

## 十七、练习

### 练习 1

创建：

```bash
git switch -c feat/readme-note
```

修改 README。

查看：

```bash
git diff
```

提交：

```bash
git add .
git commit -m "docs: add learning note"
```

### 练习 2

制造一个小错误并 commit，然后用 revert 撤销。

### 练习 3

创建两个分支修改同一行，观察 Merge Conflict。

---

## 十八、验收

你应该能解释：

- Git 和 GitHub 区别
- Working Directory / Staging / Repository
- Commit
- Branch
- Merge
- Conflict
- Remote
- fetch vs pull
- PR
- revert vs reset
- 为什么 AI Coding 必须高频 commit

## 推荐资料

- Pro Git: https://git-scm.com/book/
- GitHub Get Started: https://docs.github.com/en/get-started
- GitHub Pull Requests: https://docs.github.com/en/pull-requests
- GitHub Actions: https://docs.github.com/en/actions
