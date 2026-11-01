const test = require('node:test');
const assert = require('node:assert/strict');
const { analisarRelatorio, formatarResumo } = require('./relatorio.cjs');
const aprovado = require('./fixtures/relatorio-aprovado.json');
const bloqueado = require('./fixtures/relatorio-bloqueado.json');

// Amostras reduzidas dos JSONs reais das execucoes #1 e #2.
// Testam o validador; nao sao evidencia de aprovacao da versao atual.
const copiar = (dados) => JSON.parse(JSON.stringify(dados));
function testes(dados) {
  return dados.results.flatMap(function coletar(suite) {
    return [...(suite.tests || []), ...(suite.suites || []).flatMap(coletar)];
  });
}

test('aceita a execucao historica completa com os dez IDs aprovados', () => {
  const analise = analisarRelatorio(aprovado);
  assert.equal(analise.completo, true);
  assert.equal(analise.casos.length, 10);
});

test('rejeita o bloqueio real e informa os seis casos ignorados', () => {
  const analise = analisarRelatorio(bloqueado);
  assert.equal(analise.completo, false);
  assert.equal(analise.problemaDeAcesso, true);
  assert.match(formatarResumo(analise), /\| Ignorados \| 6 \|/);
  assert.match(formatarResumo(analise), /\| TC16 \| Ignorado \|/);
});

test('rejeita dez aprovados quando existe ID repetido e outro ausente', () => {
  const dados = copiar(aprovado);
  testes(dados)[0].title = testes(dados)[1].title;
  const analise = analisarRelatorio(dados);
  assert.equal(analise.completo, false);
  assert(analise.erros.some((erro) => erro.startsWith('TC01:')));
});

test('rejeita um caso fora do escopo mesmo com total dez e estatisticas aprovadas', () => {
  const dados = copiar(aprovado);
  testes(dados)[0].title = 'TC99 - Fora do escopo';
  assert.equal(analisarRelatorio(dados).completo, false);
});

test('rejeita um teste pendente mesmo quando as estatisticas dizem dez aprovados', () => {
  const dados = copiar(aprovado);
  testes(dados)[0].state = 'pending';
  assert.equal(analisarRelatorio(dados).completo, false);
});

test('rejeita estatisticas aprovadas quando faltam resultados individuais', () => {
  const dados = copiar(aprovado);
  dados.results = [];
  assert.equal(analisarRelatorio(dados).completo, false);
});

test('rejeita divergencia entre os testes e as estatisticas do reporter', () => {
  const dados = copiar(aprovado);
  dados.stats.failures = 1;
  assert.equal(analisarRelatorio(dados).completo, false);
});

test('recusa JSON sem estrutura Mochawesome', () => {
  assert.throws(() => analisarRelatorio({}), /Formato invalido/);
});
