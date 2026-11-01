const fs = require('node:fs');
const path = require('node:path');
const { analisarRelatorio, formatarResumo } = require('./relatorio.cjs');

const pasta = path.resolve(__dirname, '../cypress/reports');
const validar = process.argv.includes('--validar');
let texto;

try {
  const dados = JSON.parse(fs.readFileSync(path.join(pasta, 'relatorio.json'), 'utf8'));
  const analise = analisarRelatorio(dados);
  texto = formatarResumo(analise, process.env.GITHUB_RUN_NUMBER || 'N');
  if (validar) {
    const html = path.join(pasta, 'relatorio.html');
    if (!fs.existsSync(html) || fs.statSync(html).size === 0) {
      analise.erros.push('Relatorio HTML ausente ou vazio.');
    }
    if (analise.erros.length) {
      texto += '\nValidacao da entrega:\n' + analise.erros.map((erro) => '- ' + erro).join('\n') + '\n';
      process.exitCode = 1;
    }
  }
} catch (erro) {
  texto = '## Automation Exercise - execucao nao comprovada\n\n' +
    'Relatorio ausente ou invalido. Confira as etapas anteriores do job.\n\n' + erro.message + '\n';
  if (validar) process.exitCode = 1;
}

if (!validar && process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, texto);
}
console.log(texto);

