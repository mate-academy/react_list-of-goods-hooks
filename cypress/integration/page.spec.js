const page = {
  visit() {
    cy.visit('/');
  },

  get startBtn() {
    return cy.contains('button', 'Start');
  },

  get reverseBtn() {
    return cy.contains('button', 'Reverse');
  },

  get sortAlphBtn() {
    return cy.contains('button', 'Sort alphabetically');
  },

  get resetBtn() {
    return cy.contains('button', 'Reset');
  },

  get sortByLengthBtn() {
    return cy.contains('button', 'Sort by length');
  },

  checkGoodsList(items) {
    cy.get('li').each((li, index) => {
      cy.wrap(li)
        .should('contain', items[index]);
    });
  }
};

const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic'
];

describe('Page', () => {
  beforeEach(() => {
    page.visit();

    page.startBtn.click();
  });
  
  it(`should hide 'Start' button after start`, () => {
    page.startBtn.should('not.exist');
  });

  it(`should show the goods in the initial order after clicking on 'Start'`, () => {
    page.checkGoodsList(goodsFromServer);
  });

  it(`should show reversed goods after clicking on 'Reverse'`, () => {
    const reverseListOfGoods = [
      'Garlic',
      'Jam',
      'Honey',
      'Fish',
      'Bread',
      'Apple',
      'Ice cream',
      'Eggs',
      'Carrot',
      'Dumplings'
    ];

    page.reverseBtn.click();

    page.checkGoodsList(reverseListOfGoods);
  });

  it(`should show the goods sorted alphabetically after clicking on 'Sort alphabetically'`, () => {
    const sortedAlphabeticallyGoods = [
      'Apple',
      'Bread',
      'Carrot',
      'Dumplings',
      'Eggs',
      'Fish',
      'Garlic',
      'Honey',
      'Ice cream',
      'Jam'
    ];

    page.sortAlphBtn.click();

    page.checkGoodsList(sortedAlphabeticallyGoods);
  });

  it(`should show the goods sorted by length after clicking on 'Sort by length'`, () => {
    const sortedByLengthGoods = [
      'Jam',
      'Eggs',
      'Fish',
      'Apple',
      'Bread',
      'Honey',
      'Carrot',
      'Garlic',
      'Dumplings',
      'Ice cream'
    ];

    page.sortByLengthBtn.click();

    page.checkGoodsList(sortedByLengthGoods);
  });

  it(`should show the goods in the initial order after clicking on 'Reset'`, () => {
    page.sortByLengthBtn.click();

    page.sortAlphBtn.click();

    page.resetBtn.click();

    page.checkGoodsList(goodsFromServer);
  });
});
