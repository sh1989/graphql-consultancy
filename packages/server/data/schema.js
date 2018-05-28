import { buildSchema } from 'graphql';
import {
  createDeveloper, createProject, createSkill,
  removeDeveloper, removeProject,
  editRole, setProject, setCompetency,
  getAllDevelopers, getAllProjects, getAllSkills
} from './api';

export const schema = buildSchema(`
  interface Named {
    id: String!,
    name: String
  }

  # A contracted order of work
  type Project implements Named {
    id: String!,
    name: String,
    description: String
  }

  # A quantified piece of knowledge
  type Competency {
    name: String,
    rating: Int
  }

  # An employee who performs software development
  type Developer implements Named {
    id: String!,
    name: String,
    competencies(top: Int): [Competency],
    role: Role,
    project: Project
  }

  # A position within the company
  enum Role {
    GRAD, JUNIOR, SENIOR, LEAD
  }

  # A category of knowledge
  type Skill implements Named {
    id: String!,
    name: String
  }

  # An alphabetical ordering direction
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

  type Schema {
    query: Query,
    mutation: Mutation
  }
`);

export const rootValue = {
  developer: ({ id }, ctx) => ctx.loaders.developers.load(id),
  developers: ({ assigned }, ctx) => getAllDevelopers(ctx, assigned),
  project: ({ id }, ctx) => ctx.loaders.projects.load(id),
  projects: (obj, ctx) => getAllProjects(ctx),
  skill: ({ id }, ctx) => ctx.loaders.skills.load(id),
  skills: ({ order }, ctx) => getAllSkills(ctx, order),
  addDeveloper: ({ input }, ctx) => createDeveloper(ctx, input),
  deleteDeveloper: ({ input }, ctx) => removeDeveloper(ctx, input),
  addProject: ({ input }, ctx) => createProject(ctx, input),
  deleteProject: ({ input }, ctx) => removeProject(ctx, input),
  addSkill: ({ input }, ctx) => createSkill(ctx, input),
  assignCompetency: ({ input }, ctx) => setCompetency(ctx, input),
  assignProject: ({ input }, ctx) => setProject(ctx, input),
  assignRole: ({ input }, ctx) => editRole(ctx, input)
};
