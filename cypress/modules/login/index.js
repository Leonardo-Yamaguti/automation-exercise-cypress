const seletores = {
  titulo: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  entrar: '[data-qa="login-button"]',
  erro: '.login-form form[action="/login"] p',
  sair: '.shop-menu a[href="/logout"]',
  usuario: '.shop-menu li a',
};

function efetuarLogin(email, senha) {
  cy.get(seletores.titulo).should('be.visible').and('have.text', 'Login to your account');
  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha, { log: false });
  cy.get(seletores.entrar).click();
}

function validarCredenciaisInvalidas() {
  cy.get(seletores.erro)
    .should('be.visible').and('have.text', 'Your email or password is incorrect!');
  cy.location('pathname').should('eq', '/login');
}

function efetuarLogout() {
  cy.get(seletores.sair).should('be.visible').click();
  cy.location('pathname').should('eq', '/login');
  cy.get(seletores.titulo).should('be.visible').and('have.text', 'Login to your account');
  cy.get(seletores.sair).should('not.exist');
  cy.contains(seletores.usuario, 'Logged in as').should('not.exist');
}

module.exports = { efetuarLogin, validarCredenciaisInvalidas, efetuarLogout };

