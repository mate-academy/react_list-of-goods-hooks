const page = {
  sortAlphButton: () => cy.contains('button', 'Sort alphabetically'),
  sortByLengthButton: () => cy.contains('button', 'Sort by length'),
  reverseButton: () => cy.contains('button', 'Reverse'),
  resetButton: () => cy.contains('button', 'Reset'),
  goods: () => cy.byDataCy('Good'),

  assertFirstGoods: (first, second, third) => {
    page.goods().eq(0).should('have.text', first);
    page.goods().eq(1).should('have.text', second);
    page.goods().eq(2).should('have.text', third);
  }
};

const NOT_ACTIVE_CLASS = 'is-light';

let failed = false;

Cypress.on('fail', (e) => {
  failed = true;
  throw e;
});

describe('Page', () => {
  beforeEach(() => {
    if (failed) Cypress.runner.stop();

    cy.visit('/');
  });

  describe('by default', () => {
    it('should show all the goods in the initial order', () => {
      page.goods().should('have.length', 10);
      page.assertFirstGoods('Dumplings', 'Carrot', 'Eggs');
    });

    it('should not show "Reset" button', () => {
      page.resetButton().should('not.exist');
    });

    it('should have not active "Sort alphabetically" button', () => {
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have not active "Sort by length" button', () => {
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have not active "Reverse" button', () => {
      page.reverseButton().should('have.class', NOT_ACTIVE_CLASS);
    });
  });

  describe('after pressing "Reverse"', () => {
    beforeEach(() => {
      page.reverseButton().click();
    });

    it(`should reverse goods`, () => {
      page.assertFirstGoods('Garlic', 'Jam', 'Honey');
    });

    it('should show "Reset" button', () => {
      page.resetButton().should('exist');
    });

    it('should have not active "Sort alphabetically" button', () => {
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have not active "Sort by length" button', () => {
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have active "Reverse" button', () => {
      page.reverseButton().should('not.have.class', NOT_ACTIVE_CLASS);
    });

    it('should allow to sort alphabetically', () => {
      page.sortAlphButton().click();

      page.assertFirstGoods('Jam', 'Ice cream', 'Honey');
      page.reverseButton().should('not.have.class', NOT_ACTIVE_CLASS);
      page.sortAlphButton().should('not.have.class', NOT_ACTIVE_CLASS);
    });

    it('should allow to sort by length', () => {
      page.sortByLengthButton().click();

      page.assertFirstGoods('Ice cream', 'Dumplings', 'Garlic');
      page.reverseButton().should('not.have.class', NOT_ACTIVE_CLASS);
      page.sortByLengthButton().should('not.have.class', NOT_ACTIVE_CLASS);
    });

    it('should allow to reset', () => {
      page.resetButton().click()

      page.assertFirstGoods('Dumplings', 'Carrot', 'Eggs');
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
      page.reverseButton().should('have.class', NOT_ACTIVE_CLASS);
      page.resetButton().should('not.exist');
    });
  });

  describe('after double reverse', () => {
    beforeEach(() => {
      page.reverseButton().click();
      page.reverseButton().click();
    });

    it(`should show goods in the original order`, () => {
      page.assertFirstGoods('Dumplings', 'Carrot', 'Eggs');
    });

    it('should not show "Reset" button', () => {
      page.resetButton().should('not.exist');
    });

    it('should have not active "Sort alphabetically" button', () => {
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have not active "Sort by length" button', () => {
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have not active "Reverse" button', () => {
      page.reverseButton().should('have.class', NOT_ACTIVE_CLASS);
    });
  });

  describe('after pressing "Sort alphabetically"', () => {
    beforeEach(() => {
      page.sortAlphButton().click();
    });

    it(`should sort goods alphabetically`, () => {
      page.assertFirstGoods('Apple', 'Bread', 'Carrot');
    });

    it('should show "Reset" button', () => {
      page.resetButton().should('exist');
    });

    it('should have active "Sort alphabetically" button', () => {
      page.sortAlphButton().should('not.have.class', NOT_ACTIVE_CLASS);
    });

    it('should have not active "Sort by length" button', () => {
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have not active "Reverse" button', () => {
      page.reverseButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should allow to reset', () => {
      page.resetButton().click()

      page.assertFirstGoods('Dumplings', 'Carrot', 'Eggs');
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
      page.reverseButton().should('have.class', NOT_ACTIVE_CLASS);
      page.resetButton().should('not.exist');
    });
  });

  describe('after "Sort alphabetically" and reverse', () => {
    beforeEach(() => {
      page.sortAlphButton().click();
      page.reverseButton().click();
    });

    it(`should reverse goods sorted alphabetically`, () => {
      page.assertFirstGoods('Jam', 'Ice cream', 'Honey');
    });

    it('should show "Reset" button', () => {
      page.resetButton().should('exist');
    });

    it('should have active "Sort alphabetically" button', () => {
      page.sortAlphButton().should('not.have.class', NOT_ACTIVE_CLASS);
    });

    it('should have not active "Sort by length" button', () => {
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have active "Reverse" button', () => {
      page.reverseButton().should('not.have.class', NOT_ACTIVE_CLASS);
    });

    it('should allow to reverse again', () => {
      page.reverseButton().click();
      
      page.assertFirstGoods('Apple', 'Bread', 'Carrot');
    });

    it('should allow to reset', () => {
      page.resetButton().click()

      page.assertFirstGoods('Dumplings', 'Carrot', 'Eggs');
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
      page.reverseButton().should('have.class', NOT_ACTIVE_CLASS);
      page.resetButton().should('not.exist');
    });
  });

  describe('after pressing "Sort by length"', () => {
    beforeEach(() => {
      page.sortByLengthButton().click();
    });

    it(`should sort goods by length`, () => {
      page.assertFirstGoods('Jam', 'Eggs', 'Fish');
    });

    it('should show "Reset" button', () => {
      page.resetButton().should('exist');
    });

    it('should have not active "Sort alphabetically" button', () => {
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have active "Sort by length" button', () => {
      page.sortByLengthButton().should('not.have.class', NOT_ACTIVE_CLASS);
    });

    it('should have not active "Reverse" button', () => {
      page.reverseButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should allow to reset', () => {
      page.resetButton().click()

      page.assertFirstGoods('Dumplings', 'Carrot', 'Eggs');
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
      page.reverseButton().should('have.class', NOT_ACTIVE_CLASS);
      page.resetButton().should('not.exist');
    });
  });

  describe('after "Sort by length" and reverse', () => {
    beforeEach(() => {
      page.sortByLengthButton().click();
      page.reverseButton().click();
    });

    it(`should reverse goods sorted by length`, () => {
      page.assertFirstGoods('Ice cream', 'Dumplings', 'Garlic');
    });

    it('should show "Reset" button', () => {
      page.resetButton().should('exist');
    });

    it('should not have active "Sort alphabetically" button', () => {
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
    });

    it('should have active "Sort by length" button', () => {
      page.sortByLengthButton().should('not.have.class', NOT_ACTIVE_CLASS);
    });

    it('should have active "Reverse" button', () => {
      page.reverseButton().should('not.have.class', NOT_ACTIVE_CLASS);
    });

    it('should allow to reverse again', () => {
      page.reverseButton().click();
      
      page.assertFirstGoods('Jam', 'Eggs', 'Fish');
    });

    it('should allow to reset', () => {
      page.resetButton().click()

      page.assertFirstGoods('Dumplings', 'Carrot', 'Eggs');
      page.sortAlphButton().should('have.class', NOT_ACTIVE_CLASS);
      page.sortByLengthButton().should('have.class', NOT_ACTIVE_CLASS);
      page.reverseButton().should('have.class', NOT_ACTIVE_CLASS);
      page.resetButton().should('not.exist');
    });
  });
});
