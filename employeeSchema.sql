DROP DATABASE IF EXISTS employeeMGMT_DB;
CREATE database employeeMGMT_DB;

USE employeeMGMT_DB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE jobrole (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(7,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Justin", "Roiland", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Harmon", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Kassir", 1, 1);

SELECT * FROM employee;
SELECT * FROM jobrole;
SELECT * FROM department;