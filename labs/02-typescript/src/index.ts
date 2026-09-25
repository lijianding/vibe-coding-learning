type ProjectStatus =
  | "planning"
  | "implementing"
  | "testing"
  | "completed";

interface Project {
  id: string;
  organizationId: string;
  name: string;
  status: ProjectStatus;
  goLiveDate: string | null;
  description?: string;
}

const project: Project = {
  id: "p1",
  organizationId: "org-a",
  name: "HIS Upgrade",
  status: "planning",
  goLiveDate: null,
};

function displayGoLiveDate(
  value: string | null
): string {
  if (value === null) {
    return "Not scheduled";
  }

  return value;
}

type SaveResult =
  | {
      success: true;
      projectId: string;
    }
  | {
      success: false;
      error: string;
    };

function printSaveResult(
  result: SaveResult
): void {
  if (result.success) {
    console.log(
      "saved:",
      result.projectId
    );
  } else {
    console.error(
      "failed:",
      result.error
    );
  }
}

interface ApiResponse<T> {
  data: T;
  error: string | null;
}

const response: ApiResponse<Project[]> = {
  data: [project],
  error: null,
};

console.log(project);
console.log(
  displayGoLiveDate(project.goLiveDate)
);
console.log(response);

printSaveResult({
  success: true,
  projectId: project.id,
});
