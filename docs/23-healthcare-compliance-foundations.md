# 23 医疗行业 SaaS 合规基础：先学会划清数据边界

> 本章只提供技术与合规学习框架，不替代法律意见。真正上线时必须依据你的业务所在国家/地区、客户类型、数据类型进行专项评估。

## 权威源资料

### 美国

- HHS HIPAA Security Rule: https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html
- HHS HIPAA Cloud Computing: https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html
- HHS Business Associates: https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html

### 安全开发

- NIST SSDF Project: https://csrc.nist.gov/projects/ssdf
- NIST SP 800-218: https://csrc.nist.gov/pubs/sp/800/218/final
- NIST SP 800-53: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final

### Web 应用安全

- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Top 10: https://owasp.org/www-project-top-ten/

---

## 一、先判断你的产品处理什么数据

学习项目建议只处理：

- 医院名称
- 项目
- 任务
- 需求
- Issue
- 实施人员
- 上线计划
- 非患者实施资料

避免真实：

- 患者姓名
- 身份证
- 电话
- 诊断
- 病历
- 处方
- 检验
- 影像
- 临床结果

---

## 二、为什么“医疗行业软件”不等于“医疗数据系统”

以下 SaaS：

- 医疗软件实施项目管理
- IT 工单
- 培训管理
- 接口管理
- 项目知识库

可能并不必然处理患者临床信息。

一旦加入：

- Patient record
- ePHI
- Clinical data

风险级别和合规责任会明显上升。

---

## 三、Data Classification

建立数据分级：

```text
Public
Internal
Confidential
Restricted
```

例如：

### Public

帮助文档。

### Internal

普通项目流程。

### Confidential

医院联系人、合同信息。

### Restricted

患者/临床/高敏个人信息。

不同级别对应不同：

- Access
- Encryption
- Logging
- Retention
- Export

---

## 四、Data Inventory

你必须知道：

> 系统究竟保存哪些数据？

建立表：

```text
Data Element
Source
Purpose
Storage
Encryption
Retention
Access Roles
Third Party
```

否则无法做隐私和安全评估。

---

## 五、Data Flow

画：

```text
Browser
↓
Vercel
↓
Supabase
↓
Storage
↓
Email Provider
↓
Monitoring
```

问：

- 数据经过哪里？
- 哪些第三方能接触？
- 哪个国家/区域？
- 是否进入日志？

---

## 六、Minimum Necessary 思维

只收集产品真正需要的数据。

如果实施项目只需要：

```text
Hospital Project ID
```

就不要顺手存患者信息。

数据越少：

- 泄露影响越小
- 合规范围越小
- 成本越低

---

## 七、Access Control

高敏系统需要：

- Least Privilege
- Strong Auth
- RBAC
- RLS
- MFA for privileged roles
- Periodic access review

---

## 八、Audit Control

HHS Security Rule 等框架强调审计和访问控制的重要性。

技术上需要：

- 登录
- 权限变更
- 数据查看/修改（按风险）
- Export
- Admin action

可追踪。

---

## 九、Encryption

至少理解：

### In Transit

TLS/HTTPS。

### At Rest

数据库/磁盘/Storage 加密。

### Application-level

极敏感字段可能进一步加密。

加密不是万能：

> 已登录且有权限的应用仍需要访问明文。

所以 Access Control 同样关键。

---

## 十、Key Management

不要：

- Encryption Key 与数据库放一起
- Key 直接写源码

需要：

- Secret management
- Rotation
- Access restriction
- Audit

---

## 十一、Cloud Provider

如果系统处理受监管医疗数据，不能只问：

> 云服务“安全不安全”？

还要问：

- 服务是否覆盖你的合规需求
- 合同条款
- 数据处理角色
- BAA/DPA
- Region
- Subprocessor

例如 HHS 对使用 CSP 处理 ePHI 的 Business Associate/BAA 有明确指导。citeturn408249search7

---

## 十二、BAA 基础

在美国 HIPAA 语境中，如果 Cloud Provider 代表 Covered Entity/Business Associate 创建、接收、维护或传输 ePHI，其 Business Associate 义务和 BAA 需要被考虑。citeturn408249search7

不要因为：

> 数据加密了，Cloud Provider 看不到

就自动认为不在相关义务范围。HHS 的云指南明确讨论了这一点。citeturn408249search7

---

## 十三、Secure SDLC

NIST SSDF 提供安全软件开发实践框架，强调把安全融入 SDLC，而不是上线前最后扫一次。citeturn408249search0turn408249search1

可映射到你的流程：

```text
Requirement
↓
Threat Model
↓
Secure Design
↓
Implementation
↓
Review
↓
Testing
↓
Release
↓
Vulnerability Response
```

---

## 十四、Vulnerability Management

上线后要有：

- Dependency alerts
- Patch process
- Security contact
- Severity
- Remediation SLA
- Incident response

软件安全不是“上线时一次完成”。

---

## 十五、Incident Response

高敏数据事件需要事先定义：

- Detection
- Containment
- Investigation
- Notification
- Recovery
- Evidence

不同地区法律通知义务不同，应做专项法律确认。

---

## 十六、Retention 与 Deletion

不要无限保存。

定义：

- Active data
- Archived data
- Deleted account
- Audit log
- Backup

并区分：

> 用户界面删除  
> 数据库删除  
> Backup 中到期删除

---

## 十七、Test Data

禁止用真实患者数据做：

- Local dev
- Screenshot
- GitHub Issue
- AI Prompt
- Demo

优先 synthetic data。

---

## 十八、AI 工具特别注意

如果把真实敏感医疗数据发给外部 AI 服务，要额外评估：

- 数据处理条款
- 保留
- 训练使用
- Region
- Contract
- Compliance

学习阶段全部使用模拟数据。

---

## 十九、医疗 SaaS 上线前问题

至少回答：

1. 数据分类是什么？
2. 是否有患者/临床信息？
3. 数据在哪些第三方？
4. 谁能访问？
5. 有没有 Audit？
6. Retention 多久？
7. 删除如何完成？
8. Backup 是否包含数据？
9. Incident 怎么处理？
10. 法律/合同要求是什么？

---

## 二十、验收

应理解：

- 医疗行业 ≠ 自动等于 PHI
- Data Classification
- Inventory
- Data Flow
- Minimum Necessary
- Least Privilege
- Audit
- Encryption
- Key Management
- Cloud contract
- Secure SDLC
- Vulnerability management
- Retention
- Synthetic test data
