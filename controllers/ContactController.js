const inquirer = require("inquirer");
const Contact = require("../db/models").Contact;

module.exports = class ContactController {
  constructor() {
    this.contacts = [];
    this.addContactQuestions = [
      {
        type: "input",
        name: "name",
        message: "Contact's name - ",
        validate(val) {
          return val !== "";
        }
      },
      {
        type: "input",
        name: "phone",
        messgae: "Contact's phone number - ",
        validate(val) {
          return val !== "";
        }
      },
      {
        type: "input",
        name: "email",
        message: "Contact's e-mail - ",
        validate(val) {
          return val !== "";
        }
      }
    ];
  }

  addContact(name, phone, email) {
    // Sequelize methods (create in this case) return a promise
    return Contact.create({ name, phone, email });
  }
};
