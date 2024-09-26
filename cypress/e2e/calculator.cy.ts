export {}

describe('Calculator test', () => {
  it('Contains correct header text', () => {
    cy.visit('/food-info')
    cy.get('[data-test="test-header"]').contains(/ADD FOOD INFO/i)
  })
})

