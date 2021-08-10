import { IShowStyleUserContext, TSR } from '@sofie-automation/blueprints-integration'
import { literal } from '../../common/util'
import { OutputLayer } from '../layers'
/**
 * Gets basline to be injested on timeline
 * @param context
 * @returns
 */
export function getBaseline(context: IShowStyleUserContext): TSR.TSRTimelineObj[] {
	const mappings = context.getStudioMappings()
	context.logDebug(JSON.stringify(mappings))
	/*
	let layerTemp = ''
	for (const key in mappings) {
		layerTemp = mappings[key].layerName != undefined ? String(mappings[key].layerName) : String(mappings[key].device)
		break
	}*/
	return [
		literal<TSR.TimelineObjQuantelClip>({
			id: '',
			enable: { while: '1' }, //whereas timeline is active (1)
			priority: 0, //default value to priority
			layer: OutputLayer.STORYITEM, // ouytput layer to be displayed on timeline
			content: {
				deviceType: TSR.DeviceType.QUANTEL, // type of device for be displayed on timeline
			},
		}),
	]
}
