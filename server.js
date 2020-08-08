const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const promisemysql = require("promise-mysql");
const DepartmentClass = require('./lib/department');
const EmployeeClass = require('./lib/employee');
const RoleClass = require('./lib/role');
//const db = require('db');

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/allemployees.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

var departments = [];
var roles = [];
var employees = [];

const Menu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View ALL Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: 'View All Roles',
                    value: "VIEW_EMPLOYEE_ROLE"
                },
                {
                    name: 'View All Employees',
                    value: "VIEW_EMPLOYEES"
                },

                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add Employee Role",
                    value: "ADD_EMPLOYEE_ROLE"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "Quit"
                }

            ]
        }
    ])
        .then(res => {
            let choice = res.choice;
            switch (choice) {
                case "VIEW_DEPARTMENTS":
                    viewDepartment();
					console.log('\nDepartments');
					console.table(departments);
					departments = [];
                    break;
                case "VIEW_EMPLOYEE_ROLE":
                    viewEmployeeRole();
					console.log('\nRoles');
					console.table(roles);
					roles = [];
                    break;
                case "VIEW_EMPLOYEES":
                    viewEmployees();
					console.log('\nEmployee');
					console.table(employees);
					employees = [];
                    break;
                case "ADD_DEPARTMENT":
                    addDepartment();
                    break;
                case "ADD_EMPLOYEE_ROLE":
                    addemployeeRole();
                    break;
                case "UPDATE_EMPLOYEE_ROLE":
                    updateEmployeeRole();
                    break;
                case "Quit":
                    quit();

            }
        })
}

Menu();

const viewDepartment = () => {
	console.log("viewdepartment");
	var department = {};
	db.serialize(() => {
		db.each(`select * from department`, (err, row) => {
		if (err) {
			console.error(err.message);
		}
		department = new DepartmentClass(row.id, row.name);
		departments.push(department);
		});
	});
	Menu();
}

const viewEmployeeRole = () => {
	console.log("viewEmployeeRole");
	var role = {};
	db.serialize(() => {
		db.each(`select r.id, r.title, r.salary, r.department_id, d.name from role r, department d where r.department_id = d.id`, (err, row) => {
		if (err) {
			console.error(err.message);
		}
		role = new RoleClass(row.id, row.title, row.salary, row.department_id, row.name);
		roles.push(role);
		});
	});
	Menu();
}

const viewEmployees = () => {
	console.log("viewEmployees");
	var employee = {};
	db.serialize(() => {
		db.each(`select e.id, e.first_name, e.last_name, e.role_id, r.title, r.salary, d.name from employee e, role r, department d where r.department_id = d.id and e.role_id = r.id`, (err, row) => {
		if (err) {
			console.error(err.message);
		}
		employee = new EmployeeClass(row.id, row.first_name, row.last_name, row.role_id, row.title, row.name);
		employees.push(employee);
		});
	});
	Menu();
}


const addDepartment = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `What is the department name?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter department name!');
                    return false;
                }
            }

        }
    ]).then(projectData => {
        db.run('INSERT INTO department(name) VALUES(?)', [projectData.name], (err) => {
			if(err) {
				return console.log(err.message); 
			}
			console.log('Department was inserted');
		})
        Menu();

    });
}


const updateEmployeeRole = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `employeeid`,
            message: `Enter employee id?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter employee id!');
                    return false;
                }
            }
        }
		,
			{
            type: `input`,
            name: `roleId`,
            message: `Enter role id?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter role title!');
                    return false;
                }
            }
		
		}

    ]).then(projectData => {
        db.run('UPDATE EMPLOYEE SET ROLE_ID = ? WHERE ID = ?', [projectData.roleId, projectData.employeeId], (err) => {
			if(err) {
				return console.log(err.message); 
			}
			console.log('Employee role was updated');
		})
        Menu();

    });
}

const quit = () => {
	console.log("You quit");
	
	db.close((err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Close the database connection.');
});
}