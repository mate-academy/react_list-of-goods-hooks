describe('Page', () => {
  const NOT_ACTIVE_CLASS = 'is-light';

  const page = {
    sortAlphButton: () => cy.get('[data-cy="sort-alphabetical"]'),
    sortByLengthButton: () => cy.get('[data-cy="sort-length"]'),
    reverseButton: () => cy.get('[data-cy="sort-reverse"]'),
    resetButton: () => cy.get('[data-cy="reset"]'),
    goods: () => cy.get('[data-cy="Good"]'),

    assertFirstGoods: (first, second, third) => {
      page.goods().eq(0).should('have.text', first);
      page.goods().eq(1).should('have.text', second);
      page.goods().eq(2).should('have.text', third);
    },
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should properly sort alphabetically after reverse', () => {
    // Lista inicial
    page.assertFirstGoods('Dumplings', 'Carrot', 'Eggs');

    // Clicar em Reverse
    page.reverseButton().click();

    // Aguarda e verifica o primeiro item após Reverse
    page.goods().first().should('have.text', 'Garlic');

    // Clicar para ordenar alfabeticamente
    page.sortAlphButton().click();

    // Aguarda a lista reordenada e verifica se está ordenada alfabeticamente
    page.goods().then($goods => {
      const texts = Array.from($goods).map(el => el.textContent);
      const sorted = [...texts].sort((a, b) => a.localeCompare(b));

      expect(texts).to.deep.equal(sorted);
      expect(texts[0]).to.equal('Apple');
      expect(texts[1]).to.equal('Bread');
      expect(texts[2]).to.equal('Carrot');
    });

    // Verifica se o botão de ordenação está ativo e o botão de reset aparece
    page.sortAlphButton().should('not.have.class', NOT_ACTIVE_CLASS);
    page.resetButton().should('exist');
  });
});
