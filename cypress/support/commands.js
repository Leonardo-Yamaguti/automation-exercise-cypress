function interpretarResposta(resposta) {
  expect(resposta.status, 'status HTTP da API').to.eq(200);
  return typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body;
}

function dadosParaApi(usuario) {
  return {
    name: usuario.nome, email: usuario.email, password: usuario.senha,
    title: usuario.titulo, birth_date: usuario.dia,
    birth_month: usuario.mes, birth_year: usuario.ano,
    firstname: usuario.primeiroNome, lastname: usuario.sobrenome,
    company: usuario.empresa, address1: usuario.endereco,
    address2: usuario.complemento, country: usuario.pais,
    zipcode: usuario.cep, state: usuario.estado,
    city: usuario.cidade, mobile_number: usuario.telefone,
  };
}

Cypress.Commands.add('criarUsuarioPorApi', (usuario) => {
  return cy.request({
    method: 'POST', url: '/api/createAccount', form: true,
    body: dadosParaApi(usuario), log: false,
  }).then((resposta) => {
    const corpo = interpretarResposta(resposta);
    expect(corpo.responseCode, 'conta de pre-condicao criada').to.eq(201);
    expect(corpo.message).to.eq('User created!');
    return usuario;
  });
});

Cypress.Commands.add('excluirUsuarioPorApi', (usuario) => {
  // Limpeza restrita a contas geradas por este projeto.
  expect(usuario.email).to.match(/^tcc-cypress-\d+-\d+@example\.com$/);
  return cy.request({
    method: 'DELETE', url: '/api/deleteAccount', form: true,
    body: { email: usuario.email, password: usuario.senha }, log: false,
  }).then((resposta) => {
    const corpo = interpretarResposta(resposta);
    // 404 significa que o proprio cenario ja excluiu a conta, ou nao chegou a cria-la.
    expect(corpo.responseCode, 'limpeza idempotente da conta').to.be.oneOf([200, 404]);
    return corpo;
  });
});

Cypress.Commands.add('buscarProdutosPorApi', (termo) => {
  return cy.request({
    method: 'POST', url: '/api/searchProduct', form: true,
    body: { search_product: termo },
  }).then((resposta) => {
    const corpo = interpretarResposta(resposta);
    expect(corpo.responseCode, 'consulta de referencia da busca').to.eq(200);
    expect(corpo.products).to.be.an('array').and.not.be.empty;
    return corpo.products;
  });
});

