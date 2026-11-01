const navegacao = require('../modules/navegacao');
const produtos = require('../modules/produtos');

describe('Catalogo e pesquisa - casos 8 e 9', () => {
  let dados;

  beforeEach(() => {
    cy.fixture('produtos').then((fixture) => { dados = fixture; });
    navegacao.acessarPaginaInicial();
    navegacao.acessarProdutos();
    produtos.validarCatalogo();
  });

  it('TC08 - Conferir o catalogo e todos os detalhes do primeiro produto', () => {
    produtos.abrirPrimeiroProdutoEValidar(dados.primeiroProduto);
  });

  it('TC09 - Pesquisar e conferir todos os produtos encontrados', () => {
    produtos.pesquisarEValidarResultados(dados.pesquisa);
  });
});

