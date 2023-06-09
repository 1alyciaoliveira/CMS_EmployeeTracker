const inquirer = require('inquirer');

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', //ADD YOUR USER
        password: '', //ADD YOUR PASSWORD
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);


async function startPrompt() {

  let exit = false; 

  while (!exit) { //keeps the prompt until exit is chosen.
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
              console.log("\n")
              console.table(results);
            }
          })
    } else if (answer.target === 'View all roles') {
      db.query(`
      SELECT r.title, r.id 
      AS role_id, 
      d.department_name 
      AS department, 
      r.salary 
      FROM role r 
      INNER JOIN department d 
      ON r.department_id = d.id`, function (err, results) {
        if (err) {
          console.error(err);
        } else {
          console.log("\n")
          console.table(results);
        }
      });
    
    } else if (answer.target === 'View all employees') {
      const query = `
      SELECT e1.id, e1.first_name, e1.last_name, r.title AS role, r.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager_name
      FROM employee e1
      INNER JOIN role r ON e1.role_id = r.id
      LEFT JOIN employee e2 ON e1.manager_id = e2.id`;
    
    db.query(query, function (err, results) {
      if (err) {
        console.error(err);
      } else {
        console.log("\n")
        console.table(results);
      }
    });

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
        })
      );
    
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
        db.query ('SELECT id, title FROM role', function (err, results) {
          if (err) {
            reject (err);
          } else {
            resolve(results);
          }
        });
      });

      const employeeResults = await new Promise((resolve, reject) => {
        db.query(`SELECT e1.id, e1.first_name, e1.last_name, e2.first_name 
        AS manager_first_name, e2.last_name 
        AS manager_last_name 
        FROM employee e1 
        LEFT JOIN employee e2 
        ON e1.manager_id = e2.id`, function (err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
        });
      });
      
      const roleChoices = roleResults.map((row) => ({
        name: row.title,
        value: row.id,
        })
      );

      const managerChoices = employeeResults.map((row) => ({
        name: `${row.manager_first_name} ${row.manager_last_name}`,
        value: row.id,
        })
      );
    
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
            choices: managerChoices
        }
        ]);

      let { employeeFirstName, employeeLastName, employeeRole, employeeManager } = employeeInfo;
      
      db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [employeeFirstName, employeeLastName, employeeRole, employeeManager],
        function (err, results) {
          if (err) {
            console.error('Error inserting employee:', err);
          } else {
            console.log('Employee added successfully!');
          }
        }
      );
          
      } else if (answer.target === 'Update an employee role') {
        const employees = await new Promise((resolve, reject) => {
          db.query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee', function (err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
  
        const employeeChoices = employees.map((row) => ({
          name: row.full_name,
          value: row.id,
        }));
  
        const roles = await new Promise((resolve, reject) => {
          db.query('SELECT id, title FROM role', function (err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
  
        const roleChoices = roles.map((row) => ({
          name: row.title,
          value: row.id,
        }));
  
        const updateInfo = await inquirer.prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to update?',
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'newRoleId',
            message: 'Select the new role for the employee:',
            choices: roleChoices,
          },
        ]);
  
        const { employeeId, newRoleId } = updateInfo;
  
        db.query(
          'UPDATE employee SET role_id = ? WHERE id = ?',
          [newRoleId, employeeId],
          function (err, results) {
            if (err) {
              console.error('Error updating employee role:', err);
            } else {
              console.log('Employee role updated successfully!');
            }
          }
        );
      } else if (answer.target === 'Exit') {
        console.log('Goodbye!');
        process.exit(0);
    }
  } 
}

module.exports = { startPrompt };