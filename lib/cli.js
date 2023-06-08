const inquirer = require('inquirer');

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);

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

    if (answer.target === 'View all departments') {
        db.query('SELECT * FROM department', function (err, results) {
            if (err) {
                console.error(err);
              } else {
                console.table(results);
              }
            })
    } else if (answer.target === 'View all roles') {
        db.query('SELECT * FROM role', function (err, results) {
            if (err) {
                console.error(err);
              } else {
                console.table(results);
              }
            })
    } else if (answer.target === 'View all employees') {
        db.query('SELECT * FROM employee', function (err, results) {
            if (err) {
                console.error(err);
              } else {
                console.table(results);
              }
            })
    } else if (answer.target === 'Add a department') {
        const departmentAnswer = await inquirer.prompt ([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?',
            },
        ]);
    
        let { departmentName } = departmentAnswer;
      
        db.query(
          'INSERT INTO department (department_name) VALUES (?)',
          [departmentName],
          function (err, results) {
            if (err) {
              console.error('Error inserting department:', err);
            } else {
              console.log('Department added successfully!');
            }
          }
        );
    } else if (answer.target === 'Add a role') {
        const departmentResults = await new Promise((resolve, reject) => {
          db.query('SELECT id, department_name FROM department', function (err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      
        const departmentChoices = departmentResults.map((row) => ({
          name: row.department_name,
          value: row.id,
        }));
      
        const roleInfo = await inquirer.prompt([
          {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?',
          },
          {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?',
          },
          {
            type: 'list',
            name: 'roleDepartment',
            message: 'Which department does the role belong to?',
            choices: departmentChoices,
          },
        ]);
      
        let { roleName, roleSalary, roleDepartment } = roleInfo;
      
        db.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [roleName, roleSalary, roleDepartment],
            function (err, results) {
              if (err) {
                console.error('Error inserting role:', err);
              } else {
                console.log('Role added successfully!');
              }
            }
          );
            
        } else if (answer.target === 'Add an employee') {

            const roleResults = await new Promise((resolve, reject) => {
                db.query ('SELECT title FROM role', function (err, results) {
                    if (err) {
                    reject (err);
                    } else {
                        resolve(results);
                    }
                });
            });

            const employeeResults = await new Promise((resolve, reject) => {
                db.query ('SELECT first_name, last_name, manager_name FROM employee', function (err, results) {
                    if (err) {
                    reject (err);
                    } else {
                        resolve(results);
                    }
                });
            });
                
                const roleChoices = roleResults.map((row) => row.title);

                //const managerChoices = employeeResults.map((row) => row.manager_name);
    
                const employeeInfo = await inquirer.prompt([
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
                        choices: roleChoices
                    },
                    {
                        type: 'list',
                        name: 'employeeManager',
                        message: 'Who is the employee manager?',
                        choices: ['Person 1', 'Person 2']
                    }
                  ]);
    
                  let { employeefirstName, employeeLastName, employeeRole, employeeManager } = employeeInfo;
    
                
                  db.query(
                    'INSERT INTO employee (first_name, last_name, role_name, manager_name) VALUES (?, ?, ?, ?)',
                    [employeefirstName, employeeLastName, employeeRole, employeeManager],
                    function (err, results) {
                      if (err) {
                        console.error('Error inserting employee:', err);
                      } else {
                        console.log('Employee added successfully!');
                      }
                    }
                  );
                
            }

    }




module.exports = { startPrompt };