# 04 HTML / CSS：理解页面结构与布局原理

> 目标不是成为 UI 设计师，而是能够读懂 AI 生成的页面、发现结构问题、修改布局，并理解 React 最终渲染出来的 HTML/CSS。

MDN 将 semantic HTML、CSS 基础、布局、响应式和可访问性作为 Web 开发核心知识。  
官方学习入口：https://developer.mozilla.org/en-US/docs/Learn_web_development/Core

---

## 一、HTML 的本质：描述“内容是什么”

HTML = HyperText Markup Language。

它不是传统意义上的编程语言。

HTML 的工作是：

> 用元素描述页面内容的结构和语义。

例如：

```html
<h1>项目详情</h1>
<p>项目状态：实施中</p>
<button>保存</button>
```

浏览器知道：

- h1 是主标题
- p 是段落
- button 是按钮

---

## 二、Element、Tag、Attribute

```html
<input type="text" name="projectName" required />
```

其中：

- `input`：元素
- `type`：属性
- `text`：属性值
- `name`：字段名
- `required`：布尔属性

---

## 三、HTML 文档结构

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>Medical SaaS</title>
  </head>
  <body>
    <main>
      <h1>Dashboard</h1>
    </main>
  </body>
</html>
```

### head

放：

- metadata
- title
- stylesheet
- script / preload 等

### body

真正可见的页面内容。

---

## 四、Semantic HTML

不要把所有东西都写成：

```html
<div>
```

应该根据语义使用：

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
<button>
<form>
<label>
<table>
```

### 为什么语义重要

影响：

- 可访问性
- Screen Reader
- SEO
- 可维护性
- 自动化测试定位

例如按钮应该优先：

```html
<button>保存</button>
```

而不是：

```html
<div onclick="save()">保存</div>
```

---

## 五、表单是 SaaS 最重要的 HTML 能力之一

你以后大量页面都是表单：

- 创建医院
- 创建项目
- 创建问题单
- 添加成员
- 搜索
- 筛选

基本结构：

```html
<form>
  <label for="project-name">项目名称</label>
  <input
    id="project-name"
    name="projectName"
    type="text"
    required
  />

  <label for="status">状态</label>
  <select id="status" name="status">
    <option value="planning">规划中</option>
    <option value="active">实施中</option>
  </select>

  <button type="submit">保存</button>
</form>
```

必须理解：

- label
- input
- select
- textarea
- checkbox
- radio
- submit

---

## 六、HTML Validation 只是第一层

例如：

```html
<input required maxlength="100" />
```

这是用户体验层。

但是攻击者可以跳过 Browser。

因此后端仍然必须：

```text
再次校验
```

原则：

> Client Validation for UX  
> Server Validation for Trust

---

# CSS 部分

## 七、CSS 的本质

CSS 负责描述：

> HTML 应该如何显示。

语法：

```css
selector {
  property: value;
}
```

例如：

```css
button {
  padding: 8px 16px;
  border-radius: 6px;
}
```

---

## 八、Cascade：为什么叫 Cascading Style Sheets

多个规则可能同时命中一个元素。

最终样式取决于：

- Origin
- Importance
- Specificity
- Source Order

初学阶段重点理解 specificity。

例如：

```css
button {}
.primary {}
#save-button {}
```

ID 通常比 class 更具体。

不要为了“压过样式”不断堆：

```css
!important
```

这通常意味着 CSS 结构正在失控。

---

## 九、Box Model

每个元素都可以理解为一个盒子：

```text
margin
┌─────────────────────┐
│ border              │
│ ┌─────────────────┐ │
│ │ padding         │ │
│ │ ┌─────────────┐ │ │
│ │ │ content     │ │ │
│ │ └─────────────┘ │ │
│ └─────────────────┘ │
└─────────────────────┘
```

必须理解：

- content
- padding
- border
- margin

推荐常见设置：

```css
* {
  box-sizing: border-box;
}
```

---

## 十、Display

常见：

- block
- inline
- inline-block
- flex
- grid
- none

后台 SaaS 最重要：

- Flexbox
- Grid

---

## 十一、Flexbox 原理

Flexbox 是一维布局。

适合：

- 导航条
- 按钮组
- Header
- Sidebar + Main
- 表单行

示例：

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
```

重点：

- main axis
- cross axis
- justify-content
- align-items
- gap
- flex-grow
- flex-shrink

---

## 十二、Grid 原理

Grid 是二维布局。

适合：

- Dashboard
- Card Grid
- 复杂页面区域

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
```

---

## 十三、Position

必须知道：

- static
- relative
- absolute
- fixed
- sticky

常见：

```text
顶部固定导航 → sticky/fixed
Modal 遮罩 → fixed
图标角标 → relative + absolute
```

---

## 十四、Responsive Design

不能默认所有用户屏幕一样。

核心手段：

- fluid width
- flex/grid
- media query
- responsive typography

例如：

```css
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
```

即使你的产品主要给 PC 医院使用，也要考虑：

- 窗口缩放
- 笔记本
- 平板
- 远程桌面

---

## 十五、Accessibility

商业软件至少具备基础可访问性意识：

- 表单有 label
- Button 真的是 button
- 图片有合理 alt
- 键盘可操作
- focus 可见
- 对比度合理
- 不只靠颜色表达状态

例如错误状态不要只显示红色：

错误：

```text
[红色边框]
```

更好：

```text
项目名称不能为空
```

---

## 十六、Tailwind 为什么后面再学

Tailwind 并没有替代 CSS 原理。

例如：

```html
<div class="flex items-center gap-4 p-4">
```

本质仍然对应 CSS：

- display:flex
- align-items:center
- gap
- padding

如果不懂 CSS，你会：

> 会复制 class，但不知道为什么页面错位。

---

## 十七、练习：静态 SaaS 页面

不要 React。

仅使用 HTML + CSS 完成：

```text
┌──────── Top Bar ───────────┐
│                            │
├── Sidebar ─┬───────────────┤
│ Dashboard  │ KPI Cards     │
│ Projects   │               │
│ Issues     │ Project Table │
│ Settings   │               │
└────────────┴───────────────┘
```

页面至少包含：

- nav
- main
- table
- form
- button
- flex
- grid

---

## 十八、排障问题

页面挤在一起：

> 看 Box Model / width / flex shrink

元素不居中：

> 看 main axis / cross axis

absolute 跑到奇怪位置：

> 检查 nearest positioned ancestor

手机页面溢出：

> 检查固定宽度、table、overflow

---

## 十九、本章验收

你应该能够解释：

- HTML 为什么需要语义
- div 和 button 为什么不能随便互换
- label 为什么重要
- Client Validation 为什么不能当安全措施
- CSS Cascade 是什么
- Box Model
- Flex 与 Grid 区别
- Position 基本模型
- Responsive 的意义
- Tailwind 为什么仍需要 CSS 基础

## 推荐资料

- MDN Learn: https://developer.mozilla.org/en-US/docs/Learn_web_development
- MDN HTML: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content
- MDN CSS: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics
- MDN CSS Layout: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout
