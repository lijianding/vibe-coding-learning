# 06 TypeScript：用类型约束 AI 生成的代码

> TypeScript 的价值不是“代码看起来更专业”，而是在运行前尽量发现一类错误，并让业务数据结构变得明确。

TypeScript 官方将其定位为 JavaScript 的静态类型检查器。官方 Handbook 也建议没有 JavaScript 基础的人先理解 JavaScript。

官方：
https://www.typescriptlang.org/docs/handbook/

---

## 一、为什么 Vibe Coding 特别需要 TypeScript

AI 很容易生成“语法正确但业务类型不一致”的代码。

例如数据库 ID 是 string：

```typescript
id: string
```

AI 却写：

```typescript
function loadProject(id: number)
```

如果没有类型系统，这类错误可能直到运行时才暴露。

TypeScript 可以在：

```text
写代码
↓
Type Check
↓
发现类型不一致
↓
还没进入 Production
```

就阻止一部分错误。

---

## 二、Static Type Checking

“Static” 意味着：

> 在代码真正运行之前检查。

例如：

```typescript
let projectId: string = "p1";

projectId = 123;
```

TypeScript 会提示：

```text
number 不能赋值给 string
```

---

## 三、Type Inference

不是每个变量都需要手写类型。

```typescript
const name = "Project A";
```

TypeScript 可以推断 name 是 string。

所以不要让 AI 生成：

```typescript
const name: string = "Project A";
```

到处重复无必要标注。

---

## 四、Object Type

```typescript
interface Project {
  id: string;
  organizationId: string;
  name: string;
  status: ProjectStatus;
  goLiveDate: string | null;
}
```

这就是“应用层数据契约”。

---

## 五、Interface 与 Type

### Interface

常用于对象结构：

```typescript
interface User {
  id: string;
  name: string;
}
```

### Type

很适合 union：

```typescript
type Priority =
  | "low"
  | "medium"
  | "high"
  | "critical";
```

初期不用陷入“哪个更高级”。

---

## 六、Union Type

业务状态不要简单写：

```typescript
status: string
```

否则这些都合法：

```text
abc
hello
wrong_status
```

更合理：

```typescript
type ProjectStatus =
  | "planning"
  | "implementing"
  | "testing"
  | "go_live"
  | "completed";
```

这等于把“允许状态”写进类型系统。

---

## 七、Literal Type

```typescript
type Role =
  | "admin"
  | "manager"
  | "engineer";
```

每个字符串就是 literal type。

---

## 八、Optional 与 Nullable 不一样

### Optional

```typescript
description?: string;
```

字段可以不存在。

### Nullable

```typescript
description: string | null;
```

字段存在，但值可以 null。

数据库建模时二者区别很重要。

---

## 九、Function Types

```typescript
function calculateProgress(
  completed: number,
  total: number
): number {
  if (total === 0) return 0;
  return completed / total * 100;
}
```

类型告诉你：

```text
输入 number + number
输出 number
```

---

## 十、Async Function

```typescript
async function getProjects():
  Promise<Project[]> {
  return [];
}
```

读法：

> 这是异步函数，最终 resolve 为 Project 数组。

```typescript
Promise<Project | null>
```

表示：

> 最终得到 Project 或 null。

---

## 十一、Type Narrowing

类型可能是：

```typescript
string | null
```

先判断：

```typescript
if (name === null) {
  return;
}

console.log(name.toUpperCase());
```

判断之后，TypeScript 能缩小类型范围。

这叫 narrowing。

常见 narrowing：

- typeof
- instanceof
- ===
- in
- truthy checks

---

## 十二、Discriminated Union

对业务工作流非常有用。

```typescript
type SaveResult =
  | {
      success: true;
      projectId: string;
    }
  | {
      success: false;
      error: string;
    };
```

使用：

```typescript
if (result.success) {
  console.log(result.projectId);
} else {
  console.error(result.error);
}
```

