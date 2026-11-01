const seletores = {
  rodape: '#footer',
  titulo: '#footer .single-widget h2',
  email: '#susbscribe_email',
  enviar: '#subscribe',
  sucesso: '#success-subscribe .alert-success',
};

function assinarNovidades(email) {
  cy.get(seletores.rodape).scrollIntoView();
  cy.get(seletores.titulo).should('be.visible').and('have.text', 'Subscription');
  cy.get(seletores.email).type(email);
  cy.get(seletores.enviar).click();
  cy.get(seletores.sucesso)
    .should('be.visible').and('have.text', 'You have been successfully subscribed!');
}

module.exports = { assinarNovidades };

