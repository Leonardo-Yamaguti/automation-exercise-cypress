# Automation Exercise - Trabalho de Conclusão

Projeto individual de Leonardo Alan Yamaguti da Silva para Automação Web com Cypress.

**Execução inicial em 01/11/2026:** os dez testes passaram no GitHub Actions, sem falhas ou testes pendentes. [Ver execução #1 e relatórios](https://github.com/Leonardo-Yamaguti/automation-exercise-cypress/actions/runs/41281358544).

**Estado da revisão:** os 113 passos dos dez casos foram conferidos e três asserções de visibilidade foram reforçadas. A [execução #2](https://github.com/Leonardo-Yamaguti/automation-exercise-cypress/actions/runs/41282347190) encontrou uma tela de verificação do site, redirecionamentos repetidos e HTTP 403: houve quatro casos com falha no acesso e seis ignorados. A versão revisada ainda depende de nova execução E2E quando o site permitir o acesso. O resultado aprovado da execução #1 refere-se à versão inicial. Veja [VALIDACAO.md](VALIDACAO.md).

Implementa os casos **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16** da aplicação fictícia [Automation Exercise](https://automationexercise.com/test_cases).

**Verificação de código aprovada:** a [execução #4](https://github.com/Leonardo-Yamaguti/automation-exercise-cypress/actions/runs/41285513035), no escopo **codigo**, aprovou a instalação, ESLint, os 12 testes do validador e de seu comando, a conferência de estrutura e a geração do ZIP. A correção que impede anunciar aprovação sem HTML está incluída. O job dos dez E2E ficou ignorado nesse escopo; essa aprovação é parcial.

## Começar

Instale **Node.js 24 LTS** e **Google Chrome**. Na pasta que contém `package.json`:

```bash
npm ci
npm run verificar
npm test
```

Para acompanhar pelo navegador do Cypress:

```bash
npm run cy:open
```

O projeto usa Cypress 16.2.1 e cypress-mochawesome-reporter 5.0.0. As versões diretas estão fixadas, com `package-lock.json` incluído. Node.js 22.13 ou superior da série 22 também é aceito.

A instalação do Cypress precisa de acesso à internet para baixar o aplicativo oficial. Os testes precisam acessar a aplicação pública.

## Casos implementados

| Caso | Comportamento |
|---|---|
| TC01 | Cadastro completo, preferências, autenticação e exclusão da conta. |
| TC02 | Login válido e exclusão da conta. |
| TC03 | Rejeição de credenciais inválidas. |
| TC04 | Logout com retorno ao formulário de login. |
| TC05 | Rejeição de e-mail já cadastrado. |
| TC08 | Catálogo e dados completos do primeiro produto. |
| TC09 | Busca e conferência de todos os resultados. |
| TC10 | Assinatura de novidades pelo rodapé da página inicial. |
| TC15 | Cadastro antes do checkout, compra completa e exclusão da conta. |
| TC16 | Login antes do checkout, compra completa e exclusão da conta. |

Os testes de compra adicionam dois produtos e conferem endereço de entrega, endereço de cobrança, preços, quantidades, total por item e total geral.

## Organização

| Pasta/arquivo | Responsabilidade |
|---|---|
| `cypress/e2e/` | Cenários e orquestração das ações. |
| `cypress/modules/` | Ações de negócio, seletores e asserções por funcionalidade. |
| `cypress/fixtures/` | Dados fictícios de usuários, produtos e pagamento. |
| `cypress/support/commands.js` | Preparação e limpeza pela API; consulta de referência da busca. |
| `cypress/support/dados.js` | E-mails únicos para cada execução. |
| `cypress.config.js` | Configuração do runner e dos relatórios. |
| `.github/workflows/tests.yml` | Execução e publicação de relatórios no GitHub Actions. |
| `scripts/` | Verificação da entrega, resumo e empacotamento. |
| `scripts/relatorio.test.cjs` | Oito testes locais do validador de relatórios. |
| `scripts/resumo-ci.test.cjs` | Quatro testes do comando de validação e do resumo publicado. |
| `scripts/fixtures/` | Amostras reduzidas de relatórios históricos para testar o validador. |

A arquitetura usa funções e `module.exports` em módulos de ações de negócio, conforme a abordagem dos exemplos disponibilizados. As specs não contêm seletores nem asserções.

Os seletores priorizam `data-qa`, IDs, atributos semânticos e escopo do componente. Não há XPath, testes exclusivos ou ignorados, cliques forçados, pausas fixas ou supressão global dos erros da aplicação.

## Dados e independência

Cada teste começa em um contexto isolado, com e-mail exclusivo no domínio de exemplo `example.com`. Os casos que exigem usuário já existente criam sua própria conta pela API. Login, logout, cadastro, compras e exclusões previstos nos cenários continuam sendo exercitados pela interface.

A limpeza posterior usa a API e é restrita ao prefixo de contas geradas por este projeto. Aceita conta já excluída, permitindo que o cenário faça a exclusão pela interface. Nenhuma conta fixa de aluno ou professor é utilizada.

Os testes de compra só solicitam limpeza depois que o cenário inicia a preparação da conta. Uma falha na abertura da página inicial não dispara uma exclusão desnecessária.

Os dados de pagamento são fictícios e destinam-se exclusivamente à aplicação de estudos.

A busca compara os produtos da interface com a resposta real da API de pesquisa. Não há substituição das respostas de cadastro, catálogo, login, carrinho ou pagamento por dados simulados.

## Relatórios

Depois de `npm test`, abra:

```text
cypress/reports/relatorio.html
```

O Mochawesome gera HTML e JSON, com os resultados reais da execução. Falhas geram screenshots; vídeos ficam disponíveis no resultado do runner. O relatório incorpora os screenshots e usa assets locais.

O arquivo HTML é gerado pelo runner quando a suíte é executada; um relatório de aprovação não é criado artificialmente no código-fonte.

Confira também o resultado e os arquivos obrigatórios:

```bash
npm run verificar:relatorio
```

Esse comando retorna erro se faltar HTML/JSON, se algum dos dez IDs estiver ausente ou repetido, ou se houver falhas, pendências ou testes ignorados. O resumo da pipeline mostra o resultado de cada caso e só anuncia aprovação completa quando também existe HTML não vazio.

Para excluir resultados anteriores:

```bash
npm run limpar:relatorios
```

## Executar partes da suíte

```bash
npm run test:cadastro
npm run test:produtos
npm run test:assinatura
npm run test:compras
npm run test:chrome
```

Os comandos de execução e a pipeline usam Google Chrome, que deve estar instalado. Em `npm run cy:open`, selecione Chrome. O uso de Chrome acompanha a recomendação atual do Cypress, pois Electron está descontinuado como navegador de testes.

Os doze testes de `npm run test:unit` verificam o validador de relatórios e seu comando: aprovação histórica, casos ausentes ou repetidos, falhas, testes ignorados e HTML/JSON ausentes. Usam amostras dos JSONs reais das execuções #1 e #2 em pastas temporárias; esses arquivos não representam aprovação da versão atual nem substituem os dez E2E.

## GitHub Actions

O workflow roda em `push`, `pull_request` e execução manual (`workflow_dispatch`), em Ubuntu 24.04 e Node.js 24. Não exige Cypress Cloud, chave de gravação nem secrets.

O job **Codigo e testes do validador** instala as dependências de verificação, executa ESLint, os doze testes do validador e de seu comando, confere a estrutura e publica o ZIP em **projeto-cypress-N**.

Em seguida, o job **Dez casos obrigatorios** executa o Cypress e exige dez casos aprovados e relatórios HTML/JSON. Relatórios, screenshots e vídeos são publicados em **relatorio-cypress-N**, também após falha quando há arquivos gerados.

Na execução manual, escolha o escopo:

- **completo** (padrão): verifica o código e executa os dez E2E. É também o comportamento de push e pull request.
- **codigo**: verifica o projeto sem acessar a aplicação e deixa o job E2E ignorado. Uma execução verde nesse modo confirma apenas a verificação do código.

Enquanto a aplicação exigir verificação de acesso ou retornar HTTP 403, a aprovação E2E permanece pendente. O modo **codigo** permite verificar as correções locais sem fazer novas requisições ao site bloqueado.

Os artefatos ficam disponíveis por 14 dias. O resumo aparece na página da execução.

Consulte [COMO_ENTREGAR.md](COMO_ENTREGAR.md) para enviar os arquivos pelo navegador.

## Gerar outro ZIP

```bash
npm run verificar
npm run empacotar
```

O ZIP será criado em `dist/automation-exercise-cypress.zip`, sem `node_modules`, `.git`, resultados antigos ou credenciais locais. A pasta `.github` é incluída.

## Observações do ambiente

A aplicação pública pode apresentar indisponibilidade, lentidão e anúncios. A configuração bloqueia somente domínios de publicidade de terceiros. As asserções aguardam o comportamento esperado, e o runner permite uma nova tentativa por teste, registrando as tentativas no relatório.

A página de pagamento exibe uma confirmação antes de navegar para a página de pedido concluído. A automação confere esse evento e a confirmação final.

Veja [VALIDACAO.md](VALIDACAO.md) para o histórico e o alcance de cada verificação.

## Referências

- [Casos da aplicação](https://automationexercise.com/test_cases)
- [APIs da aplicação](https://automationexercise.com/api_list)
- [Documentação Cypress](https://docs.cypress.io/)
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter)
- Enunciado e compilado de perguntas e respostas fornecidos para o trabalho.

