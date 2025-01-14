describe('Tasks', () => {

  it('Lists tasks for user 1', () => {

    cy.visit('http://localhost:3000/users/1')

    cy.get('[data-testid="task"]').should('have.length', 20);

    cy.get('[data-testid="task"]').first().find('[data-testid="task.title"]').should('have.text', 'delectus aut autem');
    cy.get('[data-testid="task"]').first().find('[data-testid="task.description"]').should('have.text', 'Description for task 1');

  })

  it('Creates a task for user 1', () => {

    cy.visit('http://localhost:3000/users/1')

    cy.get('input[name="title"]').type('New Task');
    cy.get('input[name="description"]').type('Description for new task');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/users/1');

  });

});