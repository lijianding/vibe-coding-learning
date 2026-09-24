# 04 HTML / CSS 最小必需知识

目标：能看懂页面结构，不追求前端设计专家水平。

## HTML 常用标签
```html
<div>
<h1>
<p>
<span>
<button>
<input>
<textarea>
<select>
<form>
<table>
<a>
<img>
```

示例：
```html
<form>
  <input type="text" />
  <button type="submit">保存</button>
</form>
```

## CSS 重点
- width / height
- margin / padding
- border
- font-size
- display
- flex
- grid
- position
- background
- responsive

## 必须理解 Flexbox
常见后台布局：
```css
.container {
  display: flex;
  gap: 16px;
}
```

## 必须理解 Grid
```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

## 暂时不用深入
- Canvas
- 高级动画
- CSS 底层规范
- 复杂 SVG

## 练习
只做静态页面：
- 顶部导航
- 左侧菜单
- 项目列表
- 项目详情
- 问题列表
- Dashboard 卡片

数据先写死。

## 验收
能区分 HTML 是结构、CSS 是样式、JavaScript 是行为。