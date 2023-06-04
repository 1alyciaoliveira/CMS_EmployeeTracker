const inquirer = require('inquirer');

async function startPrompt() {
    const answer = await inquirer.prompt ([
    {
        type: 'list',
        name: 'target',
        message: 'What would you like to do?',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee role', 
            'Exit'
        ]
    }
]);

if (answer.target === 'Add a department') {
    const departmentAnswer = await inquirer.prompt ([
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?',
    },
]);

} else if (answer.target === 'Add a role') {
    const roleAnswer = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Which department does the role belongs to?',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
        }
]);

} else if (answer.target === 'Add an employee') {
    const employeeAnswer = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the employee first name?',
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the employee last name?',
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the employee role?',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'Who is the employee manager?',
            choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
        },
]);
} else if (answer.target === 'Update an employee role') {
    const updateRoleAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'updateEmployee',
            message: 'Who is the employee?',
            choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
        },
        {
            type: 'list',
            name: 'updateRole',
            message: 'Which role do you want to assign to the selected employee?',
            choices:['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
        },
]);

} else if (answer.target === 'View all departments') {
    console.log('View all departments');
}  else if (answer.target === 'View all roles') {
    console.log('View all roles');
}  else if (answer.target === 'View all employees') {
    console.log('View all employees');
} 

}

startPrompt();