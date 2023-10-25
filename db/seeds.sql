-- Insert sample departments
INSERT INTO departments (id, name) VALUES
  (1, 'HR'),
  (2, 'Finance'),
  (3, 'Engineering');

-- Insert sample roles
INSERT INTO roles (id, title, salary, department_id) VALUES
  (1, 'HR Manager', 60000.00, 1),
  (2, 'Accountant', 50000.00, 2),
  (3, 'Software Engineer', 80000.00, 3),
  (4, 'Sales Manager', 70000.00, 1);

-- Insert sample employees
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jane', 'Smith', 2, NULL),
  (3, 'Bob', 'Johnson', 3, 1),
  (4, 'Alice', 'Brown', 4, NULL);