describe('MMM-Hello-World-Ts', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('greetings message is displayed', () => {
    cy.get('div[id$="MMM-Hello-World-Ts"] > div > div > div[class="bright light medium green"]')
      .should('have.text', 'MMM-Hello-World-Ts says: Hello world Ismar!')
      .should('be.visible')
  })
})
