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
      }
    ];
    this.searchQuestions = [
      {
        type: "input",
        name: "name",
        message: "Name of contact to search - ",
        validate(val) {
          return val !== "";
        }
      }
    ];
    this.showContactQuestions = [
      {
        type: "list",
        name: "selected",
        message: "Please choose from an option below: ",
        choices: ["Delete contact", "Main menu"]
      }
    ];
    this.deleteConfirmQuestions = [
      {
        type: "confirm",
        name: "confirmation",
        message: "Are you sure you want to delete this contact?"
      }
    ];
  }

  addContact(name, phone) {
    // Sequelize methods (create in this case) return a promise
    return Contact.create({ name, phone });
  }

  getContacts() {
    return Contact.findAll();
  }

  delete(id) {
    return Contact.destroy({
      where: { id }
    });
  }

  search(name) {
    return Contact.findOne({
      where: { name }
    });
  }
};
