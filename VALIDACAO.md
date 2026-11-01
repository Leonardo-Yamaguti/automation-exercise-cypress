# Verificações da entrega

Data de preparação: 31/10/2026.

## Verificações realizadas

- Requisitos conferidos com o enunciado e o compilado fornecido.
- Casos conferidos na página oficial do Automation Exercise.
- Código modularizado em funções de ações de negócio, com seletores e asserções nos módulos.
- Dependências JavaScript instaladas e versões exatas registradas no lockfile.
- ESLint executado no código.
- Dez IDs obrigatórios verificados, sem cenários exclusivos ou ignorados.
- Sintaxe JavaScript, fixtures e estrutura do workflow verificadas.
- Integração Node do reporter carregada, com os hooks de início e fim de execução registrados.
- Páginas e seletores conferidos no HTML da aplicação pública.
- Criação e limpeza de conta de teste exercitadas contra a API real.
- Login, carrinho, endereços e formulário de pagamento inspecionados com uma conta descartável, excluída ao final.
- Inspeção HTTP/HTML adicional conferiu campos do cadastro, credenciais inválidas, e-mail duplicado, logout, produtos, busca, checkout, pagamento fictício, confirmação do pedido e exclusão da conta. Essa inspeção não executa o navegador nem substitui os testes Cypress.
- ZIP conferido quanto à inclusão de `.github` e exclusão de `node_modules`.

## Conferência dos casos solicitados

