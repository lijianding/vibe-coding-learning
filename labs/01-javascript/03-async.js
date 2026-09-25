// Lab 01.3 — Promise / async / await

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fakeDatabaseQuery() {
  console.log("query started");

  await sleep(500);

  console.log("query completed");

  return [
    { id: "p1", name: "Hospital A" },
    { id: "p2", name: "Hospital B" },
  ];
}

async function loadProjects() {
  try {
    console.log("before await");

    const projects = await fakeDatabaseQuery();

    console.log("after await");

    return projects;
  } catch (error) {
    console.error("load failed:", error);
    return [];
  }
}

console.log("A");

loadProjects().then((projects) => {
  console.log("projects:", projects);
});

console.log("B");

// 运行前先预测日志顺序。
// 思考：为什么 B 在 query completed 之前？
