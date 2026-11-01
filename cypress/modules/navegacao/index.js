const seletores = {
  cabecalho: '#header',
  vitrine: '.features_items',
  tituloVitrine: '.features_items > h2.title',
  login: '.shop-menu a[href="/login"]',
  produtos: '.shop-menu a[href="/products"]',
  carrinho: '.shop-menu a[href="/view_cart"]',
  usuario: '.shop-menu li a',
  excluirConta: '.shop-menu a[href="/delete_account"]',
  sair: '.shop-menu a[href="/logout"]',
  contaExcluida: '[data-qa="account-deleted"]',
  continuar: '[data-qa="continue-button"]',
};

function acessarPaginaInicial() {
  cy.visit('/');
  cy.location('pathname').should('eq', '/');
  cy.get(seletores.cabecalho).should('be.visible');
  cy.get(seletores.vitrine).should('be.visible');
  cy.get(seletores.tituloVitrine).should('contain.text', 'Features Items');
}

function acessarCadastroLogin() {
  cy.get(seletores.login).should('be.visible').click();
  cy.location('pathname').should('eq', '/login');
}

function acessarProdutos() {
  cy.get(seletores.produtos).should('be.visible').click();
  cy.location('pathname').should('eq', '/products');
}

function acessarCarrinho() {
  cy.get(seletores.carrinho).should('be.visible').click();
  cy.location('pathname').should('eq', '/view_cart');
}

function validarUsuarioAutenticado(nome) {
  cy.contains(seletores.usuario, 'Logged in as ' + nome).should('be.visible');
  cy.get(seletores.sair).should('be.visible');
}

function excluirContaPelaInterface() {
  cy.get(seletores.excluirConta).should('be.visible').click();
  cy.get(seletores.contaExcluida)
    .should('be.visible').and('contain.text', 'Account Deleted!');
}

function continuarDepoisDaExclusao() {
  cy.get(seletores.continuar).should('be.visible').click();
  cy.location('pathname').should('eq', '/');
}

module.exports = {
  acessarPaginaInicial, acessarCadastroLogin, acessarProdutos, acessarCarrinho,
  validarUsuarioAutenticado, excluirContaPelaInterface, continuarDepoisDaExclusao,
};

