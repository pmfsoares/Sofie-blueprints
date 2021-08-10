// possible values of AtemSourceType
export enum AtemSourceType {
	Camera = 'camera',
	Remote = 'remote',
	MediaPlayer = 'mediaplayer',
	Graphics = 'graphics',
}
// declaration of the StudioConfig
export interface StudioConfig {
	atemSources: {
		input: number //aux number, needs a mapping
		type: AtemSourceType
	}[]
	atemOutputs: {
		output: number // aux number, needs a mapping
		source: number // aux number, needs a mapping
	}[]
	previewRenderer?: string
	casparcgLatency: number
}
