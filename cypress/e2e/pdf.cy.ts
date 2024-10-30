/// <reference types="cypress" />
export {};

describe('PDF Export Button', () => {
  beforeEach(() => {
    cy.visit('/food-info');
  });

  it('Pdf button should not be visible when no food items are added', () => {
    cy.window().then((win) => {
      win.localStorage.removeItem('lastInputFoodItems');
    });

    cy.get('button').contains('Export as Pdf').should('not.exist');
  });

  it('should be visible when food items are added', () => {
    const foodItems = [
      {
        foodName: 'Banana',
        fat: '0.3',
        protein: '1.3',
        carbohydrate: '22.8',
        calories: '96',
        weight: '120',
      },
    ];
    cy.window().then((win) => {
      win.localStorage.setItem('lastInputFoodItems', JSON.stringify(foodItems));
    });
    cy.reload();

    cy.get('button').contains('Export as Pdf').should('be.visible');

    cy.get('button').contains('Export as Pdf').click();

    cy.get('button').contains('Export as Pdf').should('be.visible').click();
  });
});
