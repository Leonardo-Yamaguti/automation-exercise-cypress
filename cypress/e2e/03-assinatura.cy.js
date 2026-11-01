const navegacao = require('../modules/navegacao');
const assinatura = require('../modules/assinatura');
const { gerarEmailAssinatura } = require('../support/dados');

describe('Assinatura na pagina inicial - caso 10', () => {
  it('TC10 - Assinar novidades pelo rodape da pagina inicial', () => {
    navegacao.acessarPaginaInicial();
    assinatura.assinarNovidades(gerarEmailAssinatura());
  });
});

