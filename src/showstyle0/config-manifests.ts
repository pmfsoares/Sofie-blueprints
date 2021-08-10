import { ConfigManifestEntry, ConfigManifestEntryType } from '@sofie-automation/blueprints-integration'

/**
 * Studio » Blueprint Configuration on web interface - http://192.168.242.129:7000/settings/showStyleBase/show0
 */
export const showStyleConfigManifest: ConfigManifestEntry[] = [
	{
		id: 'dummyEntry',
		name: 'Dummy entry',
		description: 'example',
		type: ConfigManifestEntryType.BOOLEAN,
		required: false,
		defaultVal: false,
	},
]
