//SourceLayers, layer mappings on web interface must match these
export enum SourceLayer {
	P = 'p',
	STORYITEM = 'storyItem',
	SCRIPT = 'script',
}

//OutputLayers, layer mappings on web interface must match these
export enum OutputLayer {
	Pgm = 'pgm',
	P = 'p',
	STORYITEM = 'storyItem',
	SCRIPT = 'script',
}
//get correspondent OuputLayer for part depending on the SourceLayer, both are linked to the layer mappings on the web configuration
export function getOutputLayerForSourceLayer(layer: SourceLayer): OutputLayer {
	switch (layer) {
		case SourceLayer.P:
			return OutputLayer.P
		case SourceLayer.STORYITEM:
			return OutputLayer.STORYITEM
		case SourceLayer.SCRIPT:
			return OutputLayer.SCRIPT
		default:
			return OutputLayer.Pgm
	}
}
