// CONNECTIONS AND DEPENDENCIES ===========================================================

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employeeMGMT_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(connection.threadId);
  console.log(connection.state);
  runMGMT();
});

// MAIN MENU ==============================================================================

function runMGMT() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        // "View All Employees by Manager",
        "Add Employee",
        // "Remove Employee",
        "Update Employee Role",
        // "Update Employee Manager",
        "View All Roles",
        "Add Role",
        // "Remove Role",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          allEmployees();
          break;

        case "View All Employees by Department":
          allEmployeesDepartments();
          break;

        // case "View All Employees by Manager":
        //   allEmployeesManager();
        //   break;

        case "Add Employee":
          addEmployee();
          break;

        // case "Remove Employee":
        //   removeEmployee();
        //   break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        // case "Update Employee Manager":
        //   updateEmployeeManager();
        //   break;

        case "View All Roles":
          allRoles();
          break;

        case "Add Role":
          addRole();
          break;

        // case "Remove Role":
        //   removeRole();
        //   break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// MENU FUNCTIONS ===========================================================================

function allEmployees() {
  let query = "SELECT * FROM employee;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("FIRST NAME   ||   LAST NAME");
    console.log("==============================");
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].first_name, res[i].last_name);
    }
  });
}

function allRoles() {
  let query = "SELECT * FROM jobrole;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("ROLE         ||   SALARY");
    console.log("==============================");
    for (let i = 0; i < res.length; i++) {
      console.log(`${res[i].title} .......  ${res[i].salary}`);
    }
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employees first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employees last name?",
      },
      {
        name: "roleId",
        type: "input",
        message:
          "What is the employees numerical role id ( 1: Voice Actor, 2: Writer, 3: Producer )?",
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the employees numerical manager id?",
      }
    ])
    .then(function (answer) {
      let query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
      connection.query(
        query,
        [
          answer.firstName,
          answer.lastName,
          answer.roleId,
          answer.managerId
        ],
        function (err, res) {
          if (err) throw err;
          console.log(
            `Employee ${answer.firstName} ${answer.lastName} has been added!`
          );
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of this job role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
      {
        name: "department_id",
        type: "input",
        message:
          "What is the numerical department id?",
      }
    ])
    .then(function (answer) {
      let query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
      connection.query(
        query,
        [
          answer.firstName,
          answer.lastName,
          answer.roleId,
          answer.managerId
        ],
        function (err, res) {
          if (err) throw err;
          console.log(
            `Employee ${answer.firstName} ${answer.lastName} has been added!`
          );
        }
      );
    });
}



function goBack() {
  inquirer
    .prompt({
      name: "goback",
      type: "list",
      message: "Now What?",
      choices: ["Main Menu", "Quit"],
    })
    .then(function (answer) {
      switch (answer.goback) {
        case "Main Menu":
          runMGMT();
          break;
        case "Quit":
          connection.end();
          break;
      }
    });
}
