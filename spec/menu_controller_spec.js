const MenuController = require("../controllers/MenuController");

describe("Menucontroller", () => {
  beforeEach(() => {
    this.menu = new MenuController();
  });

  describe("#getContactCount()", () => {
    it("should return 0 when no contacts are in the book", () => {
      expect(this.menu.getContactCount()).toBe(0);
    });

    it("should return 1 when one contact is in the book", () => {
      this.menu.contacts.push("Bob");
      expect(this.menu.getContactCount()).toBe(1);
    });
  });
});
