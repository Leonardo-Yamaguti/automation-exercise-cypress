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

## Limitação de execução neste ambiente

O download oficial do aplicativo Cypress retornou HTML com a mensagem **Site Unavailable**, em vez do arquivo ZIP. Por isso, o navegador Cypress não pôde ser iniciado neste ambiente.

**Os dez testes E2E ainda não têm aprovação de execução confirmada.** As verificações estáticas e a inspeção da aplicação não equivalem à aprovação da suíte no Cypress.

Não há repositório nem execução no GitHub Actions nesta etapa, conforme a decisão de criar o repositório posteriormente.

## Como concluir a validação

No computador, execute:

```bash
npm ci
npm run verificar
npm test
```

Ou envie o projeto ao GitHub e acompanhe o workflow. Confira a quantidade de testes, as falhas e o relatório real produzido.

Depois de obter uma execução completa, registre o link dela junto do repositório. Eventuais falhas devem ser corrigidas e a suíte novamente executada antes da entrega.

