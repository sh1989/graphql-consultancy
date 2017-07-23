import Competency from './competency';
import Developer from './developer';
import Project from './project';

export const getDevelopers = ctx =>
  ctx.db.all('SELECT id, name, role FROM developer')
  .then(result => result.map(r => new Developer(r.id, r.name, r.role)));

export const getProjects = ctx =>
  ctx.db.all('SELECT id, name, description FROM project')
  .then(result => result.map(r => new Project(r.id, r.name, r.description)));

export const getProjectAssignment = (id, ctx) =>
  ctx.db.get('SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id', { $id: id })
  .then(result => new Project(result.projectId, result.name, result.description));

export const getCompetenciesForDeveloper = (id, ctx) =>
  ctx.db.all(
     `SELECT s.name, c.value FROM competencies c LEFT JOIN skill s ON (c.skillId = s.id) WHERE c.developerId = $id`,
    { $id: id })
    .then(result => result.map(r => new Competency(r.name, r.value)));
