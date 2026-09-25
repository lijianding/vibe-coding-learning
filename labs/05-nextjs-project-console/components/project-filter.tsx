"use client";

import { useState } from "react";
import type {
  Project,
  ProjectStatus,
} from "../lib/projects";

type FilterValue =
  | "all"
  | ProjectStatus;

export function ProjectFilter({
  projects,
}: {
  projects: Project[];
}) {
  const [status, setStatus] =
    useState<FilterValue>("all");

  const visibleProjects =
    status === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.status === status
        );

  return (
    <section>
      <label>
        Status
        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as FilterValue
            )
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

      {visibleProjects.length === 0 ? (
        <p>No projects.</p>
      ) : (
        <ul>
          {visibleProjects.map(
            (project) => (
              <li key={project.id}>
                <strong>
                  {project.name}
                </strong>
                {" — "}
                {project.status}
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
}
