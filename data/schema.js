import { buildSchema } from 'graphql';
import {
  createDeveloper, createProject, createSkill,
  removeDeveloper, removeProject,
  editRole, setProject, setCompetency,
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

  input DeveloperInput {
    name: String!,
    role: Role!
  }

  input DeleteDeveloperInput {
    id: String!
  }

  input ProjectInput {
    name: String!,
    description: String!
  }

  input DeleteProjectInput {
    id: String!
  }

  input SkillInput {
    name: String!
  }

  input AssignCompetencyInput {
    developer: String!,
    skill: String!,
    rating: Int!
  }

  input AssignProjectInput {
    developer: String!,
    project: String!
  }

  input AssignRoleInput {
    developer: String!,
    role: Role!
  }

  type Query {
    developer(id: String!): Developer,
    developers(assigned: Boolean): [Developer],
    project(id: String!): Project
    projects: [Project],
    skill(id: String!) : Skill
    skills(order: Order = ASCENDING) : [Skill]
  }

  type Mutation {
    addDeveloper(input: DeveloperInput!) : Developer,
    deleteDeveloper(input: DeleteDeveloperInput!) : String,
    addProject(input: ProjectInput!) : Project,
    deleteProject(input: DeleteProjectInput!) : String,
    addSkill(input: SkillInput!) : Skill,
    assignCompetency(input: AssignCompetencyInput!) : Developer,
    assignProject(input: AssignProjectInput!) : Developer,
    assignRole(input: AssignRoleInput!) : Developer
  }
`);

export const rootValue = {
  developer: ({ id }, ctx) => getDeveloper(ctx, id),
  developers: ({ assigned }, ctx) => getDevelopers(ctx, assigned),
  project: ({ id }, ctx) => getProject(ctx, id),
  projects: (obj, ctx) => getProjects(ctx),
  skill: ({ id }, ctx) => getSkill(ctx, id),
  skills: ({ order }, ctx) => getSkills(ctx, order),
  addDeveloper: ({ input }, ctx) => createDeveloper(ctx, input),
  deleteDeveloper: ({ input }, ctx) => removeDeveloper(ctx, input),
  addProject: ({ input }, ctx) => createProject(ctx, input),
  deleteProject: ({ input }, ctx) => removeProject(ctx, input),
  addSkill: ({ input }, ctx) => createSkill(ctx, input),
  assignCompetency: ({ input }, ctx) => setCompetency(ctx, input),
  assignProject: ({ input }, ctx) => setProject(ctx, input),
  assignRole: ({ input }, ctx) => editRole(ctx, input)
};
