DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  department_id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id)
  REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  role_id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id)
  REFERENCES role(role_id),
  FOREIGN KEY (manager_id) 
  REFERENCES employee(employee_id)
);