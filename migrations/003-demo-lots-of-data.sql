-- Up
INSERT INTO project (id, name, description) VALUES (4, 'Geordie Pound', 'A new cryptocurrency for Newcastle local businesses');
INSERT INTO project (id, name, description) VALUES (5, 'Company Website', 'Re-launch the company website');
INSERT INTO project (id, name, description) VALUES (6, 'Breakfast Bot', 'A SlackBot to order some bacon sandwiches');

INSERT INTO developer (id, name, role) VALUES (4, 'Nic', 3);
INSERT INTO developer (id, name, role) VALUES (5, 'Jessica', 2);
INSERT INTO developer (id, name, role) VALUES (6, 'Stu', 0);
INSERT INTO developer (id, name, role) VALUES (7, 'Andrew', 3);
INSERT INTO developer (id, name, role) VALUES (8, 'Marcus', 0);
INSERT INTO developer (id, name, role) VALUES (9, 'Ben', 0);
INSERT INTO developer (id, name, role) VALUES (10, 'Rachel', 1);
INSERT INTO developer (id, name, role) VALUES (11, 'Klaus', 1);
INSERT INTO developer (id, name, role) VALUES (12, 'Ross', 2);

INSERT INTO skill (id, name) VALUES (5, 'AI');
INSERT INTO skill (id, name) VALUES (6, 'Docker');
INSERT INTO skill (id, name) VALUES (7, 'Microservices');
INSERT INTO skill (id, name) VALUES (8, 'Databases');
INSERT INTO skill (id, name) VALUES (9, 'Android');
INSERT INTO skill (id, name) VALUES (10, 'iOS');

INSERT INTO assignments (developerId, projectId) VALUES (4, 3);
INSERT INTO assignments (developerId, projectId) VALUES (5, 5);
INSERT INTO assignments (developerId, projectId) VALUES (7, 4);
INSERT INTO assignments (developerId, projectId) VALUES (10, 5);
INSERT INTO assignments (developerId, projectId) VALUES (11, 6);
INSERT INTO assignments (developerId, projectId) VALUES (12, 6);

INSERT INTO competencies (developerId, skillId, value) VALUES (1, 8, 5);
INSERT INTO competencies (developerId, skillId, value) VALUES (1, 9, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (2, 8, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (3, 7, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (3, 8, 9);
INSERT INTO competencies (developerId, skillId, value) VALUES (3, 10, 5);
INSERT INTO competencies (developerId, skillId, value) VALUES (4, 1, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (4, 2, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (4, 8, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (5, 2, 9);
INSERT INTO competencies (developerId, skillId, value) VALUES (5, 6, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (5, 7, 8);
INSERT INTO competencies (developerId, skillId, value) VALUES (5, 8, 8);
INSERT INTO competencies (developerId, skillId, value) VALUES (6, 1, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (6, 6, 4);
INSERT INTO competencies (developerId, skillId, value) VALUES (7, 1, 5);
INSERT INTO competencies (developerId, skillId, value) VALUES (7, 2, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (7, 3, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (7, 4, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (7, 7, 8);
INSERT INTO competencies (developerId, skillId, value) VALUES (7, 8, 4);
INSERT INTO competencies (developerId, skillId, value) VALUES (8, 1, 8);
INSERT INTO competencies (developerId, skillId, value) VALUES (8, 5, 3);
INSERT INTO competencies (developerId, skillId, value) VALUES (8, 6, 4);
INSERT INTO competencies (developerId, skillId, value) VALUES (8, 10, 5);
INSERT INTO competencies (developerId, skillId, value) VALUES (9, 1, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (9, 3, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (9, 8, 5);
INSERT INTO competencies (developerId, skillId, value) VALUES (9, 9, 5);
INSERT INTO competencies (developerId, skillId, value) VALUES (10, 1, 8);
INSERT INTO competencies (developerId, skillId, value) VALUES (10, 2, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (10, 7, 4);
INSERT INTO competencies (developerId, skillId, value) VALUES (11, 4, 8);
INSERT INTO competencies (developerId, skillId, value) VALUES (11, 5, 8);
INSERT INTO competencies (developerId, skillId, value) VALUES (11, 8, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (12, 1, 7);
INSERT INTO competencies (developerId, skillId, value) VALUES (12, 3, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (12, 8, 6);
INSERT INTO competencies (developerId, skillId, value) VALUES (12, 10, 5);

-- Down
