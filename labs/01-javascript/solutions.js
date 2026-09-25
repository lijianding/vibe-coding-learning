// JavaScript 参考答案
// 建议做完 exercises.js 后再看。

const tasks = [
  { id: "t1", title: "Install database", status: "done", priority: "high", overdue: false },
  { id: "t2", title: "Interface test", status: "in_progress", priority: "critical", overdue: true },
  { id: "t3", title: "User training", status: "todo", priority: "medium", overdue: false },
  { id: "t4", title: "Go-live check", status: "done", priority: "critical", overdue: false },
];

const criticalTasks = tasks.filter(
  (task) => task.priority === "critical"
);

const firstOverdueTask = tasks.find(
  (task) => task.overdue
);

const hasOverdueTask = tasks.some(
  (task) => task.overdue
);

const allDone = tasks.every(
  (task) => task.status === "done"
);

const taskSummaries = tasks.map(
  ({ id, title }) => ({ id, title })
);

const doneCount = tasks.filter(
  (task) => task.status === "done"
).length;

const completionRate =
  tasks.length === 0
    ? 0
    : (doneCount / tasks.length) * 100;

function sleep(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

async function fakeLoadIssues() {
  await sleep(500);
  return [{ id: "i1", status: "open" }];
}

async function loadIssuesSafe() {
  try {
    return await fakeLoadIssues();
  } catch (error) {
    console.error(error);
    return [];
  }
}

console.log({
  criticalTasks,
  firstOverdueTask,
  hasOverdueTask,
  allDone,
  taskSummaries,
  completionRate,
});

loadIssuesSafe().then(console.log);
