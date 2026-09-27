# 32 质量保证与 UAT：从代码正确到业务可接受

## 参考资料

- SWEBOK: https://www.computer.org/education/bodies-of-knowledge/software-engineering
- Playwright: https://playwright.dev/docs/intro
- OWASP WSTG: https://owasp.org/www-project-web-security-testing-guide/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/

---

## 一、QA 不等于测试人员点页面

Quality Assurance 更广：

- Requirement quality
- Process quality
- Design review
- Code review
- Test
- Release gate
- Post-release feedback

---

## 二、Test Strategy

回答：

- 测什么？
- 在哪层测？
- 谁测？
- 什么环境？
- 什么数据？
- 什么算通过？

---

## 三、Test Levels

### Unit
逻辑。

### Integration
组件协作。

### API
Contract。

### E2E
用户流程。

### Security
攻击路径。

### Performance
容量和延迟。

### UAT
业务接受。

---

## 四、Test Case

字段：

- ID
- Requirement
- Preconditions
- Steps
- Expected
- Actual
- Status
- Evidence

---

## 五、Positive / Negative

每个关键需求至少：

- 正常路径
- 非法输入
- 未登录
- 无权限
- Wrong Tenant
- Not Found

---

## 六、Regression

版本发布前：

> 旧核心能力不能因为新 Feature 被破坏。

Regression 应优先自动化。

---

## 七、Test Environment

Test/Staging 要明确：

- Build
- DB
- Seed
- External integration
- Config

否则“测试通过”没有可重复性。

---

## 八、UAT

User Acceptance Testing：

> 业务用户验证产品是否满足真实业务流程。

UAT 不应只让用户随便点。

需要：

- Scenario
- Data
- Expected
- Sign-off

---

## 九、UAT Scenario

例如：

```text
PM 创建 Project
↓
Engineer 接收 Task
↓
创建 Critical Issue
↓
PM 分配负责人
↓
Issue 关闭
↓
Audit 可查询
```

---

## 十、Defect Severity

示例：

### Critical
数据泄漏、核心系统不可用。

### High
关键流程无法完成。

### Medium
有替代路径。

### Low
轻微体验问题。

Severity 与 Priority 不完全一样。

---

## 十一、Entry / Exit Criteria

进入 UAT：

- Feature complete
- Critical tests pass
- Staging stable

退出 UAT：

- Critical/High defect resolved
- Core scenarios pass
- Business sign-off

---

## 十二、Traceability Matrix

连接：

```text
Requirement
↓
Test Case
↓
Result
↓
Defect
↓
Release
```

---

## 十三、实践

为 Project Archive 建：

- 8 个 Test Case
- 2 个 Negative
- 2 个 Permission
- 1 个 Cross-Tenant
- UAT Scenario
- Traceability

模板：
`templates/software-engineering/13-test-plan.md`
