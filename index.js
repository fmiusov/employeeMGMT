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
    for (let i = 0; i < res.length; i++) {
      var values = [[res[i].first_name, res[i].last_name]];
      console.table(["First Name", "Last Name"], values);
    }
  });
}
