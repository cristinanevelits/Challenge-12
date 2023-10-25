const inquirer = require("inquirer");
const { mainMenu } = require("./db");

function startApp() {
  console.log("Welcome to the Employee Management System!");
  mainMenu();
}

startApp();
