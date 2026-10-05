describe('MMM-Hello-World-Ts', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  function assertIndependentGreetings() {
    cy.get('.MMM-Hello-World-Ts .green').should('have.length', 2)
    cy.get('.MMM-Hello-World-Ts .green')
      .eq(0)
      .should('have.text', 'MMM-Hello-World-Ts says: Hello world Ismar!')
      .should('be.visible')
    cy.get('.MMM-Hello-World-Ts .green')
      .eq(1)
      .should('have.text', 'MMM-Hello-World-Ts says: Hello second instance!')
      .should('be.visible')
  }

  it('renders separate greetings for two configured instances', () => {
    assertIndependentGreetings()
    cy.get('.MMM-Hello-World-Ts').should('not.contain.text', 'Invalid Date')
  })

  it('keeps instance data independent after a polling update', () => {
    assertIndependentGreetings()
    cy.get('.MMM-Hello-World-Ts .teal')
      .first()
      .invoke('text')
      .then((initialTimestamp) => {
        // The final query owns the retry timeout; allow a full 10-second polling cycle.
        cy.get('.MMM-Hello-World-Ts .teal').first({ timeout: 15000 }).should('not.have.text', initialTimestamp)
        assertIndependentGreetings()
      })
  })
})
