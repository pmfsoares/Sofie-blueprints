import {
	BlueprintResultRundown,
	ExtendedIngestRundown,
	IBlueprintRundown,
	IShowStyleUserContext,
} from '@sofie-automation/blueprints-integration'
import { literal } from '../../common/util'
import { getBaseline } from './baseline'
import { getGlobalAdlibs } from './globalAdlibs'
/**
 * Gets Rundown to display
 * @param context
 * @param ingestRundown
 * @returns
 */
export function getRundown(
	context: IShowStyleUserContext,
	ingestRundown: ExtendedIngestRundown
): BlueprintResultRundown {
	context.logDebug(
		`-----------------START/END LOGGER getRundown----------------- rundown=> ${JSON.stringify(ingestRundown)}`
	)
	const rundownMetadata = ingestRundown.payload.MosExternalMetaData

	const rundown = literal<IBlueprintRundown>({
		externalId: ingestRundown.externalId,
		name: ingestRundown.name,
		expectedStart: 0, //default value is 0
		expectedDuration: 0,
		metaData: rundownMetadata,
	})

	const res: BlueprintResultRundown = {
		// it is the rundown that is visualized in the sofie
		rundown,
		globalAdLibPieces: getGlobalAdlibs(context),
		globalActions: [],
		baseline: {
			timelineObjects: getBaseline(context),
		},
	}

	const startT: number = Date.parse(ingestRundown.payload.MosExternalMetaData[0].MosPayload.StartTime)
	const endT: number = Date.parse(ingestRundown.payload.MosExternalMetaData[0].MosPayload.EndTime)

	if (ingestRundown.payload) {
		// TODO - maybe guard against unknown types of rundowns?
		rundown.expectedStart = startT // is the start time that comes from the ENPS
		rundown.expectedDuration = endT - startT // is the end time - start time  that comes from the ENPS
	}
	context.logDebug(`-----------------START/END LOGGER getRundown----------------- res=> ${JSON.stringify(res)}`)

	return res
}
