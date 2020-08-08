-- insert into department (id, name) values (1, 'IT');
-- insert into department (id, name) values (2, 'HR');

-- insert into role (id, title, salary, department_id) values (1, 'Sales', 70000, 1);
-- insert into role (id, title, salary, department_id) values (2, 'AG Manager', 50000, 2);

-- insert into employee (id, first_name, last_name, role_id, manager_id) values (1, 'Sam', 'Smith', 1, 3);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (2, 'Tom', 'Johnson', 2, null );
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (3, 'Max', 'Falls', 2, null );

use employees;

INSERT INTO department
(name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role
(title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
      ('Salesperson', 80000, 2),
      ('Lead Engineer', 150000, 3),
      ('Software Engineer', 120000, 4),
      ('Accountant', 1250000, 5),
      ('Legal Team Lead', 250000, 6),
      ('Lawyer', 190000, 7),
      ('Lead Engineer', 150000, 8);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, 3),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, null),
('Kevin', 'Tupik', 4, 3),
('Malia', 'Brown', 5, null),
('Sarah', 'Lourd', 6, null),
('Tom', 'Allen', 7, 6),
('Christian', 'Eckenrode', 8, 2);