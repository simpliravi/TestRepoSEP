describe('List Employee Test', () => {
    it('should list the employees with length more than 5', () => {
      cy.visit('http://localhost:4200/employees')
      cy.get('.table > tbody > tr').should('have.length.greaterThan', 5)
    })
  })