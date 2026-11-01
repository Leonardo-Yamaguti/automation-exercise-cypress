const navegacao = require('../modules/navegacao');
const cadastro = require('../modules/cadastro');
const login = require('../modules/login');
const produtos = require('../modules/produtos');
const pedido = require('../modules/pedido');
const pagamento = require('../modules/pagamento');
const { gerarUsuario } = require('../support/dados');

describe('Compras completas - casos 15 e 16', () => {
  let usuario;
  let listaProdutos;
  let dadosPagamento;
  let limparConta;

  beforeEach(() => {
    usuario = undefined;
    limparConta = false;
    cy.fixture('usuario').then((base) => { usuario = gerarUsuario(base); });
    cy.fixture('produtos').then((dados) => { listaProdutos = dados.compra; });
    cy.fixture('pagamento').then((dados) => { dadosPagamento = dados; });
    navegacao.acessarPaginaInicial();
  });

  afterEach(() => {
    if (limparConta && usuario) cy.excluirUsuarioPorApi(usuario);
  });

  function concluirCompra() {
    navegacao.acessarProdutos();
    produtos.validarCatalogo();
    produtos.adicionarProdutosAoCarrinho(listaProdutos);
    navegacao.acessarCarrinho();
    pedido.validarCarrinho(listaProdutos);
    pedido.prosseguirParaCheckout();
    pedido.validarCheckout(usuario, listaProdutos);
    pedido.informarComentarioEConfirmar(dadosPagamento.comentario);
    pagamento.pagarEValidarPedido(dadosPagamento);
    navegacao.excluirContaPelaInterface();
    navegacao.continuarDepoisDaExclusao();
  }

  it('TC15 - Cadastrar usuario antes do checkout e concluir a compra', () => {
    navegacao.acessarCadastroLogin();
    limparConta = true;
    cadastro.cadastrarUsuario(usuario);
    navegacao.validarUsuarioAutenticado(usuario.nome);
    concluirCompra();
  });

  it('TC16 - Fazer login antes do checkout e concluir a compra', () => {
    limparConta = true;
    cy.criarUsuarioPorApi(usuario);
    navegacao.acessarCadastroLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    navegacao.validarUsuarioAutenticado(usuario.nome);
    concluirCompra();
  });
});

