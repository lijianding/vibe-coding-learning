# 06 TypeScript 基础

官方：
https://www.typescriptlang.org/docs/handbook/

## TypeScript = JavaScript + 类型检查

```typescript
const name: string = "Project A";
const count: number = 10;
const enabled: boolean = true;
```

## interface
```typescript
interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
}
```

## 联合类型
```typescript
type ProjectStatus =
  | "planning"
  | "implementing"
  | "testing"
  | "completed";
```

## 可选字段
```typescript
interface Task {
  id: string;
  title: string;
  assigneeId?: string;
}
```

## Promise
```typescript
async function getProjects(): Promise<Project[]> {
  return [];
}
```

## null
```typescript
async function getProject(
  id: string
): Promise<Project | null> {
  return null;
}
```

## 警惕 any
AI 有时会为了快速消除报错大量使用 any。

Review 时问：
- 为什么必须 any？
- 能否定义真实类型？

## 练习
定义：
- Organization
- Project
- Task
- Issue

其中 Issue:
- id
- organizationId
- projectId
- title
- description
- priority
- status
- assignedTo?
- createdAt

## 验收
看到：
```typescript
Promise<Project | null>
```
能解释它的含义。