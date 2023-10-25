const departmentPrompt = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
      validate: (input) => {
        if (input.trim() === '') {
          return 'Please enter a department name.';
        }
        return true;
      },
    },
  ];
  
  const rolePrompt = [
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
      validate: (input) => {
        if (input.trim() === '') {
          return 'Please enter a role title.';
        }
        return true;
      },
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the salary for this role:',
      validate: (input) => {
        if (isNaN(input) || input <= 0) {
          return 'Please enter a valid salary greater than 0.';
        }
        return true;
      },
    },
    {
      type: 'number',
      name: 'department_id',
      message: 'Enter the department ID for this role:',
      validate: (input) => {
        if (isNaN(input) || input <= 0) {
          return 'Please enter a valid department ID greater than 0.';
        }
        return true;
      },
    },
  ];
  
  const employeePrompt = [
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
      validate: (input) => {
        if (input.trim() === '') {
          return 'Please enter the employee\'s first name.';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
      validate: (input) => {
        if (input.trim() === '') {
          return 'Please enter the employee\'s last name.';
        }
        return true;
      },
    },
    {
      type: 'number',
      name: 'role_id',
      message: 'Enter the role ID for this employee:',
      validate: (input) => {
        if (isNaN(input) || input <= 0) {
          return 'Please enter a valid role ID greater than 0.';
        }
        return true;
      },
    },
    {
      type: 'number',
      name: 'manager_id',
      message: 'Enter the manager\'s ID for this employee (leave blank if none):',
      default: null,
    },
  ];
  
  module.exports = { departmentPrompt, rolePrompt, employeePrompt };
  