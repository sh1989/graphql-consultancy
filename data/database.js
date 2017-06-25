import Competency from './competency';
import Developer from './developer';
import Project from './project';

export const roles = {
  'GRAD': 'GRAD',
  'DEV': 'DEV',
  'SENIOR': 'SENIOR',
  'LEAD': 'LEAD'
};

export const projects = [
  new Project('1', 'Facelift', 'Redesign of the UI'),
  new Project('2', 'Trader 2G', 'The second generation of the trading platform'),
  new Project('3', 'Market Data', 'Implementation of market data API')
];

export const developers = [
  new Developer('1', 'Sam', [ new Competency('JavaScript', '8'), new Competency('C#', '7') ], roles.SENIOR, '1'),
  new Developer('2', 'Gary', [ new Competency('Java', '6'), new Competency('C++', '8') ], roles.LEAD, '2'),
  new Developer('3', 'Chris', [ new Competency('Java', '7'), new Competency('JavaScript', '6') ], roles.DEV, '3')
];
