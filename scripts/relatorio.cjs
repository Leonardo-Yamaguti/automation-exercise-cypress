const CASOS_OBRIGATORIOS = ['TC01', 'TC02', 'TC03', 'TC04', 'TC05', 'TC08', 'TC09', 'TC10', 'TC15', 'TC16'];

function coletarTestes(suite) {
  return [
    ...(suite.tests || []).filter((teste) => !teste.isHook),
    ...(suite.suites || []).flatMap(coletarTestes),
  ];
}

function analisarRelatorio(dados) {
  if (!dados?.stats || !Array.isArray(dados.results)) {
    throw new Error('Formato invalido: esperado JSON Mochawesome com stats e results.');
  }
  const stats = {
    tests: dados.stats.tests, passes: dados.stats.passes,
    failures: dados.stats.failures, pending: dados.stats.pending,
    skipped: dados.stats.skipped ?? 0,
  };
  const testes = dados.results.flatMap(coletarTestes);
  const casos = testes.map((teste) => ({
    id: /^TC\d+\b/.exec(teste.title || '')?.[0] || 'SEM_ID',
    titulo: teste.title, estado: teste.state,
    erro: teste.err?.message || '',
  }));
  const erros = [];
  if (!Object.values(stats).every((valor) => Number.isInteger(valor) && valor >= 0)) {
    erros.push('Estatisticas invalidas no relatorio.');
  }
  if (stats.tests !== testes.length || stats.tests !== CASOS_OBRIGATORIOS.length) {
    erros.push('O relatorio deve conter exatamente os dez testes obrigatorios.');
  }
  for (const id of CASOS_OBRIGATORIOS) {
    const encontrados = casos.filter((caso) => caso.id === id);
    if (encontrados.length !== 1) erros.push(id + ': deve aparecer exatamente uma vez.');
    else if (encontrados[0].estado !== 'passed') erros.push(id + ': ' + encontrados[0].estado + '.');
  }
  if (casos.some((caso) => !CASOS_OBRIGATORIOS.includes(caso.id))) {
    erros.push('O relatorio contem casos fora do escopo obrigatorio.');
  }
  if (stats.passes !== CASOS_OBRIGATORIOS.length || stats.failures !== 0 ||
      stats.pending !== 0 || stats.skipped !== 0) {
    erros.push('A entrega exige dez aprovados, sem falhas, pendentes ou ignorados.');
  }
  const problemaDeAcesso = casos.some((caso) =>
    /403:\s*Forbidden|more than \d+ times|request is being verified/i.test(caso.erro));
  return { stats, casos, erros, problemaDeAcesso, completo: erros.length === 0 };
}

function formatarResumo(analise, numeroExecucao = 'N') {
  const { stats, casos } = analise;
  const estados = { passed: 'Aprovado', failed: 'Falhou', pending: 'Pendente', skipped: 'Ignorado' };
  const linhas = [
    '## Automation Exercise - execucao Cypress', '',
    '| Resultado | Quantidade |', '|---|---:|',
    '| Testes previstos | ' + stats.tests + ' |',
    '| Aprovados | ' + stats.passes + ' |',
    '| Falhos | ' + stats.failures + ' |',
    '| Pendentes | ' + stats.pending + ' |',
    '| Ignorados | ' + stats.skipped + ' |', '',
    '| Caso | Resultado |', '|---|---|',
    ...casos.map((caso) => '| ' + caso.id + ' | ' + (estados[caso.estado] || 'Desconhecido') + ' |'), '',
  ];
  if (analise.problemaDeAcesso) {
    linhas.push('Houve acesso recusado ou redirecionamentos repetidos ao abrir a aplicacao. ' +
      'Consulte as capturas e os logs; a aprovacao E2E depende do acesso ao site.', '');
  }
  linhas.push(analise.completo
    ? '**Execucao completa: os dez casos obrigatorios foram aprovados.**'
    : '**Validacao incompleta ou com falhas: confira os casos e os arquivos de relatorio.**', '',
  'Baixe **relatorio-cypress-' + numeroExecucao + '** e abra **reports/relatorio.html**.');
  return linhas.join('\n') + '\n';
}

module.exports = { CASOS_OBRIGATORIOS, analisarRelatorio, formatarResumo };