这比：

```typescript
{
  success: boolean;
  projectId?: string;
  error?: string;
}
```

更能表达真实业务状态。

---

## 十三、Generics

泛型不是为了炫技，而是：

> 在保持类型信息的同时复用结构。

```typescript
interface ApiResponse<T> {
  data: T;
  error: string | null;
}
```

使用：

```typescript
ApiResponse<Project[]>
```

T 在这里变成 Project[]。

---

## 十四、常见 Utility Types

### Partial

```typescript
Partial<Project>
```

把所有字段变成 optional。

适合部分更新，但不要滥用做所有 DTO。

### Pick

```typescript
Pick<Project, "id" | "name">
```

只保留指定字段。

### Omit

```typescript
Omit<Project, "createdAt">
```

排除字段。

### Record

```typescript
Record<ProjectStatus, string>
```

例如状态显示名映射。

---

## 十五、unknown 与 any

### any

```typescript
const value: any = ...
```

基本关闭类型检查。

AI 很喜欢为了“消红线”使用 any。

这很危险。

### unknown

```typescript
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

unknown 强迫你先确认类型。

原则：

> 外部不可信输入优先 unknown，而不是 any。

---

## 十六、never

```typescript
function assertNever(value: never): never {
  throw new Error("Unexpected value");
}
```

可以用于状态穷尽检查。

例如新增状态后编译器提醒：

> 你有分支没有处理。

---

## 十七、Type Assertion 的风险

```typescript
const project = data as Project;
```

这不是验证。

它只是告诉 TypeScript：

> 相信我，它就是 Project。

如果 API 返回垃圾数据，runtime 仍然可能出错。

所以外部输入需要 runtime validation。

以后可以接触：

- Zod
- Valibot
- ArkType 等

例如：

```text
TypeScript = 编译期
Zod 等 = 运行期输入验证
```

---

## 十八、数据库类型与应用类型

数据库：

```text
projects
id uuid
organization_id uuid
name text
status text
go_live_date date null
```

应用：

```typescript
interface Project {
  id: string;
  organizationId: string;
  name: string;
  status: ProjectStatus;
  goLiveDate: string | null;
}
```

要意识到：

> 数据库 schema、API contract、TypeScript type 应尽量保持一致。

---

## 十九、编译器配置

`tsconfig.json` 决定 TypeScript 怎么检查。

特别重要：

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

对于商用项目，建议尽量保持 strict。

---

## 二十、常见 AI 代码坏味道

### 大量 any

### 大量 as

```typescript
as Project
as unknown as User
```

### 为了通过编译使用 @ts-ignore

### 类型与数据库字段不一致

### optional 到处泛滥

### 一个类型承担多个业务状态

---

## 二十一、业务建模练习

定义：

### IssuePriority

```text
low
medium
high
critical
```

### IssueStatus

```text
open
in_progress
resolved
closed
```

### Issue

字段：

- id
- organizationId
- projectId
- title
- description
- priority
- status
- assignedTo
- createdAt

然后实现：

```typescript
function isIssueClosed(
  issue: Issue
): boolean
```

---

## 二十二、AI Debug Prompt

遇到 TypeScript 错误：

```text
不要直接修改。

解释这个 TypeScript Error：
1. Expected type
2. Actual type
3. 为什么不兼容
4. 数据模型是否有问题
5. 有哪些修复方式
6. 哪个修复最符合业务语义
```

---

## 二十三、本章验收

你应该理解：

- static type checking
- inference
- interface
- union
- optional vs null
- narrowing
- generic
- utility type
- unknown vs any
- assertion 不是 validation
- tsconfig strict 的意义

看到：

```typescript
async function getProject(
  id: string
): Promise<Project | null>
```

应该能立即解释。

## 推荐资料

- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- Everyday Types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- Narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- Generics: https://www.typescriptlang.org/docs/handbook/2/generics.html
