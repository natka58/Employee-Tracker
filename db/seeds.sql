-- insert into department (id, name) values (1, 'IT');
-- insert into department (id, name) values (2, 'HR');

-- insert into role (id, title, salary, department_id) values (1, 'Sales', 70000, 1);
-- insert into role (id, title, salary, department_id) values (2, 'AG Manager', 50000, 2);

-- insert into employee (id, first_name, last_name, role_id, manager_id) values (1, 'Sam', 'Smith', 1, 3);
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (2, 'Tom', 'Johnson', 2, null );
-- insert into employee (id, first_name, last_name, role_id, manager_id) values (3, 'Max', 'Falls', 2, null );

use allemployees;

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
      ('Salesperson', 80000, 1),
      ('Lead Engineer', 150000, 2),
      ('Software Engineer', 120000, 2),
      ('Accountant', 1250000, 3),
      ('Legal Team Lead', 250000, 4),
      ('Lawyer', 190000, 4);
   

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Ashley', 'Rodriguez', 1, null),
('John', 'Doe', 2, 1),
('Mike', 'Chan', 3, 1),
('Kevin', 'Tupik', 4, 1),
('Malia', 'Brown', 5, null),
('Sarah', 'Lourd', 6, null),
('Tom', 'Allen', 7, 6),
('Christian', 'Eckenrode', 5, 2);