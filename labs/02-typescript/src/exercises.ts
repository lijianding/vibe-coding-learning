// TODO：不要先看 solutions.ts

// 1. 定义 IssuePriority:
// low | medium | high | critical

// 2. 定义 IssueStatus:
// open | in_progress | resolved | closed

// 3. 定义 Issue interface:
// id: string
// organizationId: string
// projectId: string
// title: string
// description?: string
// priority: IssuePriority
// status: IssueStatus
// assignedTo: string | null

// 4. 实现：
// function isIssueClosed(issue: Issue): boolean

// 5. 实现：
// function getAssigneeLabel(issue: Issue): string
// assignedTo === null 时返回 "Unassigned"

// 6. 定义结果类型：
// CloseIssueResult
// 成功：{ success: true; issue: Issue }
// 失败：{ success: false; code: "NOT_FOUND" | "FORBIDDEN" }

// 7. 实现 generic:
// interface ApiResponse<T>
// { data: T; error: string | null }

// 8. 使用 unknown 写：
// function getErrorMessage(error: unknown): string
// Error → error.message
// 其他 → "Unknown error"

console.log("Complete the TODOs, then run npm run check.");
