import { IOutputLayer } from '@sofie-automation/blueprints-integration'
import { literal } from '../../common/util'
import { OutputLayer } from '../layers'
/**
 * default output layers on sofie's web configuration
 */
export default literal<IOutputLayer[]>([
	{
		_id: OutputLayer.P,
		name: 'Aux',
		_rank: 150,
		isPGM: false,
		isFlattened: false,
		isDefaultCollapsed: true,
	},
	{
		_id: OutputLayer.STORYITEM,
		name: 'Script',
		_rank: 200,
		isPGM: false,
		isFlattened: false,
	},
	{
		_id: OutputLayer.Pgm,
		name: 'PGM',
		_rank: 100,
		isPGM: true,
		isFlattened: true,
	},
])
