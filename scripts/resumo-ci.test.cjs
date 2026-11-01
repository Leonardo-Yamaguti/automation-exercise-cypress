const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

// Executa o CLI em uma pasta temporaria. As amostras historicas e o HTML
// minimo verificam somente o processamento do relatorio, sem executar E2E.
function comRelatorio(amostra, html, verificar) {
  const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'ae-resumo-ci-'));
  try {
    const scripts = path.join(pasta, 'scripts');
    const relatorios = path.join(pasta, 'cypress/reports');
    fs.mkdirSync(scripts, { recursive: true });
    fs.mkdirSync(relatorios, { recursive: true });
    for (const arquivo of ['resumo-ci.cjs', 'relatorio.cjs']) {
      fs.copyFileSync(path.join(__dirname, arquivo), path.join(scripts, arquivo));
    }
    if (amostra) {
      fs.copyFileSync(path.join(__dirname, 'fixtures', amostra), path.join(relatorios, 'relatorio.json'));
    }
    if (html !== undefined) fs.writeFileSync(path.join(relatorios, 'relatorio.html'), html);
    const resumo = path.join(pasta, 'resumo.md');
    const executar = (validar = true) => spawnSync(process.execPath,
      [path.join(scripts, 'resumo-ci.cjs'), ...(validar ? ['--validar'] : [])], {
        encoding: 'utf8', env: { ...process.env, GITHUB_STEP_SUMMARY: resumo, GITHUB_RUN_NUMBER: 'teste-unitario' },
      });
    verificar(executar, resumo);
  } finally {
    fs.rmSync(pasta, { recursive: true, force: true });
  }
}

const htmlDeTeste = '<!doctype html><title>Amostra para teste do CLI; nao e evidencia E2E</title>';

test('CLI aceita os dez aprovados historicos com HTML presente', () => {
  comRelatorio('relatorio-aprovado.json', htmlDeTeste, (executar) => {
    const resultado = executar();
    assert.equal(resultado.status, 0, resultado.stderr);
    assert.match(resultado.stdout, /Execucao completa: os dez casos obrigatorios foram aprovados/);
  });
});

test('CLI e resumo nao aprovam JSON completo se o HTML estiver ausente ou vazio', () => {
  for (const html of [undefined, '']) {
    comRelatorio('relatorio-aprovado.json', html, (executar, resumo) => {
      const validacao = executar();
      assert.equal(validacao.status, 1);
      assert.match(validacao.stdout, /Relatorio HTML ausente ou vazio/);
      assert.doesNotMatch(validacao.stdout, /Execucao completa:/);
      const publicacao = executar(false);
      assert.equal(publicacao.status, 0, publicacao.stderr);
      const conteudo = fs.readFileSync(resumo, 'utf8');
      assert.equal(conteudo.trimEnd(), publicacao.stdout.trimEnd());
      assert.match(conteudo, /Relatorio HTML ausente ou vazio/);
      assert.doesNotMatch(conteudo, /Execucao completa:/);
    });
  }
});

test('CLI rejeita a execucao historica bloqueada com quatro falhos e seis ignorados', () => {
  comRelatorio('relatorio-bloqueado.json', htmlDeTeste, (executar) => {
    const resultado = executar();
    assert.equal(resultado.status, 1);
    assert.match(resultado.stdout, /\| Falhos \| 4 \|/);
    assert.match(resultado.stdout, /\| Ignorados \| 6 \|/);
    assert.match(resultado.stdout, /\| TC16 \| Ignorado \|/);
    assert.doesNotMatch(resultado.stdout, /Execucao completa:/);
  });
});

test('CLI rejeita relatorio JSON ausente sem anunciar aprovacao', () => {
  comRelatorio(undefined, htmlDeTeste, (executar) => {
    const resultado = executar();
    assert.equal(resultado.status, 1);
    assert.match(resultado.stdout, /Relatorio ausente ou invalido/);
    assert.doesNotMatch(resultado.stdout, /Execucao completa:/);
  });
});
