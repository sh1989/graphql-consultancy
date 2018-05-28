import Competency from './competency';
import Developer from './developer';
import Project from './project';
import Skill from './skill';
import { fromRole } from './role';

const whereIdsIn = (db, selection, ids, responseTransformer, errorMessage) =>
  db.all(
    `${selection} (${ids.map(() => '?').join()})`,
    ids
  ).then(rows => ids.map(
    id => {
      const entry = rows.find(row => row.id && row.id.toString() === id);
      return entry ? responseTransformer(entry) : new Error(`${errorMessage} ${id}`)
    }
  ));


/* DEVELOPER */
export const getDeveloper = (ctx, id) =>
  ctx.db.get('SELECT id, name, role FROM developer WHERE id = $id', { $id: id })
  .then(result => result ?
      new Developer(result.id.toString(), result.name, result.role) :
      new Error(`No developer exists with id ${id}`));

export const getDevelopers = (ids, db) => whereIdsIn(
  db,
  'SELECT id, name, role FROM developer WHERE id IN',
  ids,
  e => new Developer(e.id.toString(), e.name, e.role),
  'No developer exists with id'
);

export const getAllDevelopers = (ctx, assigned) => {
  const subquery = assigned === undefined ?
    '' :
    `${assigned ? 'WHERE' : 'WHERE NOT'} EXISTS (SELECT a.developerId FROM assignments a WHERE a.developerId = d.id)`;
  const query = `SELECT d.id, d.name, d.role FROM developer d ${subquery}`;

  return ctx.db.all(query)
  .then(result => result.map(r => new Developer(r.id.toString(), r.name, r.role)));
};

export const createDeveloper = (ctx, developer) =>
  ctx.db.run('INSERT INTO developer (name, role) VALUES (?, ?)', developer.name, fromRole(developer.role))
  .then(result => result.changes ?
    getDeveloper(ctx, result.lastID) :
    new Error('Unable to create developer'));

export const removeDeveloper = (ctx, { id }) =>
  ctx.db.run('DELETE FROM developer WHERE id = $id', { $id: id })
  .then(result => result.changes ?
    id :
    new Error(`Unable to delete developer with id ${id}`));

export const editRole = (ctx, roleChange) =>
  ctx.db.run('UPDATE developer SET role = $role WHERE id = $id', { $role: fromRole(roleChange.role), $id: roleChange.developer })
  .then(result => result.changes ?
    getDeveloper(ctx, result.lastID) :
    new Error(`Unable to edit role ${roleChange.role} for develoepr ${roleChange.developer}`));

/* PROJECTS AND ASSIGNMENTS */
export const getProject = (ctx, id) =>
  ctx.db.get('SELECT id, name, description FROM project WHERE id = $id', { $id: id })
  .then(result => result ?
    new Project(result.id.toString(), result.name, result.description) :
    new Error(`No project exists with id ${id}`));

export const getProjects = (ids, db) => whereIdsIn(
  db,
  'SELECT id, name, description FROM project WHERE id IN',
  ids,
  e => new Project(e.id.toString(), e.name, e.description),
  'No project exists with id'
);

export const getAllProjects = ctx =>
  ctx.db.all('SELECT id, name, description FROM project')
  .then(result => result.map(r => new Project(r.id.toString(), r.name, r.description)));

export const createProject = (ctx, project) =>
  ctx.db.run('INSERT INTO project (name, description) VALUES (?, ?)', project.name, project.description)
  .then(result => result.changes ?
    getProject(ctx, result.lastID) :
    new Error('Unable to create project'));

export const removeProject = (ctx, { id }) =>
  ctx.db.run('DELETE FROM project WHERE id = $id', { $id: id })
  .then(result => result.changes ?
    id :
    new Error(`Unable to delete project with id ${id}`));

export const getProjectAssignments = (ids, db) => whereIdsIn(
  db,
  `SELECT d.id, p.id as projectId, p.name, p.description
  FROM developer d
  LEFT JOIN assignments a
  ON (d.id = a.developerId)
  LEFT JOIN project p
  ON (p.id = a.projectId)
  WHERE d.id IN`,
  ids,
  e => e.projectId ? new Project(e.projectId.toString(), e.name, e.description) : null,
  'No Developer exists with id'
);

export const setProject = (ctx, assignment) =>
  ctx.db.run('INSERT OR REPLACE INTO assignments (developerId, projectId) VALUES (?, ?)', assignment.developer, assignment.project)
  .then(result => result.changes ?
    getDeveloper(ctx, result.lastID) :
    new Error(`Unable to assign developer ${assignment.developer} to project ${assignment.project}`));

/* SKILLS AND COMPETENCIES */
export const getSkills = (ids, db) => whereIdsIn(
  db,
  'SELECT id, name FROM skill WHERE id IN',
  ids,
  e => new Skill(e.id.toString(), e.name),
  'No skill exists with id'
);

export const getAllSkills = (ctx, order) =>
  ctx.db.all(`SELECT id, name FROM skill ORDER BY name ${order === 'DESCENDING' ? 'DESC' : 'ASC'}`)
  .then(result => result.map(r => new Skill(r.id, r.name)));

export const createSkill = (ctx, skill) =>
  ctx.db.run('INSERT INTO skill (name) VALUES (?)', skill.name)
  .then(result => result.changes ?
    getSkill(ctx, result.lastID) :
    new Error('Unable to create skill'),
    () => new Error('Unable to create skill'));

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

export const setCompetency = (ctx, assignment) =>
  ctx.db.run('INSERT OR REPLACE INTO competencies (developerId, skillId, value) VALUES (?, ?, ?)', assignment.developer, assignment.skill, assignment.rating)
  .then(result => result.changes ?
    getDeveloper(ctx, assignment.developer) :
    new Error(`Unable to assign developer ${assignment.developer} to skill ${assignment.skill}`));
