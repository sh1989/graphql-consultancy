import { getCompetenciesForDeveloper } from './api';
import { toRole } from './role';

class Developer {
  constructor(id, name, role) {
    this.id = id;
    this.name = name;
    this.role = toRole(role);
  }

  competencies({ top }, ctx) {
    return getCompetenciesForDeveloper(this.id, ctx, top);
  }

  project(obj, ctx) {
    return ctx.loaders.projectAssignments.load(this.id);
  }
}

export default Developer;
