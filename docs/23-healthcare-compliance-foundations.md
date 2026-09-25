# 23 医疗行业 SaaS 合规基础：先学会划清数据边界

> 本章提供技术与合规学习框架，不替代法律意见。真正上线时，应依据产品所在国家/地区、客户类型、业务模式和实际处理的数据类型进行专项评估。

## 权威源资料

### 美国 HIPAA
- HHS HIPAA Security Rule: https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html
- HHS HIPAA Cloud Computing: https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html
- HHS Business Associates: https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html

### 安全开发
- NIST SSDF Project: https://csrc.nist.gov/projects/ssdf
- NIST SP 800-218: https://csrc.nist.gov/pubs/sp/800/218/final
- NIST SP 800-53 Rev.5: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final

### Web 应用安全
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Top 10: https://owasp.org/www-project-top-ten/

---

## 一、先判断产品到底处理什么数据

医疗行业软件不一定处理患者临床数据。

本学习项目建议只使用：

- 医院/组织名称
- 项目
- 任务
- 需求
- Issue
- 实施人员
- 上线计划
- 测试计划
- 非患者实施资料

学习阶段避免真实：

- 患者姓名
- 身份证件
- 电话号码
- 诊断
- 病历
- 处方
- 检验结果
- 影像
- 其他敏感临床数据

---

## 二、建立 Data Classification

可先采用：

```text
Public
Internal
Confidential
Restricted
```

不同分类对应不同：

- Access Control
- Encryption
- Logging
- Retention
- Export
- Backup
- Incident Response

---

## 三、建立 Data Inventory

至少维护：

```text
Data Element
Purpose
Source
Storage
Data Owner
Allowed Roles
Third Party
Encryption
Retention
Deletion
```

如果不知道系统存了什么，就无法真正做安全与合规。

---

## 四、画 Data Flow

例如：

```text
Browser
↓
Vercel / Application Server
↓
Supabase Database
↓
Storage
↓
Email Provider
↓
Monitoring
```

对每个节点问：

- 保存什么数据？
- 是否跨境？
- 谁能访问？
- 是否进入日志？
- 是否进入备份？
- 是否交给第三方？

---

## 五、Data Minimization

只保存真正需要的数据。

原则：

> 不收集的数据就不会被泄露。

如果业务只需要项目编号，就不要顺手保存患者标识。

---

## 六、Least Privilege

用户只获得完成工作所需最小权限。

高权限角色尤其考虑：

- MFA
- Periodic Access Review
- Audit
- Shorter Session
- Admin Action Confirmation

---

## 七、Audit Controls

高风险系统至少需要对关键事件进行可追踪记录：

- 登录与异常登录
- 权限变更
- 成员邀请/删除
- 数据修改
- Export
- 高权限操作
- 敏感文件访问（按风险）

---

## 八、Encryption

至少区分：

### In Transit
使用 HTTPS/TLS。

### At Rest
数据库、磁盘、对象存储加密。

### Application-level
对于极敏感字段，可能需要额外应用层加密。

注意：

> Encryption 不能替代 Authorization。

---

## 九、Key Management

不要：

- 把 Key 写源码
- 把 Key 提交 Git
- 把 Key 打日志

需要：

- Secret Store
- Least Privilege
- Rotation
- Access Audit

---

## 十、Cloud Provider 与合规

如果云服务商代表受监管实体处理受保护健康信息，需要评估：

- Contract
- Data Processing Terms
- Region
- Subprocessors
- Security Controls
- Breach Process
- Applicable Agreements

在美国 HIPAA 场景下，HHS 对云服务处理 ePHI、Business Associate 和 BAA 有官方说明，详见：
https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html

---

## 十一、BAA 基础概念

在美国 HIPAA 场景中，如果 CSP 代表 Covered Entity 或 Business Associate 创建、接收、维护或传输 ePHI，通常需要评估 Business Associate 义务及 BAA。

即使数据是加密的，也不能简单推导“云服务商因此不受相关要求影响”。

具体以 HHS 当前官方规则和法律意见为准。

---

## 十二、Secure SDLC

NIST SSDF 强调将安全融入整个软件生命周期：

```text
Requirement
↓
Threat Modeling
↓
Secure Design
↓
Implementation
↓
Code Review
↓
Security Testing
↓
Release
↓
Vulnerability Response
```

官方：
https://csrc.nist.gov/projects/ssdf

---

## 十三、Vulnerability Management

上线后应有：

- Dependency Alert
- Vulnerability Intake
- Severity
- Patch Process
- Remediation SLA
- Security Contact
- Incident Escalation

软件安全不是一次性验收。

---

## 十四、Retention 与 Deletion

分别定义：

- Active Data
- Archived Data
- Deleted Account Data
- Audit Log
- Backup

需要区分：

```text
UI Deleted
≠
Database Deleted
≠
Backup Expired
```

---

## 十五、Test Data

禁止把真实医疗敏感数据直接放进：

- Local Dev
- GitHub
- Issue
- Screenshot
- AI Prompt
- Demo Environment

推荐使用 Synthetic Data。

---

## 十六、AI 工具的数据边界

如果未来真的向外部 AI 服务发送敏感医疗数据，需要额外评估：

- Data Processing Terms
- Retention
- Training Use
- Region
- Access
- Contract
- Compliance

学习阶段全部使用模拟数据。

---

## 十七、Incident Response

至少事先定义：

```text
Detect
↓
Contain
↓
Investigate
↓
Recover
↓
Notify if required
↓
Postmortem
```

不同地区法律通知义务不同，需要专项确认。

---

## 十八、上线前必须回答的问题

1. 产品保存哪些数据？
2. 是否包含患者/临床信息？
3. 数据存在哪里？
4. 哪些第三方可接触？
5. 谁能访问？
6. 是否有 Audit？
7. 数据保留多久？
8. 如何删除？
9. Backup 如何处理？
10. Incident 如何响应？
11. 适用什么法律/合同要求？
12. 客户能否安全导出自己的数据？

---

## 十九、本章验收

应理解：

- 医疗行业软件与受监管医疗数据系统不是同一概念
- Data Classification
- Data Inventory
- Data Flow
- Data Minimization
- Least Privilege
- Audit
- Encryption
- Key Management
- Cloud Provider Risk
- Secure SDLC
- Vulnerability Management
- Retention
- Synthetic Test Data
- Incident Response
