# 07 Git 与 GitHub

官方：
- https://git-scm.com/book/
- https://docs.github.com/

## 必学命令
```bash
git init
git status
git add .
git commit
git log
git diff
git branch
git switch
git merge
git pull
git push
```

## 核心概念
- Repository
- Working Tree
- Staging Area
- Commit
- Branch
- Merge
- Remote
- Pull Request

## 推荐开发循环
```text
功能可运行
↓
git status
↓
git diff
↓
测试
↓
git add .
↓
git commit
```

## Commit 示例
```text
feat: add project list
fix: enforce tenant permission
test: add project access test
docs: update setup guide
```

## 分支
功能开发建议：
```bash
git switch -c feat/project-list
```

完成后通过 Pull Request 合并。

## 最重要的习惯
不要：
```text
连续让 AI 改 40 个文件
↓
最后才提交
```

要：
```text
一个小功能
↓
测试
↓
Commit
```

## 练习
1. 创建分支
2. 修改 README
3. git diff
4. commit
5. 查看 git log
6. 合并回主分支

## 验收
能回答：
- commit 是什么
- branch 有什么用
- git diff 为什么重要
- AI 改坏后为什么 Git 能救你