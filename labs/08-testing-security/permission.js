function canReadProject(user, project) {
  if (!user || !project) {
    return false;
  }

  if (
    user.organizationId !==
    project.organizationId
  ) {
    return false;
  }

  return [
    "org_admin",
    "project_manager",
    "engineer",
    "customer",
  ].includes(user.role);
}

function canDeleteProject(user, project) {
  if (!canReadProject(user, project)) {
    return false;
  }

  return user.role === "org_admin";
}

module.exports = {
  canReadProject,
  canDeleteProject,
};
