export type ProjectStatus =
  | "planning"
  | "active"
  | "completed";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  organizationId: string;
}

const projects: Project[] = [
  {
    id: "p1",
    name: "Hospital A HIS Upgrade",
    status: "active",
    organizationId: "org-a",
  },
  {
    id: "p2",
    name: "Hospital A LIS Interface",
    status: "planning",
    organizationId: "org-a",
  },
  {
    id: "p3",
    name: "Hospital B PACS Upgrade",
    status: "completed",
    organizationId: "org-b",
  },
];

// 这里模拟 Data Access Layer。
// 后续把数组替换为数据库查询。
// 注意：当前只是教学示例，不是真实授权。
export async function getProjectsForOrganization(
  organizationId: string
): Promise<Project[]> {
  return projects.filter(
    (project) =>
      project.organizationId === organizationId
  );
}
