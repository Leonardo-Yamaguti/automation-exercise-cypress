const seletores = {
  carrinho: '#cart_info',
  linhas: '#cart_info tbody tr[id^="product-"]',
  nome: '.cart_description h4 a',
  preco: '.cart_price p',
  quantidade: '.cart_quantity button',
  totalLinha: '.cart_total_price',
  checkout: 'a.check_out',
  entrega: '#address_delivery',
  cobranca: '#address_invoice',
  titulos: '.step-one h2',
  comentario: '.form-control[name="message"]',
  efetuarPedido: 'a[href="/payment"]',
};

function valorMonetario(texto) {
  const partes = texto.match(/\d[\d,]*(?:\.\d+)?/);
  if (!partes) throw new Error('Valor monetario invalido: ' + texto);
  return Number(partes[0].replaceAll(',', ''));
}

function validarItensDoPedido(produtos) {
  cy.get(seletores.linhas).should('have.length', produtos.length);
  produtos.forEach((produto) => {
    const linha = '#product-' + produto.id;
    cy.get(linha + ' ' + seletores.nome).should('have.text', produto.nome);
    cy.get(linha + ' ' + seletores.preco).should(($valor) => {
      expect(valorMonetario($valor.text()), 'preco unitario').to.eq(produto.preco);
    });
    cy.get(linha + ' ' + seletores.quantidade).should(($quantidade) => {
      expect(Number($quantidade.text().trim()), 'quantidade').to.eq(produto.quantidade);
    });
    cy.get(linha + ' ' + seletores.totalLinha).should(($valor) => {
      expect(valorMonetario($valor.text()), 'total do produto')
        .to.eq(produto.preco * produto.quantidade);
    });
  });
}

function validarCarrinho(produtos) {
  cy.location('pathname').should('eq', '/view_cart');
  cy.get(seletores.carrinho).should('be.visible');
  validarItensDoPedido(produtos);
}

function prosseguirParaCheckout() {
  cy.contains(seletores.checkout, 'Proceed To Checkout').click();
  cy.location('pathname').should('eq', '/checkout');
}

function validarEndereco(seletor, usuario) {
  const esperado = [
    usuario.titulo + '. ' + usuario.primeiroNome + ' ' + usuario.sobrenome,
    usuario.empresa, usuario.endereco, usuario.complemento,
    usuario.cidade + ' ' + usuario.estado + ' ' + usuario.cep,
    usuario.pais, usuario.telefone,
  ];
  cy.get(seletor).should('be.visible');
  cy.get(seletor + ' li:not(.address_title)').should(($linhas) => {
    const atual = Array.from($linhas, (el) => el.textContent.replace(/\s+/g, ' ').trim());
    expect(atual, 'endereco completo').to.deep.eq(esperado);
  });
}

function validarCheckout(usuario, produtos) {
  cy.contains(seletores.titulos, 'Address Details').should('be.visible');
  validarEndereco(seletores.entrega, usuario);
  validarEndereco(seletores.cobranca, usuario);
  cy.contains(seletores.titulos, 'Review Your Order').should('be.visible');
  validarItensDoPedido(produtos);
  const totalEsperado = produtos.reduce((soma, produto) => soma + produto.preco * produto.quantidade, 0);
  cy.contains('tr', 'Total Amount').find(seletores.totalLinha).should(($total) => {
    expect(valorMonetario($total.text()), 'total geral').to.eq(totalEsperado);
  });
}

function informarComentarioEConfirmar(comentario) {
  cy.get(seletores.comentario).type(comentario);
  cy.get(seletores.efetuarPedido).click();
  cy.location('pathname').should('eq', '/payment');
}

module.exports = {
  validarCarrinho, prosseguirParaCheckout,
  validarCheckout, informarComentarioEConfirmar,
};

