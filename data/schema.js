import { buildSchema } from 'graphql';
import {
  getDeveloper, getDevelopers, getProject, getProjects, getSkill, getSkills
} from './api';

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
    competencies(top: Int): [Competency],
    role: Role,
    project: Project
  }

  enum Role {
    GRAD, DEV, SENIOR, LEAD
  }

  type Skill {
    id: String!,
    name: String
  }

  enum Order {
    ASCENDING, DESCENDING
  }

  type Query {
    developer(id: String!): Developer,
    developers(assigned: Boolean): [Developer],
    project(id: String!): Project
    projects: [Project],
    skill(id: String!) : Skill
    skills(order: Order = ASCENDING) : [Skill]
  }
`);

export const rootValue = {
  developer: ({ id }, ctx) => getDeveloper(ctx, id),
  developers: ({ assigned }, ctx) => getDevelopers(ctx, assigned),
  project: ({ id }, ctx) => getProject(ctx, id),
  projects: (obj, ctx) => getProjects(ctx),
  skill: ({ id }, ctx) => getSkill(ctx, id),
  skills: ({ order }, ctx) => getSkills(ctx, order)
};
