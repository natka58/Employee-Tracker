const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('console.table');
const promisemysql = require("promise-mysql");
const DepartmentClass = require('./lib/department');
const EmployeeClass = require('./lib/employee');
const RoleClass = require('./lib/role');
//const db = require('db');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Solnish1',
    database: 'allemployees'
});
// connection.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
//     // console.log("Connected!");
//     connection.query(sql, ['AGM', 78865, 1], function (err, result) {
//       if (err) throw err;
//     //   console.log("1 record inserted");
//     });
//   });
// connection.connect(function(err) {
//     if (err) throw err;
//     // console.log("Connected!");
//     var sql = "INSERT INTO department (name) VALUES ('" + 'marketing' + "' )";
//     connection.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
//   });
// connection.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }
  
//     console.log('Connected to the MySQL server.');
//   });
//   connection.connect(function(err) {
//     if (err) throw err;
//     connection.query("SELECT * FROM department", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
    
//     });
//   });
// const sqlite3 = require('sqlite3').verbose();

// // open the database
// let db = new sqlite3.Database('./db/allemployees.db', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the chinook database.');
// });

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
					// console.log('\nDepartments');
					// console.table(departments);
					// departments = [];
                    break;
                case "VIEW_EMPLOYEE_ROLE":
                    viewEmployeeRole();
					// console.log('\nRoles');
					// console.table(roles);
					// roles = [];
                    break;
                case "VIEW_EMPLOYEES":
                    viewEmployees();
					// console.log('\nEmployee');
					// console.table(employees);
					// employees = [];
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
    // console.log("viewdepartment");
   
   
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("SELECT * FROM department", function (err, result, fields) {
          if (err) throw err;
          console.log('\nDepartments');
          console.table(result);
        //   department = new DepartmentClass(result.id, result.name);
	
        });
      });
	// db.serialize(() => {
	// 	db.each(`select * from department`, (err, row) => {
	// 	if (err) {
	// 		console.error(err.message);
	// 	}
	// 	department = new DepartmentClass(row.id, row.name);
	// 	departments.push(department);
	// 	});
	// });
	Menu();
}

const viewEmployeeRole = () => {
	// console.log("viewEmployeeRole");
    // var role = {};
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("select r.id, r.title, r.salary, r.department_id, d.name from role r, department d where r.department_id = d.id", function (err, result, fields) {
          if (err) throw err;
          console.log('\nEmployeeRoles');
          console.table(result);
        //   department = new DepartmentClass(result.id, result.name);
	
        });
      });
	// db.serialize(() => {
	// 	db.each(`select r.id, r.title, r.salary, r.department_id, d.name from role r, department d where r.department_id = d.id`, (err, row) => {
	// 	if (err) {
	// 		console.error(err.message);
	// 	}
	// 	role = new RoleClass(row.id, row.title, row.salary, row.department_id, row.name);
	// 	roles.push(role);
	// 	});
	// });
	Menu();
}

const viewEmployees = () => {
	
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("select e.id, e.first_name, e.last_name, e.role_id, r.title, r.salary, d.name from employee e, role r, department d where r.department_id = d.id and e.role_id = r.id", function (err, result, fields) {
          if (err) throw err;
          console.log('\nEmployees');
          console.table(result);
        //   department = new DepartmentClass(result.id, result.name);
	
        });
      });
	// db.serialize(() => {
	// 	db.each(`select e.id, e.first_name, e.last_name, e.role_id, r.title, r.salary, d.name from employee e, role r, department d where r.department_id = d.id and e.role_id = r.id`, (err, row) => {
	// 	if (err) {
	// 		console.error(err.message);
	// 	}
	// 	employee = new EmployeeClass(row.id, row.first_name, row.last_name, row.role_id, row.title, row.name);
	// 	employees.push(employee);
	// 	});
	// });
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
        connection.connect(function(err) {
            if (err) throw err;
            // console.log("Connected!");
            var sql = "INSERT INTO department (name) VALUES (?)";
            connection.query(sql, projectData.name, function (err, result) {
              if (err) throw err;
            //   console.log("1 record inserted");
            });
          });
        // db.run('INSERT INTO department(name) VALUES(?)', [projectData.name], (err) => {
		// 	if(err) {
		// 		return console.log(err.message); 
		// 	}
		// 	console.log('Department was inserted');
		// })
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
        connection.connect(function(err) {
            if (err) throw err;
            var sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
            // console.log("Connected!");
            connection.query(sql, [projectData.name, projectData.salary, projectData.id], function (err, result) {
              if (err) throw err;
            //   console.log("1 record inserted");
            });
          });
        // db.run('INSERT INTO department(name) VALUES(?)', [projectData.name], (err) => {
		// 	if(err) {
		// 		return console.log(err.message); 
		// 	}
		// 	console.log('Department was inserted');
		// })
        // Menu();

    });
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `What is the employee name?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter employee name!');
                    return false;
                }
            }

        }
    ]).then(projectData => {
        connection.connect(function(err) {
            if (err) throw err;
            // console.log("Connected!");
            var sql = "INSERT INTO employee (name) VALUES (?)";
            connection.query(sql, projectData.name, function (err, result) {
              if (err) throw err;
            //   console.log("1 record inserted");
            });
          });
        // db.run('INSERT INTO department(name) VALUES(?)', [projectData.name], (err) => {
		// 	if(err) {
		// 		return console.log(err.message); 
		// 	}
		// 	console.log('Department was inserted');
		// })
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
    
    connection.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
      });
// 	db.close((err) => {
// 	if (err) {
// 		console.error(err.message);
// 	}
// 	console.log('Close the database connection.');
// });
}