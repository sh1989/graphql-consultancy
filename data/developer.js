import { getProject } from './api';

class Developer {
  constructor(id, name, competencies, role, projectId) {
    this.id = id;
    this.name = name;
    this.competencies = competencies;
    this.role = role;
    this.projectId = projectId;
  }

  project() {
    return new Promise(resolve => {
      resolve(getProject(this.projectId));
    });
  }
}

export default Developer;
