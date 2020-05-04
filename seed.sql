DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_ID INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_ID INT NOT NULL,
    manager_ID INT, 
    PRIMARY KEY (id)
);


INSERT INTO employee (first_name, last_name, role_ID)
VALUES ("John", "Doe", 1), ("Jane", "Doe", 2), ("Juan", "Doe", 3), ("Michael", "Scott", 4);
INSERT INTO role (title, salary, department_ID)
VALUES ("Worker", 100000, 1),("Laboror", 25000, 2),("Dog Trainer", 2000, 3),("Cat Whisperer", 45000, 3);
INSERT INTO department (department_name)
VALUES ("Sales"), ("Maintenance"), ("Animals");

SELECT first_name, last_name, title, salary, department_name FROM employee
LEFT JOIN role
ON employee.role_ID = role.id
LEFT JOIN department
ON role.department_ID = department.id;

