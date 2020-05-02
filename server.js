const mysql = require("mysql");
const inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "employeeTracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
  display(function(){
    start();
  })
});



function display(cb){
  connection.query("SELECT * FROM employee;", function (err, res) {
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
      choices: ["Add department, role, employee", "View departments, roles, employees", "Update employee roles"]
    })
    .then(function (answer) {
      if (answer.employeeSelect === "Add department") {
        addDepartment();
      }
    })
};

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "employeeAdd",
        type: "input",
        message: "Add an Employee"
      },
      {
        name: "employeeDelete",
        type: "input",
        message: "Delete an Employee"
      }])
};
     