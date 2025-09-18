/// <reference types="cypress" />

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('by default should show all the goods in the initial order', () => {
    cy.get('.goods-list li').then(($items) => {
      const texts = [...$items].map((el) => el.textContent?.trim());
      expect(texts).to.deep.equal([
        'Bread',
        'Milk',
        'Apples',
        'Cheese',
        'Dumplings',
        'Carrot',
        'Eggs',
      ]);
    });
  });

  it('should sort alphabetically', () => {
    cy.contains('Sort alphabetically').click();

    cy.get('.goods-list li').then(($items) => {
      const texts = [...$items].map((el) => el.textContent?.trim());
      expect(texts).to.deep.equal([
        'Apples',
        'Bread',
        'Carrot',
        'Cheese',
        'Dumplings',
        'Eggs',
        'Milk',
      ]);
    });
  });

  it('should sort by length', () => {
    cy.contains('Sort by length').click();

    cy.get('.goods-list li').then(($items) => {
      const texts = [...$items].map((el) => el.textContent?.trim());
      expect(texts).to.deep.equal([
        'Milk',
        'Eggs',
        'Bread',
        'Carrot',
        'Apples',
        'Cheese',
        'Dumplings',
      ]);
    });
  });

  it('should reverse the order', () => {
    cy.contains('Reverse').click();

    cy.get('.goods-list li').then(($items) => {
      const texts = [...$items].map((el) => el.textContent?.trim());
      expect(texts).to.deep.equal([
        'Eggs',
        'Carrot',
        'Dumplings',
        'Cheese',
        'Apples',
        'Milk',
        'Bread',
      ]);
    });
  });

  it('should reset back to original order', () => {
    cy.contains('Sort alphabetically').click();
    cy.contains('Reset').click();

    cy.get('.goods-list li').then(($items) => {
      const texts = [...$items].map((el) => el.textContent?.trim());
      expect(texts).to.deep.equal([
        'Bread',
        'Milk',
        'Apples',
        'Cheese',
        'Dumplings',
        'Carrot',
        'Eggs',
      ]);
    });
  });
});
