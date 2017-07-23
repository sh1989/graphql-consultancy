-- Up
CREATE TABLE project (
  id INTEGER PRIMARY KEY,
  name TEXT,
  description TEXT
);
CREATE TABLE developer (
  id INTEGER PRIMARY KEY,
  name TEXT,
  role INT
);
CREATE TABLE skill (
  id INTEGER PRIMARY KEY,
  name TEXT
);
CREATE TABLE assignments (
  developerId INTEGER,
  projectId INTEGER,
  FOREIGN KEY(developerId) REFERENCES developer(id) ON DELETE CASCADE,
  FOREIGN KEY(projectId) REFERENCES project(id) ON DELETE CASCADE,
  PRIMARY KEY(developerId)
);
CREATE TABLE competencies (
  developerId INTEGER,
  skillId INTEGER,
  value INTEGER,
  FOREIGN KEY(developerId) REFERENCES developer(id) ON DELETE CASCADE,
  FOREIGN KEY(skillId) REFERENCES skill(id) ON DELETE CASCADE,
  PRIMARY KEY(developerId, skillId)
);

INSERT INTO project (id, name, description) VALUES (1, 'Facelift', 'Redesign of the UI');
INSERT INTO project (id, name, description) VALUES (2, 'Trader 2G', 'The second generation of the trading platform');
INSERT INTO project (id, name, description) VALUES (3, 'Market Data', 'Implementation of market data API');

INSERT INTO developer (id, name, role) VALUES (1, 'Sam', 1);
INSERT INTO developer (id, name, role) VALUES (2, 'Gary', 2);
INSERT INTO developer (id, name, role) VALUES (3, 'Chris', 3);

INSERT INTO skill (id, name) VALUES (1, 'JavaScript');
INSERT INTO skill (id, name) VALUES (2, 'C#');
INSERT INTO skill (id, name) VALUES (3, 'Java');
INSERT INTO skill (id, name) VALUES (4, 'C++');

INSERT INTO assignments (developerId, projectId) VALUES (1, 1);
INSERT INTO assignments (developerId, projectId) VALUES (2, 2);
INSERT INTO assignments (developerId, projectId) VALUES (3, 3);

INSERT INTO competencies (developerId, skillId, value) VALUES (1, 1, 8);
INSERT INTO competencies (developerId, skillId, value) VALUES (1, 2, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (2, 3, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (2, 4, 8);
INSERT INTO competencies (developerId, skillId, value) VALUES (3, 3, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (3, 1, 6);

-- Down
DROP TABLE project;
DROP TABLE developer;
DROP TABLE skill;
DROP TABLE assignments;
DROP TABLE competencies;
