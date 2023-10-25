const mysql = require("mysql2");
const inquirer = require("inquirer");
const { departmentPrompt, rolePrompt, employeePrompt } = require("./prompts");

const connection = mysql.createConnection({
  host: "localhost",
  user: "some_user",
  password: "user_password",
  database: "employee_tracker",
});

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        default:
          console.log("Invalid choice.");
      }
    });
}

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database.");
});

function viewAllDepartments() {
  const query = "SELECT * FROM departments";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log("\nDepartments:\n");
    console.table(results);
    mainMenu();
  });
}

function viewAllRoles() {
  const query = `
      SELECT roles.id, roles.title, roles.salary, departments.name AS department
      FROM roles
      INNER JOIN departments ON roles.department_id = departments.id
    `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log("\nRoles:\n");
    console.table(results);
    mainMenu();
  });
}

function viewAllEmployees() {
  const query = `
      SELECT employees.id, employees.first_name, employees.last_name,
             roles.title, departments.name AS department, roles.salary,
             CONCAT(managers.first_name, ' ', managers.last_name) AS manager
      FROM employees
      INNER JOIN roles ON employees.role_id = roles.id
      INNER JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log("\nEmployees:\n");
    console.table(results);
    mainMenu();
  });
}

function addDepartment() {
  inquirer.prompt(departmentPrompt).then((answers) => {
    const { name } = answers;
    const query = "INSERT INTO departments (name) VALUES (?)";
    connection.query(query, [name], (err) => {
      if (err) throw err;
      console.log("Department added successfully.");
      mainMenu();
    });
  });
}

function addRole() {
  inquirer.prompt(rolePrompt).then((answers) => {
    const { title, salary, department_id } = answers;
    const query =
      "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
    connection.query(query, [title, salary, department_id], (err) => {
      if (err) throw err;
      console.log("Role added successfully.");
      mainMenu();
    });
  });
}

function addEmployee() {
  inquirer.prompt(employeePrompt).then((answers) => {
    const { first_name, last_name, role_id, manager_id } = answers;
    const query =
      "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [first_name, last_name, role_id, manager_id || null],
      (err) => {
        if (err) throw err;
        console.log("Employee added successfully.");
        mainMenu();
      }
    );
  });
}

function updateEmployeeRole() {
  const employeeQuery =
    'SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employees';

  connection.query(employeeQuery, (err, employees) => {
    if (err) throw err;

    const employeeChoices = employees.map((employee) => ({
      name: employee.full_name,
      value: employee.id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Select an employee to update their role:",
          choices: employeeChoices,
        },
        {
          type: "input",
          name: "new_role_id",
          message: "Enter the new role ID for the employee:",
        },
      ])
      .then((answers) => {
        const { employee_id, new_role_id } = answers;
        const updateQuery = "UPDATE employees SET role_id = ? WHERE id = ?";

        connection.query(updateQuery, [new_role_id, employee_id], (err) => {
          if (err) throw err;
          console.log("Employee role updated successfully.");
          mainMenu();
        });
      });
  });
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  mainMenu,
};
