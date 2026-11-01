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

## Execução E2E confirmada no GitHub Actions

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

## Execução local e futuras alterações

Na preparação local, o download oficial do aplicativo Cypress retornou HTML com a mensagem **Site Unavailable**, em vez do ZIP. A execução completa acima foi realizada no runner do GitHub, onde a instalação funcionou. A validação E2E confirmada é a dessa execução, não apenas a inspeção estática.

Para repetir no computador:

```bash
npm ci
npm run verificar
npm test
```

Também é possível executar novamente pela aba **Actions**, selecionando o workflow e **Run workflow**. Mudanças futuras no código devem ser validadas em nova execução; o resultado acima registra a versão identificada pelo commit.

