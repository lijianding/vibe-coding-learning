# 28 产品设计与原型验证：在写生产代码前验证方案

## 参考资料

- GOV.UK Alpha: https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works
- GOV.UK Design: https://www.gov.uk/service-manual/design
- Nielsen Norman Group: https://www.nngroup.com/articles/prototype/

---

## 一、设计阶段解决什么

需求说：

> 用户需要管理 Issue。

设计阶段要决定：

- 信息结构
- 页面流程
- 状态
- 操作
- Error
- Permission
- Feedback

---

## 二、Information Architecture

确定：

```text
Dashboard
Projects
  Project Detail
    Tasks
    Issues
    Requirements
Settings
```

目标：

> 用户知道去哪里完成任务。

---

## 三、User Flow

例如：

```text
Project Detail
↓
Issues
↓
New Issue
↓
Fill Form
↓
Submit
↓
Validation
↓
Success
```

还要画：

- Validation Failure
- Forbidden
- Network Error

---

## 四、Wireframe

先用低保真结构验证：

- 页面结构
- 信息优先级
- 操作路径

不要一开始纠结：

- 阴影
- 配色
- 动画

---

## 五、Prototype

Prototype 用于验证方案，不一定是生产代码。

可以：

- Paper
- Figma
- Static HTML
- Throwaway Code

Alpha 阶段应优先验证最大风险，而不是构建完整系统。

---

## 六、UX State

每个页面设计至少考虑：

```text
Loading
Empty
Success
Error
Forbidden
Not Found
Disabled
Submitting
```

这些不是“开发自己补”。

应成为产品设计的一部分。

---

## 七、Form Design

考虑：

- Label
- Required
- Default
- Validation
- Error Message
- Help Text
- Save/Cancel
- Unsaved Changes

---

## 八、Confirmation

高风险操作：

- Delete
- Archive
- Role Change
- Export Sensitive Data

应明确：

- 是否确认
- 是否可恢复
- 权限
- Audit

---

## 九、Accessibility

设计阶段就考虑：

- Keyboard
- Focus
- Contrast
- Screen Reader
- Error text
- Touch target

不要上线前最后“补无障碍”。

---

## 十、Usability Test

让真实/代表性用户完成任务。

观察：

- 是否知道下一步
- 是否理解术语
- 是否卡住
- 完成时间
- 错误

不要教用户怎么操作，否则失去验证价值。

---

## 十一、Prototype Validation

核心问题：

> 这个方案能否让用户完成目标？

而不是：

> 用户觉得页面好看吗？

---

## 十二、Design Handoff

交付给开发：

- Flow
- Screen
- States
- Field Rules
- Permission
- Error
- Responsive
- Acceptance Criteria

---

## 十三、实践

为 Issue 模块设计：

1. List
2. Detail
3. Create
4. Assign
5. Resolve
6. Forbidden
7. Empty
8. Error

然后让一名模拟用户完成：

> 找到 Critical Issue 并分配负责人。
