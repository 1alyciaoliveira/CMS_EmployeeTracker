-- Insert departments
INSERT IGNORE INTO department (department_id, department_name)
VALUES (1, 'Engineering'),
    (2, 'Finance'),
    (3, 'Legal'),
    (4, 'Sales'),
    (5, 'Service');

-- Insert roles
INSERT IGNORE INTO role (role_id, title, salary, department_id)
VALUES (1, 'Sales Lead', 8000.00, 4),
    (2, 'Salesperson', 4000.00, 4),
    (3, 'Lead Engineer', 8000.00, 1),
    (4, 'Software Engineer', 4000.00, 1),
    (5, 'Account Manager', 8000.00, 2),
    (6, 'Accountant', 4000.00, 2),
    (7, 'Legal Team Lead', 8000.00, 3),
    (8, 'Lawyer', 4000.00, 3),
    (9, 'Customer Service', 4000.00, 5);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, 1),
    ('Kevin', 'Tupik', 4, 1),
    ('Kunal', 'Singh', 5, 1),
    ('Malia', 'Brown', 6, 1);
