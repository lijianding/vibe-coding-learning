# 15 Docker、部署、CI/CD、监控与备份

## 1. Docker
官方：
https://docs.docker.com/get-started/

必学：
- Image
- Container
- Dockerfile
- Volume
- Network
- Port
- Docker Compose

常用：
```bash
docker build
docker run
docker ps
docker logs
docker exec
docker stop
docker compose up
docker compose down
```

## 2. 部署
推荐初期：
```text
GitHub
↓
Vercel
↓
Next.js

Supabase
↓
PostgreSQL
```

理解：
- Domain
- DNS
- HTTPS
- Environment Variable
- Build
- Deploy
- Rollback

## 3. 环境
不要只有一个环境。

至少理解：
```text
Development
Testing
Staging
Production
```

## 4. CI/CD
GitHub Actions：
https://docs.github.com/actions

推荐：
```text
git push
↓
lint
↓
typecheck
↓
unit test
↓
E2E
↓
build
↓
deploy
```

Test Failed 时不应继续生产发布。

## 5. Monitoring
至少监控：
- Application Error
- API Error
- Database Error
- Login Failure
- HTTP 500
- Slow Query
- Deployment Failure

可使用：
- Sentry
- Vercel Logs
- Supabase Logs

## 6. Backup / Recovery
必须理解：
- Backup
- Restore
- RPO
- RTO

一定要真的做一次恢复演练。

数据库备份和文件备份要分别考虑。

## 7. Rollback
发布失败时必须知道：
- 如何回滚代码
- 如何回滚数据库迁移
- 如何恢复配置

## 验收
能回答：
- Production 挂了去哪看
- 新版本出问题怎么办
- 数据误删怎么办
- 为什么备份但不演练恢复仍然不够