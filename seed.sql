DROP DATABASE IF EXISTS hotRestaurantDB;
CREATE DATABASE hotRestaurantDB;

USE hotRestaurantDB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phoneNumber VARCHAR(45) NOT NULL,
    seated BOOLEAN NOT NULL, 
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
