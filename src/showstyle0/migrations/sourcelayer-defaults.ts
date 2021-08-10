import { ISourceLayer, SourceLayerType } from '@sofie-automation/blueprints-integration'
import { literal } from '../../common/util'
import { SourceLayer } from '../layers'

/**
 * default source layers on sofie's web configuration
 */
export default literal<ISourceLayer[]>([
	{
		_id: SourceLayer.P,
		_rank: 0,
		name: 'P Scritps',
		abbreviation: 'P',
		type: SourceLayerType.CAMERA,
		onPresenterScreen: true,
		isHidden: false,
	},
	{
		_id: SourceLayer.STORYITEM,
		type: SourceLayerType.CAMERA,
		_rank: 0,
		name: 'Story Item',
		abbreviation: 'SI',
		exclusiveGroup: 'pgm',
		activateKeyboardHotkeys: 'f1,f2,f3,f4,f5',
		assignHotkeysToGlobalAdlibs: true,
		onPresenterScreen: true,
		isHidden: false,
	},
])
