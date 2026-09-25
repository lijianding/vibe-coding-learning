import { getProjectsForOrganization } from "../../../lib/projects";

export async function GET() {
  // 这里只是 Route Handler 结构演示。
  // 真实系统不能从客户端随便相信 tenant id。
  const currentOrganizationId = "org-a";

  const projects =
    await getProjectsForOrganization(
      currentOrganizationId
    );

  return Response.json({
    data: projects,
  });
}
