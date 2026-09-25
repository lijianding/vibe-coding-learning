import { ProjectFilter } from "../../components/project-filter";
import { getProjectsForOrganization } from "../../lib/projects";

export default async function ProjectsPage() {
  // 教学阶段写死 org-a。
  // 真实 SaaS 应从受信任 Session +
  // Membership 中解析当前 Organization。
  const currentOrganizationId = "org-a";

  const projects =
    await getProjectsForOrganization(
      currentOrganizationId
    );

  return (
    <main className="page">
      <p className="eyebrow">
        Server Component
      </p>
      <h1>Projects</h1>

      <p>
        数据在服务器读取，然后作为可序列化
        Props 传给 Client Component。
      </p>

      <ProjectFilter
        projects={projects}
      />
    </main>
  );
}
