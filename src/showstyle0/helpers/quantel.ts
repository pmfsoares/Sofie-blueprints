import { IRundownUserContext, TimelineObjectCoreExt, TSR } from '@sofie-automation/blueprints-integration'
import { DeviceType, TimelineContentTypeOBS } from 'timeline-state-resolver-types'
import { literal } from '../../common/util'
import { PartProps, PProp, StoryProps } from '../definitions'
/**
 * Creates Quantel objects input mapping to layers on timeline story
 * @param context
 * @param part
 * @returns retTL - object (timelineObjectsStory) to be inserted on timeline
 */
export function createQuantelInputTimelineObjectsStory(
	context: IRundownUserContext,
	part: PartProps<StoryProps>
): TSR.TSRTimelineObjBase[] {
	const mappings = context.getStudioMappings() //layer mappings on sofie web configuration
	const layerTemp = String(mappings[part.payload.Channel ? part.payload.Channel : 'A'].layerName)

	let layerClear = ''
	Object.keys(mappings).forEach((ele) => {
		if (mappings[ele].device == DeviceType.QUANTEL && mappings[ele].layerName != layerTemp)
			layerClear = String(mappings[ele].layerName)
	})
	const retTL: TimelineObjectCoreExt[] = [
		({
			id: `video0_${part.rawTitle}`,
			enable: {
				start: 0,
				duration: (part.payload.Duration / 2) * 40,
			},
			keyframes: [
				{
					id: `lookahead_${part.rawTitle}`,
					enable: {
						start: 0,
					},
					content: {
						playing: false,
						deviceType: DeviceType.QUANTEL,
						title: `${part.payload.ObjectSlug}`,
					},
					preserveForLookahead: true,
					disabled: true,
				},
			],
			layer: layerTemp,
			content: {
				deviceType: DeviceType.QUANTEL,
				title: `${part.payload.ObjectSlug}`, // title of content
			},
		} as unknown) as TimelineObjectCoreExt | TSR.TimelineObjQuantelClip,

		literal<TSR.TimelineObjQuantelClip>({
			id: `force_clear_layer${part.rawTitle}`,
			enable: {
				start: 0,
				duration: 50,
			},
			layer: `${layerClear}`,
			isLookahead: false,
			content: {
				deviceType: DeviceType.QUANTEL,
				//part.payload.Channel ? part.payload.Channel : 'quantel3',
			},
		}),
		literal<TSR.TimelineObjOBSCurrentScene>({
			id: `obs_scene ${part.rawTitle}`,
			enable: {
				start: 0,
			},
			layer: `OBS_${layerTemp}`,
			content: {
				deviceType: DeviceType.OBS,
				type: TimelineContentTypeOBS.CURRENT_SCENE,
				sceneName: layerTemp, //part.payload.Channel ? part.payload.Channel : 'quantel3',
			},
		}),
	]
	context.logError(
		`----------------------------LOGGER createQuantelInputTimelineObjects ------------------------- retTL=>${JSON.stringify(
			retTL
		)}`
	)
	return retTL
}
/**
 * Creates Quantel input pParts input mapping to layers on timeline story
 * @param context
 * @param part
 * @returns retTL - object (timelineObjectsClip) to be inserted on timeline
 */
export function createQuantelInputTimelineObjectsP(
	context: IRundownUserContext,
	part: PartProps<PProp>
): TSR.TimelineObjQuantelClip[] {
	const mappings = context.getStudioMappings()
	const layerTemp: string =
		mappings['quantel3'].layerName != undefined
			? String(mappings['quantel3'].layerName)
			: String(mappings['quantel3'].device)
	const retTL: TSR.TimelineObjQuantelClip[] = [
		literal<TSR.TimelineObjQuantelClip>({
			id: `video0 ${part.rawTitle}`,
			enable: {
				start: 0,
				duration: 0,
			},
			layer: layerTemp,
			content: {
				deviceType: DeviceType.QUANTEL,
				title: part.rawTitle,
			},
		}),
	]
	context.logError(
		`----------------------------LOGGER createQuantelInputTimelineObjects ------------------------- retTL=>${JSON.stringify(
			retTL
		)}`
	)
	return retTL
}
