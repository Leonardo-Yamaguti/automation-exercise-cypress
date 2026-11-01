function gerarUsuario(base) {
  return {
    ...base,
    email: 'tcc-cypress-' + Date.now() + '-' +
      Cypress._.random(100000, 999999999) + '@example.com',
  };
}

function gerarEmailAssinatura() {
  return 'tcc-cypress-assinatura-' + Date.now() + '-' +
    Cypress._.random(100000, 999999999) + '@example.com';
}

module.exports = { gerarUsuario, gerarEmailAssinatura };

