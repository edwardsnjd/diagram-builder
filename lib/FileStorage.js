const path = require('path');
const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');

class FileStorage {
    constructor({ inputDir, outputDir }) {
        this.inputDir = inputDir;
        this.outputDir = outputDir;
    }

    getInputFiles() {
        return glob.sync('**/*', { nodir: true, cwd: this.inputDir });
    }

    getInputFilePath(relativePath) {
        return path.resolve(this.inputDir, relativePath);
    }

    getOutputFilePath(relativePath) {
        return path.resolve(this.outputDir, relativePath);
    }

    readInputFile(relativePath) {
        return fs.readFileSync(this.getInputFilePath(relativePath));
    }

    writeOutputFile(relativePath, data) {
        const outputFile = this.getOutputFilePath(relativePath);
        mkdirp.sync(path.dirname(outputFile));
        return fs.writeFileSync(outputFile, data);
    }
};

module.exports = FileStorage;