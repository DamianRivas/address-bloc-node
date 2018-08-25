const inquirer = require("inquirer");
const ContactController = require("./ContactController");

module.exports = class MenuController {
  constructor() {
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "View all contacts",
          "Search for a contact",
          "Exit"
        ]
      }
    ];

    this.book = new ContactController();
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
          case "View all contacts":
            this.getContacts();
            break;
          case "Search for a contact":
            this.search();
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
    inquirer.prompt(this.book.addContactQuestions).then(answers => {
      this.book
        .addContact(answers.name, answers.phone, answers.email)
        .then(contact => {
          console.log("Contact added succesfully!");
          this.main();
        })
        .catch(err => {
          console.log("ERROR:", err);
          this.main();
        });
    });
  }

  getContacts() {
    this.clear();
    this.book
      .getContacts()
      .then(contacts => {
        for (let contact of contacts) {
          this._printContact(contact);
        }
        this.main();
      })
      .catch(err => {
        console.log("ERROR:", err);
        this.main();
      });
  }

  search() {
    this.clear();
    inquirer
      .prompt(this.book.searchQuestions)
      .then(target => {
        this.book.search(target.name).then(contact => {
          if (contact === null) {
            this.clear();
            console.log("Contact not found");
            this.search();
          } else {
            this.showContact(contact);
          }
        });
      })
      .catch(err => {
        console.log("ERROR:", err);
        this.main();
      });
  }

  showContact(contact) {
    this._printContact(contact);
    inquirer
      .prompt(this.book.showContactQuestions)
      .then(answer => {
        switch (answer.selected) {
          case "Delete contact":
            this.delete(contact);
            break;
          case "Main menu":
            this.clear();
            this.main();
            break;
          default:
            console.log("Something went wrong.");
            this.showContact(contact);
        }
      })
      .catch(err => {
        console.log("ERROR:", err);
        this.showContact(contact);
      });
  }

  delete(contact) {
    inquirer
      .prompt(this.book.deleteConfirmQuestions)
      .then(answer => {
        if (answer.confirmation) {
          this.book.delete(contact.id);
          this.clear();
          console.log("Contact deleted.");
          this.main();
        } else {
          console.log("Contact not deleted");
          this.showContact(contact);
        }
      })
      .catch(err => {
        console.log("ERROR:", err);
        this.main();
      });
  }

  _printContact(contact) {
    console.log(`
name: ${contact.name}
phone: ${contact.phone}
email: ${contact.email}
----------------------------`);
  }

  exit() {
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }
};
