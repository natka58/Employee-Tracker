insert into department (id, name) values (1, 'IT');
insert into department (id, name) values (2, 'HR');

insert into role (id, title, salary, department_id) values (1, 'Sales', 70000, 1);
insert into role (id, title, salary, department_id) values (2, 'AG Manager', 50000, 2);

insert into employee (id, first_name, last_name, role_id, manager_id) values (1, 'Sam', 'Smith', 1, 3);
insert into employee (id, first_name, last_name, role_id, manager_id) values (2, 'Tom', 'Johnson', 2, null );
insert into employee (id, first_name, last_name, role_id, manager_id) values (3, 'Max', 'Falls', 2, null );