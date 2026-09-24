# 02 开发环境搭建

## 必需工具
- Git
- Node.js LTS
- Cursor
- Chrome
- GitHub

## 推荐工具
- DBeaver
- Docker Desktop
- Postman / Bruno
- Windows Terminal
- WSL2（Windows 可选）

## 官方链接
- Node.js: https://nodejs.org/
- Git: https://git-scm.com/
- Docker: https://docs.docker.com/get-started/
- DBeaver: https://dbeaver.io/

## 验证命令
```bash
node -v
npm -v
git --version
```

## 常用命令
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

Node/npm：
```bash
npm install
npm run dev
npm run build
npm run test
```

## 项目目录直觉
```text
project/
├── app/
├── components/
├── lib/
├── public/
├── tests/
├── package.json
├── tsconfig.json
├── .env.local
└── README.md
```

## 练习
创建：
```text
medical-saas-learning-local/
├── notes/
├── exercises/
└── project/
```

## 验收
能解释：
- Node.js 是什么
- npm 做什么
- npm run dev 做什么
- package.json 是什么
- .env.local 为什么不能提交敏感信息