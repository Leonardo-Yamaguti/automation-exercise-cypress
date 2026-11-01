const fs = require('node:fs');
const path = require('node:path');

const raiz = path.resolve(__dirname, '..');
for (const diretorio of ['reports', 'screenshots', 'videos']) {
  fs.rmSync(path.join(raiz, 'cypress', diretorio), { recursive: true, force: true });
}
console.log('Relatorios e evidencias de execucoes anteriores removidos.');

