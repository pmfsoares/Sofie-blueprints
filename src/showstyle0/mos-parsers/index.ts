import { IngestSegment, IRundownUserContext } from '@sofie-automation/blueprints-integration'
import { AllProps, IngestPayload, MosPart, PartProps, SegmentProps, SegmentType } from '../definitions'
import { parseScript } from '../helpers/script'
import { parseStory } from './storyItem'

/**
 * Converts raw ingest segments to parsed segments
 * @param context
 * @param ingestSegment The segment from the ENPS
 * @returns Intermediate data type used to generate parts
 */
export function convertIngestData(context: IRundownUserContext, ingestSegment: IngestSegment): SegmentProps {
	context.logInfo('Converting IngestData')
	const partes: PartProps<AllProps>[] = []
	const type = SegmentType.NORMAL

	//only start parsing/creating objects if there exists real payload(not a initial message from ENPS)
	if (ingestSegment.parts[0].payload) {
		const part: IngestPayload = ingestSegment.parts[0].payload

		context.logDebug(
			`-----------------START/END LOGGER convertIngestData-----------------ingestSegment=> ${JSON.stringify(
				ingestSegment
			)}`
		)
		part.externalId = ingestSegment.externalId
		part.externalName = ingestSegment.name
		context.logDebug(
			`-----------------START/END LOGGER convertIngestData-----------------part=> ${JSON.stringify(part)}`
		)

		//let storyItems: MosPart[];
		if (part.Body) {
			let fullScript = '' // = parseScript(part)
			let lastPos = -1
			//parse throught the MosPart array to create the clip objects
			part.Body.forEach((partPayload: MosPart) => {
				if (partPayload.Type.match(/p/i)) {
					//const temp = partPayload.Content as MosPartP
					//if (temp.text) {
					//	partes.push(parseP(partPayload, part))
					//	context.logDebug(`----------------------------------part[@type] ${JSON.stringify(temp['@type'])}`)
					//}
					return
				} else if (partPayload.Type.match(/storyItem/i)) {
					const partPos: number = part.Body.indexOf(partPayload)
					fullScript = parseScript(part.Body.slice(lastPos == -1 ? 0 : lastPos, partPos))
					lastPos = partPos + 1
					partes.push(parseStory(partPayload, part, fullScript))
				}
			})
		}
	}
	return {
		type,
		parts: partes,
		payload: {
			name: ingestSegment.name,
		},
	}
}