Revisão de 01/11/2026 baseada na [página oficial de Test Cases](https://www.automationexercise.com/test_cases). Foram comparados os **113 passos** dos dez casos com os cenários, a preparação de cada teste e as funções chamadas.

| Caso | Passos oficiais conferidos | Spec em `cypress/e2e/` | Módulos em `cypress/modules/` |
|---|---|---|---|
| TC01 | 1–18 | `01-cadastro-login.cy.js` | `navegacao`, `cadastro` |
| TC02 | 1–10 | `01-cadastro-login.cy.js` | `navegacao`, `login` |
| TC03 | 1–8 | `01-cadastro-login.cy.js` | `navegacao`, `login` |
| TC04 | 1–10 | `01-cadastro-login.cy.js` | `navegacao`, `login` |
| TC05 | 1–8 | `01-cadastro-login.cy.js` | `navegacao`, `cadastro` |
| TC08 | 1–9 | `02-produtos.cy.js` | `navegacao`, `produtos` |
| TC09 | 1–8 | `02-produtos.cy.js` | `navegacao`, `produtos` |
| TC10 | 1–7 | `03-assinatura.cy.js` | `navegacao`, `assinatura` |
| TC15 | 1–18 | `04-compras.cy.js` | `navegacao`, `cadastro`, `produtos`, `pedido`, `pagamento` |
| TC16 | 1–17 | `04-compras.cy.js` | `navegacao`, `login`, `produtos`, `pedido`, `pagamento` |

O runner abre o navegador. Cada cenário acessa a página inicial e verifica sua exibição. A criação de contas por API prepara as condições dos casos que exigem usuário existente; os fluxos solicitados de cadastro, login, logout, compra e exclusão continuam sendo realizados pela interface.

Na revisão, foram reforçadas três asserções: visibilidade do título de informações da conta (TC01, também reutilizado pelo TC15) e visibilidade do nome e do preço no detalhe do produto (TC08). Antes, esses pontos conferiam o texto e seus componentes; agora também exigem explicitamente que os elementos estejam visíveis. Os demais passos já estavam cobertos.

## Histórico de execução no GitHub Actions

### Execução #1: versão inicial aprovada

Em **01/11/2026**, a suíte completa foi executada no workflow **Testes Cypress - Automation Exercise**, execução **#1**, sobre o commit `a5485b3f3602510b0306aa48904313f05fc516b3`.

| Resultado | Quantidade |
|---|---:|
| Testes executados | 10 |
| Aprovados | 10 |
| Falhos | 0 |
| Pendentes | 0 |

- Instalação das dependências e do Cypress: aprovada.
- ESLint e verificação dos requisitos: aprovados.
- Os quatro arquivos de testes foram executados contra a aplicação pública.
- Relatórios HTML/JSON e vídeos foram publicados no artefato **relatorio-cypress-1**.
- Os 33 arquivos publicados foram comparados com o projeto preparado, sem diferenças de conteúdo.

[Ver execução e baixar as evidências](https://github.com/Leonardo-Yamaguti/automation-exercise-cypress/actions/runs/41281358544).

[Repositório](https://github.com/Leonardo-Yamaguti/automation-exercise-cypress).

### Execução #2: revisão impedida pela verificação do site

Em **01/11/2026**, o commit `10caa1d08f9b066285edf91b28a2e012d8a0bbd8`, contendo os reforços de visibilidade, foi executado na pipeline. A instalação e a verificação estática passaram, mas a aplicação mostrou uma tela de verificação de requisições, repetiu redirecionamentos para a página inicial e retornou **HTTP 403**.

As capturas do runner mostram a mensagem de verificação e `failedChecks=webdriverCheck`. As falhas ocorreram na abertura da aplicação, antes das novas asserções. A limpeza por API também recebeu HTTP 403. O resumo real do reporter foi:

| Resultado | Quantidade |
|---|---:|
| Testes previstos | 10 |
| Aprovados | 0 |
| Falhos | 4 |
| Pendentes | 0 |
| Ignorados após falha na preparação | 6 |

O artefato **relatorio-cypress-2** contém relatório, capturas e vídeos dessa tentativa. [Ver execução #2 e evidências](https://github.com/Leonardo-Yamaguti/automation-exercise-cypress/actions/runs/41282347190).

O resumo da pipeline foi aprimorado para mostrar também os testes ignorados, distinguindo o total previsto de uma execução completa. Essa alteração foi verificada usando o JSON real da execução #2.

**Situação atual:** a conferência do código cobre os dez casos e seus 113 passos. A versão revisada tem validação E2E pendente, pois o site impediu o acesso nessa tentativa. A aprovação da execução #1 permanece como evidência da versão inicial, não como aprovação das alterações posteriores.

## Execução local e futuras alterações

### Correções posteriores à execução #2

- Corrigida a limpeza dos testes de compra para não chamar a API quando a página inicial falha antes da preparação da conta.
- Os comandos Cypress agora usam Chrome, substituindo Electron, descontinuado como navegador de testes. Essa alteração de manutenção não comprova resolução do bloqueio de acesso.
- Cache e upload de artefatos atualizados para `actions/cache@v6` e `actions/upload-artifact@v7`.
- Criado validador que exige exatamente os dez IDs, cada um uma única vez e aprovado, além dos arquivos HTML/JSON.
- O resumo agora lista o resultado por caso e identifica execuções incompletas.
- Criados oito testes locais do validador, usando amostras reduzidas dos relatórios reais das execuções #1 e #2. Os oito passaram localmente.
- Adicionado escopo manual **codigo**, que verifica o projeto e gera seu ZIP sem acessar o site. O escopo **completo** continua sendo o padrão e executa os dez E2E.

Os arquivos em `scripts/fixtures/` servem para testar o validador. Não são relatórios de execução da versão atual. A aprovação E2E dessa versão continua pendente até a aplicação permitir acesso.

### Execução #3: verificação de código aprovada

Em **01/11/2026**, a [execução #3](https://github.com/Leonardo-Yamaguti/automation-exercise-cypress/actions/runs/41284338528), sobre o commit `2399c6ce6448996c5f51f24683b986339fbda3ff` e no escopo **codigo**, concluiu com sucesso:

- instalação das dependências de verificação;
- ESLint e oito testes do validador, todos aprovados;
- conferência dos dez IDs obrigatórios, sintaxe, fixtures, lockfile e workflow;
- geração e publicação do ZIP em **projeto-cypress-3**.

O job **Dez casos obrigatorios** foi **ignorado** por escolha explícita do escopo. A execução #3 não acessou a aplicação e não comprova aprovação E2E das correções. Os 37 arquivos do repositório foram comparados com a cópia local, sem diferenças, antes desta atualização de documentação.

Na preparação local, o download oficial do aplicativo Cypress retornou HTML com a mensagem **Site Unavailable**, em vez do ZIP. A execução inicial aprovada foi realizada no runner do GitHub, onde a instalação funcionou. Os resultados de cada versão estão registrados separadamente acima.

Para repetir no computador:

```bash
npm ci
npm run verificar
npm test
```

Também é possível executar novamente pela aba **Actions**, selecionando o workflow e **Run workflow**. Mudanças futuras no código devem ser validadas em nova execução; o resultado acima registra a versão identificada pelo commit.

