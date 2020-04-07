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
  salary DECIMAL(9,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);
INSERT INTO department (name)
VALUES ("Production");

INSERT INTO department (name)
VALUES ("Voice Acting");

INSERT INTO department (name)
VALUES ("Writing");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Justin", "Roiland", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Harmon", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Kassir", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Lazzo", 1, 1);

INSERT INTO jobrole (title, salary, department_id)
VALUES ("Voice Actor", "100000.00", 2);

INSERT INTO jobrole (title, salary, department_id)
VALUES ("Writer", "80000.00", 3);

INSERT INTO jobrole (title, salary, department_id)
VALUES ("Producer", "500000.00", 1);

SELECT * FROM employee;
SELECT * FROM jobrole;
SELECT * FROM department;

SELECT * 
FROM employee INNER JOIN department 
ON employee.role_id = department.id;

UPDATE employee
SET role_id = '2'
WHERE id = 1;