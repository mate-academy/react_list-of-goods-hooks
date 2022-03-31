Cypress.Commands.add("getByDataCy", (selector) => { 
    cy.get(`[data-cy=${selector}]`)
 });

 Cypress.Commands.add("checkListItems", (selector, listOfGoods) => { 
    cy.getByDataCy(selector).children().each( (item, index) => {

        cy
          .wrap(item)
          .should('contain.text', listOfGoods[index])
        
      })
 });
 