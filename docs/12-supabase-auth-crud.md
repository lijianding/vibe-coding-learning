# 12 Supabase、CRUD 与 Authentication

官方：
https://supabase.com/docs

## 目标
让项目真正拥有：
- PostgreSQL 数据库
- 用户登录
- CRUD
- 文件能力基础

## 1. 创建 Supabase 项目
学习：
- Project
- Database
- Table Editor
- SQL Editor
- Auth
- Storage

## 2. 环境变量
```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

敏感 Service Role Key 不能暴露到浏览器。

## 3. CRUD
先完成 Projects 模块：
- Create
- Read
- Update
- Delete

## 4. Authentication
实现：
- 注册
- 登录
- 退出
- 忘记密码
- Session
- 登录保护

## 5. Authentication != Authorization
登录成功，只代表知道“你是谁”。

并不代表：
- 可以删除任何项目
- 可以读取任何医院数据
- 可以调用管理员接口

## 6. 不要只隐藏按钮
错误思路：
> 普通用户看不到删除按钮，所以系统安全。

真正要求：
- 服务端验证
- 数据库策略验证
- API 验证

## 7. CRUD 验收
项目模块必须包含：
- 项目列表
- 创建项目
- 项目详情
- 编辑项目
- 删除或软删除
- 搜索
- 基础筛选
- 错误处理

## 练习
建立两个测试账号：
- admin@test.local
- user@test.local

只使用模拟信息。

## 验收
能解释：
- Auth 用户是什么
- Session 是什么
- CRUD 是什么
- 为什么前端隐藏按钮不是权限控制
- 为什么 Service Role Key 不能出现在浏览器代码中