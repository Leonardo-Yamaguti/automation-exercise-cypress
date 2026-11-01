const fs = require('node:fs');
const path = require('node:path');

const pasta = path.resolve(__dirname, '../cypress/reports');
const resumo = ['## Automation Exercise - execucao Cypress', ''];
const arquivos = fs.existsSync(pasta)
  ? fs.readdirSync(pasta).filter((nome) => nome.endsWith('.json'))
  : [];
const candidato = arquivos.find((nome) => nome === 'relatorio.json') || arquivos[0];

if (candidato) {
  const dados = JSON.parse(fs.readFileSync(path.join(pasta, candidato), 'utf8'));
  if (dados.stats) {
    resumo.push('| Resultado | Quantidade |', '|---|---:|',
      '| Testes | ' + dados.stats.tests + ' |',
      '| Aprovados | ' + dados.stats.passes + ' |',
      '| Falhos | ' + dados.stats.failures + ' |',
      '| Pendentes | ' + dados.stats.pending + ' |', '');
  }
}
if (!candidato) {
  resumo.push('Nenhum relatorio foi gerado. Confira as etapas anteriores do job.', '');
}
resumo.push('Baixe o artefato **relatorio-cypress** desta execucao e abra **relatorio.html**.');
const texto = resumo.join('\n') + '\n';
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, texto);
console.log(texto);

