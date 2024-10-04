/// <reference types="cypress" />
export {};

describe("form test", () => {
  beforeEach(() => {
    cy.visit("/food-info");
  });
  it("test food input form", () => {
    cy.contains(/add food/i);
  });

  it("should fill out the form fields and submit", () => {
    cy.get('input[name="foodName"]')
      .should("be.visible")
      .type("Beans")
      .should("have.value", "Beans");

    cy.get('input[name="fat"]')
      .should("be.visible")
      .type("1.1")
      .should("have.value", "1.1");

    cy.get('input[name="protein"]')
      .should("be.visible")
      .type("1.3")
      .should("have.value", "1.3");

    cy.get('input[name="carbohydrate"]')
      .should("be.visible")
      .type("22.8")
      .should("have.value", "22.8");

    cy.get('input[name="calories"]')
      .should("be.visible")
      .type("96")
      .should("have.value", "96");

    cy.get('input[name="weight"]')
      .should("be.visible")
      .type("120")
      .should("have.value", "120");

    cy.get("form").submit();
  });
});
