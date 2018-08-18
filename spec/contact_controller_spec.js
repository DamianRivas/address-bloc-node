const ContactController = require("../controllers/ContactController");
const sequelize = require("../db/models/index").sequelize;

describe("ContactController", () => {
  beforeEach(done => {
    this.book = new ContactController();

    sequelize
      .sync({ force: true })
      .then(res => {
        done();
      })
      .catch(err => {
        done();
      });
  });

  it("should be defined", () => {
    expect(ContactController).toBeDefined();
  });

  describe("#addContact()", () => {
    it("should add a single contact into the book", done => {
      this.book
        .addContact("Alice", "001-101-1010", "hello@world.com")
        .then(contact => {
          // WHAT IS THIS???
          // console.log(contact);
          expect(contact.name).toBe("Alice");
          expect(contact.phone).toBe("001-101-1010");
          expect(contact.email).toBe("hello@world.com");
          done();
        })
        .catch(err => {
          done();
        });
    });
  });
});
