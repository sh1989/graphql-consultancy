import { getCompetenciesForDeveloper, getProjectAssignment } from './api';
import { toRole } from './role';

class Developer {
  constructor(id, name, role) {
    this.id = id;
    this.name = name;
    this.role = toRole(role);
  }

  competencies(obj, ctx) {
    return new Promise(resolve => {
      resolve(getCompetenciesForDeveloper(this.id, ctx));
    });
  }

  project(obj, ctx) {
    return new Promise(resolve => {
      resolve(getProjectAssignment(this.id, ctx));
    });
  }
}

export default Developer;
