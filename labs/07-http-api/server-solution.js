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

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

const server = http.createServer(
  async (request, response) => {
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

    const projectMatch =
      url.pathname.match(/^\/projects\/([^/]+)$/);

    if (
      request.method === "GET" &&
      projectMatch
    ) {
      const id = projectMatch[1];

      const project = projects.find(
        (item) => item.id === id
      );

      if (!project) {
        return sendJson(
          response,
          404,
          {
            error: {
              code: "PROJECT_NOT_FOUND",
              message: "Project not found",
            },
          }
        );
      }

      return sendJson(
        response,
        200,
        { data: project }
      );
    }

    if (
      request.method === "POST" &&
      url.pathname === "/projects"
    ) {
      let input;

      try {
        input = await readJson(request);
      } catch {
        return sendJson(
          response,
          400,
          {
            error: {
              code: "INVALID_JSON",
              message: "Request body must be valid JSON",
            },
          }
        );
      }

      if (
        typeof input.name !== "string" ||
        input.name.trim() === ""
      ) {
        return sendJson(
          response,
          400,
          {
            error: {
              code: "PROJECT_NAME_REQUIRED",
              message: "Project name is required",
            },
          }
        );
      }

      const project = {
        id: `p${projects.length + 1}`,
        name: input.name.trim(),
      };

      projects.push(project);

      return sendJson(
        response,
        201,
        { data: project }
      );
    }

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
  }
);

server.listen(3001, () => {
  console.log(
    "Solution API: http://localhost:3001"
  );
});
