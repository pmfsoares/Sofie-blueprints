import { BlueprintResultStudioBaseline, IStudioContext, TSR } from '@sofie-automation/blueprints-integration'
import { literal } from '../common/util'

// Gets main view that the producer is working in (Rundown view/Segment Header countdowns/Rundown dividers/Shelf/Side Panels/Playing things/Taking Points)
export function getBaseline(_context: IStudioContext): BlueprintResultStudioBaseline {
	const mappings = _context.getStudioMappings()
	_context.logDebug(`LOGGER BASELINE MAPPINGS => ${JSON.stringify(mappings)}`)
	const retTimeline: BlueprintResultStudioBaseline = { timelineObjects: [] }
	for (const key in mappings) {
		//foreach to get layers from Studio Mappings
		const layerTemp: string =
			mappings[key].layerName != undefined ? String(mappings[key].layerName) : String(mappings[key].device)
		retTimeline.timelineObjects.push(
			literal<TSR.TimelineObjQuantelAny>({
				id: '',
				enable: {
					while: '1', //when takes the 'take' on rundown
				},
				priority: 1,
				layer: layerTemp,
				content: {
					deviceType: TSR.DeviceType.QUANTEL,
				},
			})
		)
		break
	}
	return retTimeline

}
