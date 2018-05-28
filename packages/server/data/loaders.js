import DataLoader from 'dataloader';
import { getDevelopers, getProjectAssignments, getProjects, getSkills } from './api';

const buildLoaders = (db) => {
  const developersLoader = new DataLoader(developerIds => getDevelopers(developerIds, db));
  const projectAssignmentsLoader = new DataLoader(developerIds => getProjectAssignments(developerIds, db));
  const projectsLoader = new DataLoader(projectIds => getProjects(projectIds, db));
  const skillsLoader = new DataLoader(skillIds => getSkills(skillIds, db));
  return {
    developers: developersLoader,
    projectAssignments: projectAssignmentsLoader,
    projects: projectsLoader,
    skills: skillsLoader
  };
};

export default buildLoaders;
