const seletores = {
  titulo: '.features_items > h2.title',
  cartoes: '.features_items .product-image-wrapper',
  primeiroDetalhe: '.features_items .product-image-wrapper .choose a',
  nomeListagem: '.productinfo p',
  pesquisa: '#search_product',
  pesquisar: '#submit_search',
  detalhes: '.product-information',
  nomeDetalhe: '.product-information h2',
  precoDetalhe: '.product-information > span > span',
  modal: '#cartModal',
  continuarComprando: '#cartModal .close-modal',
};

function validarCatalogo() {
  cy.get(seletores.titulo).should('be.visible').and('have.text', 'All Products');
  cy.get(seletores.cartoes).should('have.length.greaterThan', 0);
  cy.get(seletores.cartoes).first().should('be.visible');
}

function abrirPrimeiroProdutoEValidar(produto) {
  cy.get(seletores.primeiroDetalhe).first().click();
  cy.location('pathname').should('eq', '/product_details/' + produto.id);
  cy.get(seletores.detalhes).should('be.visible');
  cy.get(seletores.nomeDetalhe).should('have.text', produto.nome);
  cy.get(seletores.precoDetalhe).should('have.text', 'Rs. ' + produto.preco);
  cy.contains(seletores.detalhes + ' p', 'Category: ' + produto.categoria).should('be.visible');
  cy.contains(seletores.detalhes + ' p', 'Availability: ' + produto.disponibilidade).should('be.visible');
  cy.contains(seletores.detalhes + ' p', 'Condition: ' + produto.condicao).should('be.visible');
  cy.contains(seletores.detalhes + ' p', 'Brand: ' + produto.marca).should('be.visible');
}

function pesquisarEValidarResultados(termo) {
  // A API fornece a lista esperada; a busca e a exibicao sao exercitadas pela interface.
  cy.buscarProdutosPorApi(termo).then((esperados) => {
    cy.get(seletores.pesquisa).type(termo);
    cy.get(seletores.pesquisar).click();
    cy.get(seletores.titulo).should('be.visible').and('have.text', 'Searched Products');
    cy.get(seletores.cartoes).should('have.length', esperados.length);
    cy.get(seletores.cartoes + ' ' + seletores.nomeListagem).should(($nomes) => {
      const exibidos = Array.from($nomes, (el) => el.textContent.trim()).sort();
      const nomesEsperados = esperados.map((produto) => produto.name).sort();
      expect(exibidos, 'todos os produtos encontrados').to.deep.eq(nomesEsperados);
    });
    cy.get(seletores.cartoes).each(($cartao) => {
      cy.wrap($cartao).scrollIntoView();
      cy.wrap($cartao).should('be.visible');
    });
  });
}

function adicionarProdutosAoCarrinho(produtos) {
  produtos.forEach((produto) => {
    const botao = '.features_items .productinfo a.add-to-cart[data-product-id="' + produto.id + '"]';
    const alias = 'adicionarProduto' + produto.id;
    cy.intercept('GET', '**/add_to_cart/' + produto.id).as(alias);
    cy.get(botao).scrollIntoView();
    cy.get(botao).should('be.visible').click();
    cy.wait('@' + alias).its('response.statusCode').should('eq', 200);
    cy.get(seletores.modal).should('be.visible').and('contain.text', 'Added!');
    cy.get(seletores.continuarComprando).click();
    cy.get(seletores.modal).should('not.be.visible');
  });
}

module.exports = {
  validarCatalogo, abrirPrimeiroProdutoEValidar,
  pesquisarEValidarResultados, adicionarProdutosAoCarrinho,
};

