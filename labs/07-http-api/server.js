const http = require("node:http");

let projects = [
  {
    id: "p1",
    name: "Hospital A HIS Upgrade",
  },
];

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
  });

  response.end(JSON.stringify(body));
}

const server = http.createServer((request, response) => {
  const url = new URL(
    request.url,
    "http://localhost:3001"
  );

  if (
    request.method === "GET" &&
    url.pathname === "/projects"
  ) {
    return sendJson(
      response,
      200,
      { data: projects }
    );
  }

  // TODO:
  // 1. GET /projects/:id
  // 2. POST /projects
  // 3. JSON validation
  // 4. 400/404/201 status

  return sendJson(
    response,
    404,
    {
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
      },
    }
  );
});

server.listen(3001, () => {
  console.log(
    "Starter API: http://localhost:3001"
  );
});
