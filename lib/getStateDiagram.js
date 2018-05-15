const smcat = require('state-machine-cat');
const svg2png = require('svg2png');

/**
 * Generate a state diagram.
 * 
 * @return Promise<{data, mimeType}> of the diagram.
 */
function getStateDiagram(diagramText, {format, direction}={}) {
    const diagramDirection = direction || 'left-right';
    const diagramFormat = format || 'png';

    if (diagramFormat != 'png') {
        return Promise.reject(`Unsupported format '${diagramFormat}'`);
    }
    
    const mimeType = 'image/png';

    return buildSvg(diagramText, { outputType: 'svg', direction: diagramDirection })
        .then(svg2png)
        .then(data => ({data, mimeType}));
}

function buildSvg(diagramText, opts) {
    try {
        const svg = smcat.render(diagramText, opts);
        return Promise.resolve(svg);
    } catch (e) {
        return Promise.reject(e);
    }
}

module.exports = getStateDiagram;