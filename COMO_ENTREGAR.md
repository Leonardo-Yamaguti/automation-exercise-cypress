# Como subir no GitHub e entregar

Repositório deste trabalho: [Leonardo-Yamaguti/automation-exercise-cypress](https://github.com/Leonardo-Yamaguti/automation-exercise-cypress).

## 1. Extrair e conferir

Extraia `automation-exercise-cypress.zip`. Abra a pasta que contém `package.json`, `README.md` e `cypress.config.js`.

O conteúdo dessa pasta deve ficar **na raiz do repositório**, junto da pasta `.github`. Não envie o ZIP como um único arquivo para o GitHub: o Actions precisa enxergar os arquivos extraídos.

## 2. Acessar o repositório

O repositório já foi criado e é público. Use o endereço acima para conferir os arquivos e informar o link na entrega.

Não é necessário criar um fork: este projeto foi desenvolvido do zero.

## 3. Enviar pelo navegador

1. Abra o repositório acima.
2. Se o repositório estiver vazio, clique em **uploading an existing file** na tela inicial. Se já existir algum arquivo, use **Add file → Upload files**. Em telas menores, a opção pode aparecer no botão **+** próximo ao botão **Code**.
3. Arraste todo o conteúdo da pasta extraída para a área de upload, incluindo a pasta `.github`.
4. Confira que `package.json` está na raiz e que existe `.github/workflows/tests.yml`.
5. Faça um commit com a mensagem `test: adicionar automacao dos dez casos obrigatorios`.

Se o navegador não enviar `.github`, crie o arquivo pelo GitHub em **Add file → Create new file**, usando o nome completo `.github/workflows/tests.yml`. Copie o conteúdo do arquivo homônimo que está no ZIP.

## 4. Conferir a pipeline

1. Abra **Actions**.
2. Selecione **Testes Cypress - Automation Exercise**.
3. Para uma execução manual, clique em **Run workflow** e escolha o escopo.
4. **completo** executa a verificação do código e os dez E2E; **codigo** verifica apenas o projeto e deixa o job E2E ignorado.
5. Na execução completa, confira o job **Dez casos obrigatorios**, a etapa **Executar os dez casos** e a validação dos relatórios.
6. Baixe **relatorio-cypress-N**, extraia e abra `reports/relatorio.html`. O resumo deve mostrar dez aprovados e nenhum falho, pendente ou ignorado.
7. O artefato **projeto-cypress-N** contém o ZIP do código; ele é publicado pelo job de verificação.

Se não houver execução, use **Run workflow** na branch principal. Se não aparecer workflow, confira o caminho `.github/workflows/tests.yml`.

Se houver falha, abra o job, veja o primeiro erro e os arquivos do artefato. Envie o erro para correção antes de considerar a entrega validada.

O escopo **codigo** não acessa a aplicação e sua aprovação não significa que os dez E2E passaram. Enquanto o site mostrar verificação de acesso ou HTTP 403, a execução completa depende da liberação pelo responsável pela aplicação.

## 5. Entregar na plataforma

- Faça upload do ZIP do projeto.
- Informe o link do repositório indicado no início deste documento.
- Confira a execução dos dez casos e os relatórios antes do envio final.
- Prazo informado: **31/10/2026, às 23h59min59s, no horário de Brasília**.

O ZIP gerado exclui `node_modules` e inclui `.github`.

## Alternativa pelo terminal

Para editar pelo terminal, clone o repositório:

```bash
git clone https://github.com/Leonardo-Yamaguti/automation-exercise-cypress.git
cd automation-exercise-cypress
```

Copie as alterações para a pasta clonada e confira o que será enviado:

```bash
git status
git add .
git commit -m "fix: ajustar automacao e relatorios"
git push
```

