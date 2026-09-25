// Lab 01.2 — Array 方法

const projects = [
  {
    id: "p1",
    name: "Hospital A HIS",
    status: "active",
    progress: 60,
  },
  {
    id: "p2",
    name: "Hospital B LIS",
    status: "completed",
    progress: 100,
  },
  {
    id: "p3",
    name: "Hospital C PACS",
    status: "active",
    progress: 30,
  },
];

// filter: 多个
const activeProjects = projects.filter(
  (project) => project.status === "active"
);

console.log("active:", activeProjects);

// find: 第一个
const target = projects.find(
  (project) => project.id === "p2"
);

console.log("p2:", target);

// map: 转换
const summaries = projects.map((project) => ({
  id: project.id,
  label: `${project.name} (${project.progress}%)`,
}));

console.log("summaries:", summaries);

// some: 至少一个
const hasIncomplete = projects.some(
  (project) => project.progress < 100
);

console.log("has incomplete:", hasIncomplete);

// every: 全部
const allHaveNames = projects.every(
  (project) => Boolean(project.name)
);

console.log("all have names:", allHaveNames);

// reduce: 汇总
const averageProgress =
  projects.reduce(
    (sum, project) => sum + project.progress,
    0
  ) / projects.length;

console.log("average progress:", averageProgress);

// 思考：filter/map 会修改原 projects 吗？
console.log("original:", projects);
