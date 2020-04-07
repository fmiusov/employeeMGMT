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
        "View All Departments",
        "View All Roles",
        "View All Employees by Department",
        "Add Department",
        "Add Employee",
        "Add Role",
        "Update Employee Role",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          allEmployees();
          break;

        case "View All Departments":
          allDepartments();
          break;

        case "View All Roles":
          allRoles();
          break;

        case "View All Employees by Department":
          allEmployeesDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        // case "Remove Employee":
        //   removeEmployee();
        //   break;

        // case "Remove Role":
        //   removeRole();
        //   break;

        // case "Remove Department":
        //   removeDepartment();
        //   break;

        // case "Update Employee Manager":
        //   updateEmployeeManager();
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
    console.log("# || FIRST NAME || LAST NAME");
    console.log("==============================");
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].id, res[i].first_name, res[i].last_name);
    }
  });
}

function allEmployeesDepartments() {
  let query =
    "SELECT * FROM employee INNER JOIN department ON employee.role_id = department.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("EMPLOYEE  ||   DEPARTMENT");
    console.log("==============================");
    for (let i = 0; i < res.length; i++) {
      console.log(
        `${res[i].first_name} ${res[i].last_name}.......  ${res[i].name}`
      );
    }
  });
}

function allRoles() {
  let query = "SELECT * FROM jobrole;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("#  ROLE         ||   SALARY");
    console.log("==============================");
    for (let i = 0; i < res.length; i++) {
      console.log(`${res[i].id} ${res[i].title} .......  ${res[i].salary}`);
    }
  });
}

function allDepartments() {
  let query = "SELECT * FROM department;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("#  DEPARTMENT");
    console.log("==============================");
    for (let i = 0; i < res.length; i++) {
      console.log(`${res[i].id} ${res[i].name}`);
    }
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the name of the new department?",
      }
    ])
    .then(function (answer) {
      let query =
        "INSERT INTO department (name) VALUES (?);";
      connection.query(
        query,
        [answer.departmentName],
        function (err, res) {
          if (err) throw err;
          console.log(
            `New department ${answer.departmentName} has been added!`
          );
        }
      );
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
      },
    ])
    .then(function (answer) {
      let query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
      connection.query(
        query,
        [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
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
        name: "departmentId",
        type: "input",
        message: "What is the numerical department id?",
      },
    ])
    .then(function (answer) {
      let query =
        "INSERT INTO jobrole (title, salary, department_id) VALUES (?, ?, ?);";
      connection.query(
        query,
        [answer.title, answer.salary, answer.departmentId],
        function (err, res) {
          if (err) throw err;
          console.log(
            `Job role ${answer.title} has been added with a salary of ${answer.salary}!`
          );
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "employeeId",
        type: "input",
        message: "What is the employee's id #?",
      },
      {
        name: "roleId",
        type: "input",
        message: "What is their new role id #?",
      },
    ])
    .then(function (answer) {
      let query = "UPDATE employee SET role_id = ? WHERE id = ?;";
      connection.query(query, [answer.employeeId, answer.roleId], function (
        err,
        res
      ) {
        if (err) throw err;
        console.log(
          `Employee # ${answer.employeeId} has been given the new role id of ${answer.roleId}!`
        );
      });
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
