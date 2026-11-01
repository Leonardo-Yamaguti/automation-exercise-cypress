const seletores = {
  tituloInicial: '.signup-form h2',
  nomeInicial: '[data-qa="signup-name"]',
  emailInicial: '[data-qa="signup-email"]',
  iniciar: '[data-qa="signup-button"]',
  tituloConta: '.login-form h2',
  tituloMasculino: '#id_gender1',
  tituloFeminino: '#id_gender2',
  nome: '[data-qa="name"]',
  email: '[data-qa="email"]',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  telefone: '[data-qa="mobile_number"]',
  criarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  continuar: '[data-qa="continue-button"]',
  erroEmailExistente: '.signup-form form[action="/signup"] p',
};

function iniciarCadastro(nome, email) {
  cy.get(seletores.tituloInicial).should('be.visible').and('have.text', 'New User Signup!');
  cy.get(seletores.nomeInicial).type(nome);
  cy.get(seletores.emailInicial).type(email);
  cy.get(seletores.iniciar).click();
}

function preencherCadastro(usuario) {
  cy.get(seletores.tituloConta)
    .should('be.visible').and('contain.text', 'Enter Account Information');
  cy.get(usuario.titulo === 'Mr' ? seletores.tituloMasculino : seletores.tituloFeminino).check();
  cy.get(seletores.nome).should('have.value', usuario.nome);
  cy.get(seletores.email).should('have.value', usuario.email);
  cy.get(seletores.senha).type(usuario.senha, { log: false });
  cy.get(seletores.dia).select(usuario.dia);
  cy.get(seletores.mes).select(usuario.mes);
  cy.get(seletores.ano).select(usuario.ano);
  cy.get(seletores.newsletter).check();
  cy.get(seletores.newsletter).should('be.checked');
  cy.get(seletores.ofertas).check();
  cy.get(seletores.ofertas).should('be.checked');
  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.sobrenome).type(usuario.sobrenome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.complemento).type(usuario.complemento);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.telefone).type(usuario.telefone);
  cy.get(seletores.criarConta).click();
}

function validarContaCriadaEContinuar() {
  cy.get(seletores.contaCriada).should('be.visible').and('contain.text', 'Account Created!');
  cy.get(seletores.continuar).click();
  cy.location('pathname').should('eq', '/');
}

function cadastrarUsuario(usuario) {
  iniciarCadastro(usuario.nome, usuario.email);
  preencherCadastro(usuario);
  validarContaCriadaEContinuar();
}

function validarEmailJaCadastrado() {
  cy.get(seletores.erroEmailExistente)
    .should('be.visible').and('have.text', 'Email Address already exist!');
  cy.get(seletores.iniciar).should('be.visible');
}

module.exports = { iniciarCadastro, cadastrarUsuario, validarEmailJaCadastrado };

