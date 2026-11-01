const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

const raiz = path.resolve(__dirname, '..');
const obrigatorios = [1, 2, 3, 4, 5, 8, 9, 10, 15, 16];
const pastaSpecs = path.join(raiz, 'cypress/e2e');
const specs = fs.readdirSync(pastaSpecs).filter((nome) => nome.endsWith('.cy.js'));
const encontrados = [];

for (const nome of specs) {
  const conteudo = fs.readFileSync(path.join(pastaSpecs, nome), 'utf8');
  const ids = Array.from(conteudo.matchAll(/\bit\(\s*['"]TC(\d+)\s*-/g), (m) => Number(m[1]));
  encontrados.push(...ids);
  assert(!/\b(?:it|describe)\.(?:only|skip)\s*\(/.test(conteudo), 'Teste exclusivo ou ignorado em ' + nome);
  assert(!/cy\.(?:get|contains)\s*\(/.test(conteudo), 'Seletor direto na spec ' + nome);
  assert(!/\.(?:should|and)\s*\(|\bexpect\s*\(/.test(conteudo), 'Assercao direta na spec ' + nome);
}
assert.deepEqual(encontrados.sort((a, b) => a-b), obrigatorios, 'Devem existir exatamente os dez casos solicitados');

function arquivosJs(diretorio) {
  return fs.readdirSync(diretorio, { withFileTypes: true }).flatMap((entrada) => {
    const alvo = path.join(diretorio, entrada.name);
    if (entrada.isDirectory()) {
      if (['node_modules', 'reports', 'screenshots', 'videos', 'dist'].includes(entrada.name)) return [];
      return arquivosJs(alvo);
    }
    return /\.(?:c?js)$/.test(entrada.name) ? [alvo] : [];
  });
}
for (const arquivo of arquivosJs(raiz)) {
  const sintaxe = spawnSync(process.execPath, ['--check', arquivo], { encoding: 'utf8' });
  assert.equal(sintaxe.status, 0, sintaxe.stderr);
}
for (const nome of fs.readdirSync(path.join(raiz, 'cypress/fixtures'))) {
  JSON.parse(fs.readFileSync(path.join(raiz, 'cypress/fixtures', nome), 'utf8'));
}
const pkg = JSON.parse(fs.readFileSync(path.join(raiz, 'package.json'), 'utf8'));
const lock = JSON.parse(fs.readFileSync(path.join(raiz, 'package-lock.json'), 'utf8'));
assert.deepEqual(lock.packages[''].devDependencies, pkg.devDependencies, 'Lockfile diferente do package.json');
assert.deepEqual(lock.packages[''].engines, pkg.engines, 'Versao do Node diferente no lockfile');
for (const versao of Object.values(pkg.devDependencies)) {
  assert(/^\d+\.\d+\.\d+$/.test(versao), 'Dependencia deve ter versao exata');
}
const workflow = fs.readFileSync(path.join(raiz, '.github/workflows/tests.yml'), 'utf8');
assert(workflow.includes('workflow_dispatch:'));
assert(workflow.includes('npm ci'));
assert(workflow.includes('npm run test:ci'));
assert(workflow.includes('npm run verificar:relatorio'));
assert(workflow.includes('actions/upload-artifact@'));
assert(workflow.includes('if: always()'));
assert(!workflow.includes('continue-on-error'));
console.log('Entrega verificada: dez casos corretos, sintaxe, fixtures, lockfile e workflow.');
console.log('Esta verificacao estatica nao substitui executar npm test e conferir o relatorio.');

