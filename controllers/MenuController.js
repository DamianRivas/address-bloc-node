const inquirer = require("inquirer");

module.exports = class MenuController {
  constructor() {
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: ["Add new contact", "Print date", "Exit"]
      }
    ];

    this.contacts = [];
  }

  main() {
    console.log("Welcome to AddressBloc!");
    inquirer
      .prompt(this.mainMenuQuestions)
      .then(response => {
        switch (response.mainMenuChoice) {
          case "Add new contact":
            this.addContact();
            break;
          case "Print date":
            this.getDate();
            break;
          case "Exit":
            this.exit();
            break;
          default:
            console.log("Invalid input");
            break;
        }
      })
      .catch(err => {});
  }

  clear() {
    console.log("\x1Bc");
  }

  addContact() {
    this.clear();
    console.log("addContact called");
    this.main();
  }

  getDate() {
    this.clear();
    const date = new Date();
    console.log(`Current Date: ${date.toLocaleString("en-US")}`);
    this.main();
  }

  exit() {
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }
};
