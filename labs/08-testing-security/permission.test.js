const {
  describe,
  it,
  expect,
} = require("vitest");

const {
  canReadProject,
  canDeleteProject,
} = require("./permission");

const projectA = {
  id: "p-a",
  organizationId: "org-a",
};

const adminA = {
  id: "u-admin-a",
  organizationId: "org-a",
  role: "org_admin",
};

const engineerA = {
  id: "u-eng-a",
  organizationId: "org-a",
  role: "engineer",
};

const adminB = {
  id: "u-admin-b",
  organizationId: "org-b",
  role: "org_admin",
};

describe("project authorization", () => {
  it("allows same-tenant admin to read", () => {
    expect(
      canReadProject(adminA, projectA)
    ).toBe(true);
  });

  it("allows same-tenant engineer to read", () => {
    expect(
      canReadProject(engineerA, projectA)
    ).toBe(true);
  });

  it("denies cross-tenant admin", () => {
    expect(
      canReadProject(adminB, projectA)
    ).toBe(false);
  });

  it("allows org admin to delete same-tenant project", () => {
    expect(
      canDeleteProject(adminA, projectA)
    ).toBe(true);
  });

  it("denies engineer delete", () => {
    expect(
      canDeleteProject(engineerA, projectA)
    ).toBe(false);
  });

  it("denies cross-tenant delete even for admin", () => {
    expect(
      canDeleteProject(adminB, projectA)
    ).toBe(false);
  });
});
