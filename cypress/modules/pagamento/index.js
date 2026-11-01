const seletores = {
  nome: '[data-qa="name-on-card"]',
  numero: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mes: '[data-qa="expiry-month"]',
  ano: '[data-qa="expiry-year"]',
  pagar: '[data-qa="pay-button"]',
  sucessoAntesDaNavegacao: '#success_message',
  confirmado: '[data-qa="order-placed"]',
  formulario: '#form',
};

function pagarEValidarPedido(pagamento) {
  cy.get(seletores.nome).type(pagamento.nomeCartao);
  cy.get(seletores.numero).type(pagamento.numeroCartao, { log: false });
  cy.get(seletores.cvc).type(pagamento.cvc, { log: false });
  cy.get(seletores.mes).type(pagamento.mes);
  cy.get(seletores.ano).type(pagamento.ano);
  // O site mostra esta mensagem no submit e imediatamente troca de pagina.
  // Conferimos o estado real antes da navegacao, sem atrasar ou simular respostas.
  let mensagemExibida = false;
  cy.window().then((janela) => {
    cy.on('window:before:unload', () => {
      if (mensagemExibida) return;
      const mensagem = janela.document.querySelector(seletores.sucessoAntesDaNavegacao);
      expect(mensagem, 'mensagem de sucesso antes da navegacao').to.exist;
      expect(mensagem.textContent.replace(/\s+/g, ' ').trim())
        .to.eq('Your order has been placed successfully!');
      expect(janela.getComputedStyle(mensagem).display, 'mensagem visivel').not.to.eq('none');
      mensagemExibida = true;
    });
  });
  cy.get(seletores.pagar).click();
  cy.then(() => {
    expect(mensagemExibida, 'confirmacao exibida no envio do pagamento').to.eq(true);
  });
  cy.location('pathname').should('match', /^\/payment_done\/\d+$/);
  cy.get(seletores.confirmado).should('be.visible').and('contain.text', 'Order Placed!');
  cy.contains(seletores.formulario + ' p', 'Congratulations! Your order has been confirmed!')
    .should('be.visible');
}

module.exports = { pagarEValidarPedido };

