const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    },
    {
        type: 'input',
        name: 'add department',
        message: 'What is the name of the department?'
    },
    {
        type: 'input',
        name: 'name role',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'salary role',
        message: 'What is the salary of the role?'
    },
    {
        type: 'list',
        name: 'department role',
        message: 'Which department does the role belongs to?',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
    },
    {
        type: 'input',
        name: 'name employee',
        message: 'What is the employee first name?',
    },
    {
        type: 'input',
        name: 'lastname employee',
        message: 'What is the employee last name?',
    },
    {
        type: 'list',
        name: 'role employee',
        message: 'What is the employee role?',
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
    },
    {
        type: 'list',
        name: 'manager employee',
        message: 'Who is the employee manager?',
        choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
    },
    {
        type: 'list',
        name: 'update role',
        message: 'Who is the employee?',
        choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
    },
    {
        type: 'list',
        name: 'new role',
        message: 'Which role do you want to assign to the selected employee?',
        choices:['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
    },
]