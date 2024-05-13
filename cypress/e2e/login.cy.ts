describe('Sign into Project Board', () => {
  it('Visits the login page', () => {
    cy.visit('/auth/login')
    cy.contains('Sign Into Project Board')
  })

  it('Fails to sign in', () => {
    cy.visit('/auth/login')
    cy.get('ion-input[formControlName=email]').type('sfailla@gmail.com')
    cy.get('ion-input[formControlName=password]').type('password')
    cy.get('ion-button[type=submit]').click()

    cy.contains('User not found with that email')
  })

  it('Successfully signs in', () => {
    cy.visit('/auth/login')
    cy.get('ion-input[formControlName=email]').type('sfailla1983@gmail.com')
    cy.get('ion-input[formControlName=password]').type('1234')
    cy.get('ion-button[type=submit]').click()

    cy.contains('Projects')
    cy.contains('Project Board')
  })
})
