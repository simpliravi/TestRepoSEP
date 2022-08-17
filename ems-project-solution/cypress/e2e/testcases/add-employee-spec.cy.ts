describe('Add Employee Test', () => {
    it('adding a new employee navigates to employees url', () => {
      cy.visit('http://localhost:4200/employee-add')
  
      cy.get('input[formcontrolname=first_name]').type('Anna')
      cy.get('input[formcontrolname=last_name]').type('Elie')
      cy.get('input[formcontrolname=email]').type('anna.elie@example.com')
      cy.get('#btnAdd').click()
  
      // Should be on a new URL which
      cy.url().should('include', '/employees')
    })
  })