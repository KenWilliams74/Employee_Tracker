const mysql = require("mysql");
const inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "employeeTracker_db"
});

function beginning() {
  connection.connect(function (err) {
    if (err) throw err;
    display(function () {
      start();
    })
  })
};

beginning();


function display(cb) {
  connection.query("SELECT first_name, last_name, title, salary, department_name FROM employee LEFT JOIN role ON employee.role_ID = role.id LEFT JOIN department ON role.department_ID = department.id;", function (err, res) {
    if (err) throw err;
    console.table(res);
    cb();
  });
};

function start() {
  inquirer
    .prompt({
      name: "employeeSelect",
      type: "list",
      message: "Would you like to do?",
      choices: ["Add department, role, employee", "View departments, roles, employees", "Update employee roles", "View Main Table"]
    })
    .then(function (answer) {
      if (answer.employeeSelect === "Add department, role, employee") {
        addOptions();
      } else if (answer.employeeSelect === "View departments, roles, employees") {
        viewOptions();
      } else if (answer.employeeSelect === "Update employee roles") {
        updateRoles();
      } else connection.query("SELECT first_name, last_name, title, salary, department_name FROM employee LEFT JOIN role ON employee.role_ID = role.id LEFT JOIN department ON role.department_ID = department.id;", function (err, res) {
        if (err) throw err;
        console.table(res)
        start();
      });
    })
};

// *********** FIRST THREE SELECTION FUNCTIONS ****************//

function addOptions() {
  inquirer
    .prompt(
      {
        name: "addOption",
        type: "list",
        message: "Please select from the following:",
        choices: ["Add Department", "Add Role", "Add Employee", "Go Back"]
      })
    .then(function (answer) {
      if (answer.addOption === "Add Department") {
        addDepartment();
      } else if (answer.addOption === "Add Role") {
        addRole();
      } else if (answer.addOption === "Add Employee") {
        addEmployee();
      } else start();
    })
};

function viewOptions() {
  inquirer
    .prompt(
      {
        name: "viewOption",
        type: "list",
        message: "Please select from the following:",
        choices: ["View Departments", "View Roles", "View Employees", "Go Back"]
      })
    .then(function (answer) {
      if (answer.viewOption === "View Departments") {
        connection.query("SELECT * FROM department;", function (err, res) {
          console.table(res);
          start();
        });
      } else if (answer.viewOption === "View Roles") {
        connection.query("SELECT * FROM role;", function (err, res) {
          console.table(res);
          start();
        });
      } else if (answer.viewOption === "View Employees") {
        connection.query("SELECT * FROM employee;", function (err, res) {
          console.table(res);
          start();
        });
      } else start();
    })
};

function updateRoles() {
  inquirer
    .prompt(
      {
        name: "updateRole",
        type: "list",
        message: "Please select from the following:",
        choices: ["View Departments", "View Roles", "View Employees", "Go Back"]
      })
    .then(function (answer) {
      if (answer.updateRole === "View Departments") {
        viewDepartment();
      }
    })
};


// ************* ADD OPTION FUNCTIONS *****************



function addDepartment() {
  inquirer.prompt([{
    type: "input",
    name: "department",
    message: "What Department would you like to create?"
  }
  ]).then(createPrompt => {
    connection.query(
      "INSERT INTO department SET ?;",
      {
        department_name: createPrompt.department,
      },
      function (errOne, resOne) {
        if (errOne) throw errOne;
        start();
      }
    );
  });
};

function addRole() {
  inquirer.prompt([{
    type: "input",
    name: "title",
    message: "What Role would you like to create?"
  },
  {
    type: "number",
    name: "salary",
    message: "What salary should it have?"
  },
  {
    type: "number",
    name: "depart_id",
    message: "What department ID is this assigned to?"
  }

  ]).then(createPrompt => {
    connection.query(
      "INSERT INTO role SET ?;",
      {
        title: createPrompt.title,
        salary: createPrompt.salary,
        department_ID: createPrompt.depart_id,
      },
      function (errOne, resOne) {
        if (errOne) throw errOne;
        start();
      }
    );
  });
};