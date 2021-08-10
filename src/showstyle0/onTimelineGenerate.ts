import {
	BlueprintResultTimeline,
	IBlueprintResolvedPieceInstance,
	ITimelineEventContext,
	OnGenerateTimelineObj,
	PartEndState,
	TimelinePersistentState,
} from '@sofie-automation/blueprints-integration'

/**
 * Get correspondent Timeline for rundown
 * @param context
 * @param timeline
 * @param previousPersistentState
 * @param previousPartEndState
 * @param resolvedPieces
 * @returns
 */
export function onTimelineGenerate(
	context: ITimelineEventContext,
	timeline: OnGenerateTimelineObj[],
	previousPersistentState: TimelinePersistentState | undefined,
	previousPartEndState: PartEndState | undefined,
	resolvedPieces: IBlueprintResolvedPieceInstance[]
): Promise<BlueprintResultTimeline> {
	context.logDebug(
		`-----------------------------------onTimelineGenerate--------------------------${JSON.stringify(timeline)}`
	)
	context.logDebug(`-----------------------------------IGNORA COMECO-------------------------`)
	context.logDebug(`previousPersistentState=>{ ${JSON.stringify(previousPersistentState)} }`)
	context.logDebug(`previousPartEndState=>{ ${JSON.stringify(previousPartEndState)} }`)
	context.logDebug(`resolvedPieces=>{ ${JSON.stringify(resolvedPieces)} }`)
	context.logDebug(`-----------------------------------IGNORA FIM--------------------------`)

	//Loop to set disable to true on the preload keyframes
	timeline.forEach((ele) => {
		if (ele.isLookahead) {
			if (ele.keyframes) {
				ele.keyframes
				ele.keyframes.forEach((element) => {
					if (element.disabled) {
						!Array.isArray(element.enable) ? (element.enable.start = 100) : (element.enable[0].start = 100)
						element.disabled = false
						context.logDebug(`-----------------------------------IGNORA COMECO-Elemento-------------------------`)
						context.logDebug(`element=>{ ${JSON.stringify(element)} }`)
						context.logDebug(`-----------------------------------IGNORA FIM-Elemento--------------------------`)
					}
				})
			}
		}
	})
	return Promise.resolve({
		timeline,
		persistentState: previousPersistentState,
	})
}
