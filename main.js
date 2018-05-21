const FileStorage = require('./lib/FileStorage');
const getSequenceDiagram = require('./lib/getSequenceDiagram');
const getStateDiagram = require('./lib/getStateDiagram');

const DIAGRAM_TYPES = {
  sequence: 'sequence',
  state: 'state',
  unknown: 'unknown',
};

function findDiagramTypeByExtension(relativePath, storage) {
  const extension = storage.getExtension(relativePath);
  const extensions = {
    [DIAGRAM_TYPES.sequence]: '.wsd',
    [DIAGRAM_TYPES.state]: '.state',
  };
  const diagramType = Object.keys(extensions).find(type => extensions[type] === extension);
  return diagramType || DIAGRAM_TYPES.unknown;
}

function findGenerator(diagramType) {
  const generators = {
    [DIAGRAM_TYPES.sequence]: generateSequenceDiagram,
    [DIAGRAM_TYPES.state]:    generateStateDiagram,
  };
  return generators[diagramType];
}

const SequenceDiagramCommentRegex = /^#/;
const generateSequenceDiagram = (diagramText) => {
  const directives = findDirectives(diagramText, SequenceDiagramCommentRegex);
  const defaults = {format: 'png', style: 'modern-blue'};
  return getSequenceDiagram(diagramText, Object.assign(defaults, directives));
};

const StateDiagramCommentRegex = /^\/\//;
const generateStateDiagram = (diagramText) => {
  const directives = findDirectives(diagramText, StateDiagramCommentRegex);
  const defaults = {format: 'png', direction: 'left-right'};
  return getStateDiagram(diagramText, Object.assign(defaults, directives));
};

const DirectiveRegEx = /\s*diagramBuilder-(\S+)\s*:\s*(\S+)\s*$/;
const findDirectives = (diagramText, commentRegex) =>
  diagramText
    .split('\n')
    .filter(line => line.match(commentRegex))
    .map(line => line.match(DirectiveRegEx))
    .filter(Boolean)
    .map(([_, directive, value]) => ({directive, value}))
    .reduce((acc, item) => {
      acc[item.directive] = item.value;
      return acc;
    }, {});

function handleDiagram(relativePath, storage) {
  console.log('Processing file', relativePath);
  const diagramType = findDiagramTypeByExtension(relativePath, storage);
  const generator = findGenerator(diagramType);

  if (!generator) {
    return Promise.reject(`No diagram generator found for file '${relativePath}' (type: '${diagramType}')`);
  }

  const diagramText = storage.readInputFile(relativePath);
  return generator(diagramText)
    .then(({data}) => storage.writeOutputFile(`${relativePath}.png`, data));
}

function main(inputDir, outputDir) {
  const storage = new FileStorage({ inputDir, outputDir });

  return storage.getInputFiles()
    .reduce(
      (p, relativePath) =>
        p.catch(console.error)
          .then(() => handleDiagram(relativePath, storage)),
      Promise.resolve()
    );
}

module.exports = main;