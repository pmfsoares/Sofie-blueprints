import { BlueprintResultSegment, IngestSegment, IRundownUserContext } from '@sofie-automation/blueprints-integration'
import { convertIngestData } from './mos-parsers'
import { generateParts } from './part-adapters'
//  This class is for getSegment providing by ingested content from ENPS

/**
 * get correspondent segment ingested on ENPS
 *
 * both are linked to the web sofie rundown (timeline)
 *
 * @param context - sofie rundown context
 * @param ingestSegment - ingested segment on ENPS
 * @returns bpRes - BlueprintResultSegment
 */
export function getSegment(context: IRundownUserContext, ingestSegment: IngestSegment): BlueprintResultSegment {
	context.logDebug(
		`-----------------START/END LOGGER getSegment-----------------ingestSegment=> ${JSON.stringify(ingestSegment)}`
	)
	const intermediateSegment = convertIngestData(context, ingestSegment)
	context.logDebug(
		`-----------------START/END LOGGER getSegment-----------------intermediateSegment=> ${JSON.stringify(
			intermediateSegment
		)}`
	)

	const bpRes: BlueprintResultSegment = generateParts(context, intermediateSegment) // generated parts to be ingested on timeline (rundown)
	context.logDebug(`-----------------START/END LOGGER generateSegment-----------------bpRes=> ${JSON.stringify(bpRes)}`)
	return bpRes
}
