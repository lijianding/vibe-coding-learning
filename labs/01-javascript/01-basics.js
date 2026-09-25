// Lab 01.1 — JavaScript 基础

const project = {
  id: "p1",
  name: "HIS Upgrade",
  status: "planning",
  manager: {
    id: "u1",
    name: "Alice",
  },
};

console.log("project name:", project.name);

// 解构
const { id, name, status } = project;
console.log({ id, name, status });

// Optional chaining
console.log("manager:", project.manager?.name);
console.log("customer:", project.customer?.name);

// Nullish coalescing
const displayCustomer =
  project.customer?.name ?? "Not assigned";
console.log("display customer:", displayCustomer);

// === 不做隐式类型转换
console.log('"1" == 1:', "1" == 1);
console.log('"1" === 1:', "1" === 1);

// mutation
const sameProject = project;
sameProject.status = "active";

console.log("project.status after mutation:", project.status);

// immutable update
const completedProject = {
  ...project,
  status: "completed",
};

console.log("old object:", project.status);
console.log("new object:", completedProject.status);
console.log(
  "same reference?",
  project === completedProject
);

// 思考：为什么修改 sameProject 后 project 也变化？
// 思考：为什么 completedProject 不会修改 project？
