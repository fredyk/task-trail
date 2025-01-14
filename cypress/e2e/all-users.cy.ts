describe('Users', () => {

  it('Lists users', () => {

    cy.visit('http://localhost:3000/users')

    cy.get('[data-testid="user"]').should('have.length', 10);

    // first user is Leanne Graham at data-testid="user.name"
    cy.get('[data-testid="user"]').first().find('[data-testid="user.name"]').should('have.text', 'Leanne Graham');

  })

  it('Navigates to create user page', () => {

    cy.visit('http://localhost:3000/users')

    cy.get('a').contains('Add User').click();

    cy.url().should('include', '/users/new');

  })

  it('Creates a user', () => {

    cy.visit('http://localhost:3000/users/new')

    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="phone"]').type('1234567890');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/users');

  });


});