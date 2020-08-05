const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const promisemysql = require("promise-mysql");
const Departmentlass = require('./lib/department');
const Employeeclass = require('./lib/employee')
const Roleclass = require('./lib/role')



const Menu = () => {
  return inquirer.prompt([
      {
              type: 'checkbox',
              name: 'menu',
              message: 'Select',
              choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
          }
  
      ]).then(projectData => {
  
          if (projectData.menu == 'View all department') {
              return promptdepartment();
                    }
      });
  }
  
Menu();