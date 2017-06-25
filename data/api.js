import { developers, projects } from './database';

export const getDevelopers = () => developers;
export const getProjects = () => projects;

export const getProject = id => projects.find(p => p.id === id);
