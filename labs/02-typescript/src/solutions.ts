type IssuePriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

type IssueStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed";

interface Issue {
  id: string;
  organizationId: string;
  projectId: string;
  title: string;
  description?: string;
  priority: IssuePriority;
  status: IssueStatus;
  assignedTo: string | null;
}

function isIssueClosed(
  issue: Issue
): boolean {
  return issue.status === "closed";
}

function getAssigneeLabel(
  issue: Issue
): string {
  return issue.assignedTo ?? "Unassigned";
}

type CloseIssueResult =
  | {
      success: true;
      issue: Issue;
    }
  | {
      success: false;
      code: "NOT_FOUND" | "FORBIDDEN";
    };

interface ApiResponse<T> {
  data: T;
  error: string | null;
}

function getErrorMessage(
  error: unknown
): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

const issue: Issue = {
  id: "i1",
  organizationId: "org-a",
  projectId: "p1",
  title: "Interface timeout",
  priority: "critical",
  status: "open",
  assignedTo: null,
};

const result: CloseIssueResult = {
  success: false,
  code: "FORBIDDEN",
};

const response: ApiResponse<Issue[]> = {
  data: [issue],
  error: null,
};

console.log({
  isClosed: isIssueClosed(issue),
  assignee: getAssigneeLabel(issue),
  result,
  response,
  error: getErrorMessage(
    new Error("demo")
  ),
});
