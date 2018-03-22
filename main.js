const FileStorage = require('./lib/FileStorage');
const getSequenceDiagram = require('./lib/getSequenceDiagram');

function main(inputDir, outputDir) {
  const storage = new FileStorage({ inputDir, outputDir });
  return storage.getInputFiles()
    .reduce(
      (p, relativePath) => p.then(() => handleSequenceDiagram(relativePath, storage, {style: 'modern-blue'})),
      Promise.resolve()
    );
}

function handleSequenceDiagram(relativePath, storage, opts={}) {
  console.log('Processing file', relativePath);
  const diagramText = storage.readInputFile(relativePath);

  return getSequenceDiagram(diagramText, opts)
    .then(({data}) => storage.writeOutputFile(`${relativePath}.png`, data));
}

module.exports = main;