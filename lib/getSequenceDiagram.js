const wsd = require('websequencediagrams');

/**
 * Generate a sequence diagram.
 * 
 * @return Promise<{data, mimeType}> of the diagram.
 */
function getSequenceDiagram(diagramText, {style, format}={}) {
    const diagramStyle = style || 'napkin';
    const diagramFormat = format || 'png';

    return new Promise((res, rej) => {
        wsd.diagram(diagramText, diagramStyle, diagramFormat, (err, data, mimeType) => {
            if (err) rej(err);
            else res({data, mimeType});
        });
    });
}

module.exports = getSequenceDiagram;