import { buildSchema } from 'graphql';
import { getDevelopers, getProjects } from './api';

export const schema = buildSchema(`
  type Project {
    id: String!,
    name: String,
    description: String
  }

  type Competency {
    name: String,
    rating: Int
  }

  type Developer {
    id: String!,
    name: String,
    competencies: [Competency],
    role: Role,
    project: Project
  }

  enum Role {
    GRAD, DEV, SENIOR, LEAD
  }

  type Query {
    developers: [Developer],
    projects: [Project]
  }
`);

export const rootValue = {
  developers: (obj, ctx) => getDevelopers(ctx),
  projects: (obj, ctx) => getProjects(ctx)
};
