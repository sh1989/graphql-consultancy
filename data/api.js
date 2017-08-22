import Competency from './competency';
import Developer from './developer';
import Project from './project';
import Skill from './skill';

export const getDeveloper = (ctx, id) =>
  ctx.db.get('SELECT id, name, role FROM developer WHERE id = $id', { $id: id })
  .then(result => result ?
      new Developer(result.id, result.name, result.role) :
      new Error(`No developer exists with id ${id}`));

export const getDevelopers = (ctx, assigned) => {
  const subquery = assigned === undefined ?
    '' :
    `${assigned ? 'WHERE' : 'WHERE NOT'} EXISTS (SELECT a.developerId FROM assignments a WHERE a.developerId = d.id)`;
  const query = `SELECT d.id, d.name, d.role FROM developer d ${subquery}`;

  return ctx.db.all(query)
  .then(result => result.map(r => new Developer(r.id, r.name, r.role)));
};

export const getProject = (ctx, id) =>
  ctx.db.get('SELECT id, name, description FROM project WHERE id = $id', { $id: id })
  .then(result => result ?
    new Project(result.id, result.name, result.description) :
    new Error(`No project exists with id ${id}`));

export const getProjects = ctx =>
  ctx.db.all('SELECT id, name, description FROM project')
  .then(result => result.map(r => new Project(r.id, r.name, r.description)));

export const getProjectAssignment = (id, ctx) =>
  ctx.db.get('SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id', { $id: id })
  .then(result => new Project(result.projectId, result.name, result.description));

export const getCompetenciesForDeveloper = (id, ctx, top) => {
  if (top < 0) {
    throw new Error('top cannot be negative');
  }
  const limit = top ? `LIMIT ${top}` : '';
  return ctx.db.all(
     `SELECT s.name, c.value FROM competencies c LEFT JOIN skill s ON (c.skillId = s.id) WHERE c.developerId = $id ORDER BY c.value DESC ${limit}`,
    { $id: id })
    .then(result => result.map(r => new Competency(r.name, r.value)));
};

export const getSkills = (ctx, order) =>
  ctx.db.all(`SELECT id, name FROM skill ORDER BY name ${order === 'DESCENDING' ? 'DESC' : 'ASC'}`)
  .then(result => result.map(r => new Skill(r.id, r.name)));
