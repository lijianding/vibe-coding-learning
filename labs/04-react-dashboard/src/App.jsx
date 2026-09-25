import { useMemo, useState } from "react";
import { projects } from "./data.js";

function StatCard({ label, value }) {
  return (
    <article className="card">
      <div className="muted">{label}</div>
      <strong>{value}</strong>
    </article>
  );
}

function ProjectRow({ project }) {
  return (
    <tr>
      <td>{project.name}</td>
      <td>{project.status}</td>
      <td>{project.progress}%</td>
      <td>{project.overdueTasks}</td>
    </tr>
  );
}

export default function App() {
  const [status, setStatus] = useState("all");

  const visibleProjects = useMemo(() => {
    if (status === "all") return projects;

    return projects.filter(
      (project) => project.status === status
    );
  }, [status]);

  const activeCount = projects.filter(
    (project) => project.status === "active"
  ).length;

  const overdueCount = projects.reduce(
    (sum, project) =>
      sum + project.overdueTasks,
    0
  );

  return (
    <main className="page">
      <header className="header">
        <div>
          <p className="eyebrow">React Lab</p>
          <h1>Implementation Dashboard</h1>
        </div>

        <label>
          Status
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option value="all">All</option>
            <option value="planning">
              Planning
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
          </select>
        </label>
      </header>

      <section className="stats">
        <StatCard
          label="Projects"
          value={projects.length}
        />
        <StatCard
          label="Active"
          value={activeCount}
        />
        <StatCard
          label="Overdue tasks"
          value={overdueCount}
        />
      </section>

      <section className="panel">
        <h2>Projects</h2>

        {visibleProjects.length === 0 ? (
          <p>No projects match this filter.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Overdue</th>
              </tr>
            </thead>
            <tbody>
              {visibleProjects.map(
                (project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                  />
                )
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
