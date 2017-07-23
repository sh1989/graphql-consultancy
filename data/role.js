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

export const toRole = val => roleMappings[val];

export default Role;
