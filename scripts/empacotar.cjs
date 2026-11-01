const fs = require('node:fs');
const path = require('node:path');
const { finished } = require('node:stream/promises');

async function empacotar() {
  const { ZipArchive } = await import('archiver');
  const raiz = path.resolve(__dirname, '..');
  const pasta = path.join(raiz, 'dist');
  fs.mkdirSync(pasta, { recursive: true });
  const destino = path.join(pasta, 'automation-exercise-cypress.zip');
  const saida = fs.createWriteStream(destino);
  const finalizado = finished(saida);
  const arquivo = new ZipArchive({ zlib: { level: 9 } });
  arquivo.on('warning', (erro) => { throw erro; });
  arquivo.on('error', (erro) => { saida.destroy(erro); });
  arquivo.pipe(saida);
  arquivo.glob('**/*', {
    cwd: raiz,
    dot: true,
    ignore: [
      'node_modules/**', 'node_modules',
      '.git/**', '.git', 'dist/**', 'dist',
      'cypress/reports/**', 'cypress/screenshots/**', 'cypress/videos/**',
      '.env', 'cypress.env.json', '*.log',
    ],
  }, { prefix: 'automation-exercise-cypress' });
  await arquivo.finalize();
  await finalizado;
  console.log('ZIP criado sem node_modules: ' + destino);
}

empacotar().catch((erro) => {
  console.error(erro);
  process.exitCode = 1;
});

