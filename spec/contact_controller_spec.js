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
        .addContact("Alice", "001-101-1010")
        .then(contact => {
          // WHAT IS THIS???
          // console.log(contact);
          expect(contact.name).toBe("Alice");
          expect(contact.phone).toBe("001-101-1010");
          done();
        })
        .catch(err => {
          done();
        });
    });
  });

  describe("#getContacts()", () => {
    it("should return an empty array when no contacts are available", done => {
      this.book
        .getContacts()
        .then(contacts => {
          expect(contacts.length).toBe(0);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("should return an array of contacts when contacts are available", done => {
      this.book
        .addContact("Alice", "001-101-1010", "alice@example.com")
        .then(() => {
          this.book.getContacts().then(contacts => {
            expect(contacts.length).toBe(1);
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("#search", () => {
    const zelda = ["Zelda Smith", "000-100-1111", "zelda@nintendo.com"];

    it("should return null when a contact was not found", done => {
      this.book.addContact(...zelda).then(() => {
        this.book
          .search("Solid Snake")
          .then(contact => {
            expect(contact).toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("#delete()", () => {
    it("should not remove any contacts that do not match the ID passed", done => {
      this.book
        .addContact("Rick Deckard", "000-000-0000", "null@null.com")
        .then(() => {
          this.book.getContacts().then(contacts => {
            expect(contacts[0].name).toBe("Rick Deckard");
            expect(contacts.length).toBe(1);
            this.book
              .delete(99)
              .then(() => {
                this.book.getContacts().then(contacts => {
                  expect(contacts.length).toBe(1);
                  done();
                });
              })
              .catch(err => {
                console.log("ERROR:", err);
                done();
              });
          });
        });
    });

    it("should remove the contact that matches the ID passed", done => {
      this.book
        .addContact("Rick Deckard", "000-000-0000", "null@null.com")
        .then(contact => {
          this.book.getContacts().then(contacts => {
            expect(contacts[0].name).toBe("Rick Deckard");
            expect(contacts.length).toBe(1);
            this.book.delete(contact.id).then(() => {
              this.book
                .getContacts()
                .then(contacts => {
                  expect(contacts.length).toBe(0);
                  done();
                })
                .catch(err => {
                  console.log("ERROR:", err);
                  done();
                });
            });
          });
        });
    });
  });
});
