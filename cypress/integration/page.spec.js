/* eslint-disable */ 
/// <reference types="Cypress" />
/* eslint-enable */

const initialGoods = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

describe('Page', () => {
  before(() => {
    cy.visit('/');
  });

  it(`should have 'Start' button on start`, () => {
    cy.getByDataCy('start').should('exist');
  });

  it(`should show the goods in the initial order after clicking on 'Start'`, () => {
    cy.getByDataCy('start').click();

    cy.checkListItems('goods', initialGoods);
  });

  it(`should hide 'Start' button after clicking`, () => {
    cy.getByDataCy('start').should('not.exist');
  });

  it('should have buttons', () => {
    cy.getByDataCy('reverse').should('exist');
    cy.getByDataCy('sortAlphabetically').should('exist');
    cy.getByDataCy('sortByLength').should('exist');
    cy.getByDataCy('reset').should('exist');
  });

  it(`should show reversed goods after clicking on 'Reverse'`, () => {
    const reverseListOfGoods = [...initialGoods].reverse();

    cy.getByDataCy('reverse').click();

    cy.checkListItems('goods', reverseListOfGoods);
  });

  it(`should show the goods in the initial order after clicking on 'Reset'`, () => {
    cy.getByDataCy('reverse').click();

    cy.checkListItems('goods', initialGoods);
  });

  it(`should show the goods sorted alphabetically after clicking on 'Sort alphabetically'`, () => {
    cy.getByDataCy('reset').click();

    const sortedGoods = [...initialGoods].sort((g1, g2) => g1.localeCompare(g2));

    cy.getByDataCy('sortAlphabetically').click();

    cy.checkListItems('goods', sortedGoods);
  });

  it(`should show the goods sorted by length after clicking on 'Sort by length'`, () => {
    cy.getByDataCy('reset').click();

    const sortedGoods = [...initialGoods].sort((g1, g2) => g1.length - g2.length);

    cy.getByDataCy('sortByLength').click();

    cy.checkListItems('goods', sortedGoods);
  });

  it(`should show the goods sorted by length in descending order after clicking on 'Sort by length' and 'Reverse'`, () => {
    cy.getByDataCy('reset').click();

    const sortedGoods = [...initialGoods].sort((g1, g2) => g1.length - g2.length);
    sortedGoods.reverse();

    cy.getByDataCy('sortByLength').click();
    cy.getByDataCy('reverse').click();

    cy.checkListItems('goods', sortedGoods);
  });

  it('should show the goods sorted by length and alphabetically', () => {
    cy.getByDataCy('reset').click();

    const sortedGoods = [...initialGoods].sort((g1, g2) => {
      if (g1.length === g2.length) {
        return g1.localeCompare(g2);
      }

      return g1.length - g2.length;
    });

    cy.getByDataCy('sortAlphabetically').click();
    cy.getByDataCy('sortByLength').click();

    cy.checkListItems('goods', sortedGoods);
  });

  it(`additionally should have '<select>' with numbers from 1 to 10 (1 is default)`, () => {
    cy.getByDataCy('select').should('exist');

    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    cy.getByDataCy('option').then(selectorOptions => {
      console.log(selectorOptions);

      const actual = [...selectorOptions].map(o => +o.value)
      expect(actual).to.deep.eq(options)
    })

    cy.getByDataCy('select').should('have.value', 1);
  });

  it(`additionally should show goods with length >= value of '<select>'`, () => {
    cy.getByDataCy('reset').click();

    let selectedOption = 10;

    cy.getByDataCy('select').select(selectedOption.toString());

    cy.getByDataCy('goods')
      .children()
      .should('not.exist');

    selectedOption = 9;

    cy.getByDataCy('select').select(selectedOption.toString());

    const goods = [...initialGoods].filter(g => g.length >= selectedOption);

    cy.checkListItems('goods', goods);
  });

  it(`additionally should set the default value to the '<select>' when clicking on 'Reset'`, () => {
    cy.getByDataCy('reset').click();

    const selectedOption = 5;

    cy.getByDataCy('select').select(selectedOption.toString());

    cy.getByDataCy('reset').click();

    cy.checkListItems('goods', initialGoods);
  });
});
