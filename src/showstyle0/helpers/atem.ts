import { TSR } from '@sofie-automation/blueprints-integration'
import { literal } from '../../common/util'
import { AtemLayers } from '../../studio0/layers'
/**
 *  atem input object to be ingested on timeline
 * @param input
 * @param start
 * @returns
 */
export function createAtemInputTimelineObjects(input: number, start = 80): TSR.TimelineObjAtemME[] {
	return [
		literal<TSR.TimelineObjAtemME>({
			id: '',
			enable: { start: start },
			layer: AtemLayers.AtemMeProgram,
			content: {
				deviceType: TSR.DeviceType.ATEM,
				type: TSR.TimelineContentTypeAtem.ME,

				me: {
					programInput: input,
				},
			},
			// TODO - keyframes will be needed to do transitions but breaks preview for now
			// keyframes: [
			//     {
			//         id: '',
			//         enable: {
			//             start: 0,
			//             duration: 1000 // only used to do the transition
			//         },
			//         content: {
			//             me: {
			//                 input: input,
			//                 transition: TSR.AtemTransitionStyle.CUT
			//             }
			//         }
			//     }
			// ]
		}),
		// Add object for preview
		literal<TSR.TimelineObjAtemME>({
			id: '',
			enable: { start: start },
			layer: AtemLayers.AtemMePreview,
			content: {
				deviceType: TSR.DeviceType.ATEM,
				type: TSR.TimelineContentTypeAtem.ME,

				me: {
					previewInput: input,
				},
			},
		}),
	]
}
