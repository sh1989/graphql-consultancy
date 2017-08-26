const Role = {
  GRAD: 'GRAD',
  DEV: 'DEV',
  SENIOR: 'SENIOR',
  LEAD: 'LEAD'
};

const roleMappings = {
  0: Role.GRAD,
  1: Role.DEV,
  2: Role.SENIOR,
  3: Role.LEAD
};

const idMappings = {
  [Role.GRAD]: 0,
  [Role.DEV]: 1,
  [Role.SENIOR]: 2,
  [Role.LEAD]: 3
};

export const toRole = val => roleMappings[val];
export const fromRole = val => idMappings[val];

export default Role;
