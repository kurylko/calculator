/// <reference types="cypress" />
import { IFoodItem } from '../../src/interfaces/FoodItem';
import {
  getNutriValuesPerKg,
  INutriScorePerKg,
} from '../../src/utils/getNutriValues';

if (typeof window !== 'undefined') {
  window.getNutriValuesPerKg = getNutriValuesPerKg;
  console.log(
    'getNutriValuesPerKg function attached to window:',
    window.getNutriValuesPerKg,
  );
}

export {};

describe('Calculator test', () => {
  beforeEach(() => {
    cy.visit('/food-info');
    const foodItem: IFoodItem = {
      foodName: 'Test Food',
      fat: '10',
      protein: '20',
      carbohydrate: '30',
      calories: '400',
      weight: '100',
    };

    localStorage.setItem('lastInputFoodItems', JSON.stringify([foodItem]));
  });

  it('Contains correct header text', () => {
    cy.visit('/food-info');
    cy.get('[data-test="test-header"]').contains(/ADD FOOD INFO/i);
  });

  it('Contains correct header1', () => {
    cy.visit('/food-info');
    cy.getDataTest('test-header').contains(/Add food info/i);
  });

  it('should load food items from local storage', () => {
    cy.window().then((win) => {
      const storedItems = localStorage.getItem('lastInputFoodItems');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        expect(parsedItems).to.have.lengthOf.greaterThan(0);
      } else {
        throw new Error('No items found in local storage');
      }
    });
  });

  it('should return correct nutrient values per kg for valid input', () => {
    cy.window().then((win) => {
      expect(win.getNutriValuesPerKg).to.exist;
      expect(win.getNutriValuesPerKg).to.be.a('function');
      console.log('33', window.getNutriValuesPerKg);
      const storedItems = localStorage.getItem('lastInputFoodItems');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        console.log('Stored items:', parsedItems);
        const result = win.getNutriValuesPerKg(parsedItems[0]);

        const expected: INutriScorePerKg = {
          fatValuePerKg: '100',
          proteinValuePerKg: '200',
          carbohydrateValuePerKg: '300',
          caloriesValuePerKg: '4000',
        };

        expect(result).to.deep.equal(expected);
      } else {
        throw new Error('No items found in local storage');
      }
    });
  });
});
