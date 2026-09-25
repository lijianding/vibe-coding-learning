// JavaScript 练习
// 要求：先自己写，不要看 solutions.js

const tasks = [
  {
    id: "t1",
    title: "Install database",
    status: "done",
    priority: "high",
    overdue: false,
  },
  {
    id: "t2",
    title: "Interface test",
    status: "in_progress",
    priority: "critical",
    overdue: true,
  },
  {
    id: "t3",
    title: "User training",
    status: "todo",
    priority: "medium",
    overdue: false,
  },
  {
    id: "t4",
    title: "Go-live check",
    status: "done",
    priority: "critical",
    overdue: false,
  },
];

// TODO 1:
// 使用 filter 得到所有 critical tasks.
const criticalTasks = [];

// TODO 2:
// 使用 find 找到第一个 overdue task.
const firstOverdueTask = undefined;

// TODO 3:
// 使用 some 判断是否存在 overdue.
const hasOverdueTask = false;

// TODO 4:
// 使用 every 判断是否所有 task 都 done.
const allDone = false;

// TODO 5:
// 使用 map 得到：
// [{ id: "t1", title: "..." }, ...]
const taskSummaries = [];

// TODO 6:
// 计算 done 的完成率百分比。
// 期望：50
const completionRate = 0;

console.log({
  criticalTasks,
  firstOverdueTask,
  hasOverdueTask,
  allDone,
  taskSummaries,
  completionRate,
});

// TODO 7:
// 写一个 async function fakeLoadIssues()
// 500ms 后返回：
// [{ id: "i1", status: "open" }]
//
// 再写 loadIssuesSafe():
// - try/catch
// - 成功返回数组
// - 失败返回 []
