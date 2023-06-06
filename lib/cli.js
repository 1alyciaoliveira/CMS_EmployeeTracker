const inquirer = require('inquirer');

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Qwertyuiop123!',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);

async function startPrompt() {

    let exit = false;

    while (!exit) {
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

    const { departmentName } = departmentAnswer;
  
    db.query(
      'INSERT INTO department (department_name) VALUES (?)',
      [departmentName],
      function (err, results) {
        if (err) {
          console.error('Error inserting role:', err);
        } else {
          console.log('Department added successfully!');
        }
      }
    );

    } else if (answer.target === 'Add a role') {

      //db query select * from department = results
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
            message: 'Which department does the role belong to?',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service'] //agregar results
          }
        ]);
      
        const departmentIdMap = {
          Engineering: 1,
          Finance: 2,
          Legal: 3,
          Sales: 4,
          Service: 5
        };
      
        const { roleName, roleSalary, roleDepartment } = roleAnswer;
        const departmentId = departmentIdMap[roleDepartment];
      
        db.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
          [roleName, roleSalary, departmentId],
          function (err, results) {
            if (err) {
              console.error('Error inserting role:', err);
            } else {
              console.log('Role added successfully!');
            }
          }
        );

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
                choices: ['John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'None']
            },
    ]);

    const roleIdMap = {
        'Sales Lead': 1, 
        'Salesperson': 2,
        'Lead Engineer': 3,
        'Software Engineer': 4,
        'Account Manager': 5,
        'Accountant': 6,
        'Legal Team Lead': 7,
        'Lawyer': 8,
        'Customer Service': 9
      };

      const managerIdMap = {
        'John Doe': 1,  
        'Ashley Rodriguez': 3, 
        'Kunal Singh': 5, 
        'None': null
      }
    
      const { employeeFirstName, employeeLastName, employeeRole, employeeManager } = employeeAnswer;
      const roleId = roleIdMap[employeeRole];
      const managerId = managerIdMap[employeeManager];
    
      db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [employeeFirstName, employeeLastName, roleId, managerId],
        function (err, results) {
          if (err) {
            console.error('Error inserting role:', err);
          } else {
            console.log('Role added successfully!');
          }
        }
      );

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
        db.query('SELECT * FROM department', function (err, results) {
            console.log("\n")
            console.table(results);
            console.log("\n\n\n\n\n\n\n")
        })
    }  else if (answer.target === 'View all roles') {
        db.query('SELECT * FROM role', function (err, results) {
            console.log("\n")
            console.table(results);
            console.log("\n\n\n\n\n")
        })
    }  else if (answer.target === 'View all employees') {
        db.query('SELECT * FROM employee', function (err, results) {
            console.log("\n")
            console.table(results);
            console.log("\n\n\n\n\n")
        })
    }   else if (answer.target === 'Exit') {
            console.log('Goodbye!');
            process.exit(0);
        }
    }

    }

module.exports = { startPrompt };