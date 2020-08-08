const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('console.table');
const promisemysql = require("promise-mysql");
// const DepartmentClass = require('./lib/department');
// const EmployeeClass = require('./lib/employee');
// const RoleClass = require('./lib/role');
//const db = require('db');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Solnish1',
    database: 'allemployees'
});

		
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
                    break;
                case "VIEW_EMPLOYEE_ROLE":
                    viewEmployeeRole();
                    break;
                case "VIEW_EMPLOYEES":
                    viewEmployees();
                    break;
                case "ADD_DEPARTMENT":
                    addDepartment();
                    break;
                case "ADD_EMPLOYEE_ROLE":
                    addemployeeRole();
                    break;
                    case "ADD_EMPLOYEE":
                    addEmployee();
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
    connection.query("SELECT * FROM department", function (err, result, fields) {
       if (err) throw err;
          console.log('\nDepartments');
          console.table(result);
    });
	Menu();
}

const viewEmployeeRole = () => {
    connection.query("select r.id, r.title, r.salary, r.department_id, d.name from role r, department d where r.department_id = d.id", function (err, result, fields) {
        if (err) throw err;
          console.log('\nEmployeeRoles');
          console.table(result);
    });
	Menu();
}

const viewEmployees = () => {
    connection.query("select e.id, e.first_name, e.last_name, e.role_id, r.title, r.salary, d.name, e.manager_id from employee e, role r, department d where r.department_id = d.id and e.role_id = r.id order by e.id", function (err, result, fields) {
       if (err) throw err;
          console.log('\nEmployees');
          console.table(result);
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
        var sql = "INSERT INTO department (name) VALUES (?)";
        connection.query(sql, projectData.name, function (err, result) {
           if (err) throw err;
       //       console.log("1 record inserted");
        });
        Menu();
    });
}

const addemployeeRole = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `title`,
            message: `What is the employee title?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter employee title!');
                    return false;
                }
            }

        },
        {
            type: `input`,
            name: `salary`,
            message: `What is the employee salary?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter employee salary!');
                    return false;
                }
            }

        },
        {
            type: `input`,
            name: `id`,
            message: `What is the department id?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter department id!');
                    return false;
                }
            }

        }
    ]).then(projectData => {
        var sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
        connection.query(sql, [projectData.title, projectData.salary, projectData.id], function (err, result) {
           if (err) {console.log('Department ID not found');
        }
            //   console.log("1 record inserted");
        });
        Menu();
    });
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `first_name`,
            message: `What is the employee first name?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter employee first name!');
                    return false;
                }
            }

        },
		{
            type: `input`,
            name: `last_name`,
            message: `What is the employee last name?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter employee last name!');
                    return false;
                }
            }

        },
		{
            type: `input`,
            name: `role_id`,
            message: `What is the role id?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter role id!');
                    return false;
                }
            }

        },
		{
            type: `input`,
            name: `manager_id`,
            message: `What is the employee manager id?`,
			validate: nameInput => {
				return true;
            }
        }
    ]).then(projectData => {
		var sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
		connection.query(sql, [projectData.first_name, projectData.last_name, projectData.role_id, projectData.manager_id], function (err, result) {
            if (err) { console.log('Manager id not valid');
         } 
			//   console.log("1 record inserted");
		});
        Menu();
    });
}
const updateEmployeeRole = () => {
    //id, title, salary, department
    return inquirer.prompt([
        {
            type: `input`,
            name: `id`,
            message: `What is employee id?`,
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
            message: `What is  employee new role id?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter new role id!');
                    return false;
                }
            }
		
		}
    ]).then(projectData => {
		var sql = "UPDATE EMPLOYEE SET ROLE_ID = ? WHERE ID = ?";
		connection.query(sql, [projectData.roleId, projectData.id], function (err, result) {
            if (err) { console.log('Employee id or role id not valid'); 
         }
			//   console.log("1 record inserted");
		});
        Menu();
    });
}

const quit = () => {
	console.log("You quit");
    connection.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        // console.log('Close the database connection.');
    });
}