# Como subir no GitHub e entregar

## 1. Extrair e conferir

Extraia `automation-exercise-cypress.zip`. Abra a pasta que contém `package.json`, `README.md` e `cypress.config.js`.

O conteúdo dessa pasta deve ficar **na raiz do repositório**, junto da pasta `.github`. Não envie o ZIP como um único arquivo para o GitHub: o Actions precisa enxergar os arquivos extraídos.

## 2. Criar o repositório

No GitHub, crie um repositório chamado, por exemplo, `automation-exercise-cypress`. Se ele for público, o professor poderá acessá-lo pelo link. Se for privado, será necessário conceder acesso ao avaliador.

Não é necessário criar um fork: este projeto foi desenvolvido do zero.

## 3. Enviar pelo navegador

1. Abra o novo repositório.
2. Se o repositório estiver vazio, clique em **uploading an existing file** na tela inicial. Se já existir algum arquivo, use **Add file → Upload files**. Em telas menores, a opção pode aparecer no botão **+** próximo ao botão **Code**.
3. Arraste todo o conteúdo da pasta extraída para a área de upload, incluindo a pasta `.github`.
4. Confira que `package.json` está na raiz e que existe `.github/workflows/tests.yml`.
5. Faça um commit com a mensagem `test: adicionar automacao dos dez casos obrigatorios`.

Se o navegador não enviar `.github`, crie o arquivo pelo GitHub em **Add file → Create new file**, usando o nome completo `.github/workflows/tests.yml`. Copie o conteúdo do arquivo homônimo que está no ZIP.

## 4. Conferir a pipeline

1. Abra **Actions**.
2. Selecione **Testes Cypress - Automation Exercise**.
3. Aguarde a execução concluir.
4. Confira o status e a etapa **Executar os dez casos**.
5. Baixe o artefato **relatorio-cypress-N**, extraia e abra `relatorio.html`.

Se não houver execução, use **Run workflow** na branch principal. Se não aparecer workflow, confira o caminho `.github/workflows/tests.yml`.

Se houver falha, abra o job, veja o primeiro erro e os arquivos do artefato. Envie o erro para correção antes de considerar a entrega validada.

## 5. Entregar na plataforma

- Faça upload do ZIP do projeto.
- Informe o link real do repositório que você criou.
- Confira a execução dos dez casos e os relatórios antes do envio final.
- Prazo informado: **31/10/2026, às 23h59min59s, no horário de Brasília**.

O link do repositório só existe depois que você criá-lo. Atualize a identificação da entrega com esse endereço.

## Alternativa pelo terminal

Depois de criar um repositório vazio, execute na pasta do projeto:

```bash
git init
git add .
git commit -m "test: adicionar automacao dos dez casos obrigatorios"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

Substitua `URL_DO_SEU_REPOSITORIO` pelo endereço real fornecido pelo GitHub.

