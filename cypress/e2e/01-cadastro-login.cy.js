const navegacao = require('../modules/navegacao');
const cadastro = require('../modules/cadastro');
const login = require('../modules/login');
const { gerarUsuario } = require('../support/dados');

describe('Cadastro e autenticacao - casos 1, 2, 3, 4 e 5', () => {
  let usuario;
  let limparConta;

  beforeEach(() => {
    limparConta = false;
    cy.fixture('usuario').then((base) => { usuario = gerarUsuario(base); });
    navegacao.acessarPaginaInicial();
  });

  afterEach(() => {
    if (limparConta) cy.excluirUsuarioPorApi(usuario);
  });

  it('TC01 - Cadastrar usuario completo e excluir a conta', () => {
    limparConta = true;
    navegacao.acessarCadastroLogin();
    cadastro.cadastrarUsuario(usuario);
    navegacao.validarUsuarioAutenticado(usuario.nome);
    navegacao.excluirContaPelaInterface();
    navegacao.continuarDepoisDaExclusao();
  });

  it('TC02 - Entrar com credenciais corretas e excluir a conta', () => {
    limparConta = true;
    cy.criarUsuarioPorApi(usuario);
    navegacao.acessarCadastroLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    navegacao.validarUsuarioAutenticado(usuario.nome);
    navegacao.excluirContaPelaInterface();
  });

  it('TC03 - Rejeitar email e senha incorretos', () => {
    navegacao.acessarCadastroLogin();
    login.efetuarLogin(usuario.email, 'SenhaIncorreta2026!');
    login.validarCredenciaisInvalidas();
  });

  it('TC04 - Efetuar logout e retornar para o login', () => {
    limparConta = true;
    cy.criarUsuarioPorApi(usuario);
    navegacao.acessarCadastroLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    navegacao.validarUsuarioAutenticado(usuario.nome);
    login.efetuarLogout();
  });

  it('TC05 - Impedir cadastro com email ja existente', () => {
    limparConta = true;
    cy.criarUsuarioPorApi(usuario);
    navegacao.acessarCadastroLogin();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.validarEmailJaCadastrado();
  });
});

