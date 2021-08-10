import {
	BlueprintResultPart,
	BlueprintResultSegment,
	IRundownUserContext,
} from '@sofie-automation/blueprints-integration'
import { t } from '../../common/util'
import { InvalidProps, PartProps, PartType, PProp, SegmentProps, StoryProps } from '../definitions'
import { generatePPart } from './p'
import { generateStoryItemPart } from './storyItem'
/**
 * On this function, ingested part is generated part on segment to be inserted on segment on timeline
 * @param context
 * @param intermediateSegment
 * @returns
 */
export function generateParts(context: IRundownUserContext, intermediateSegment: SegmentProps): BlueprintResultSegment {
	const parts = intermediateSegment.parts.map(
		(rawPart): BlueprintResultPart => {
			context.logDebug(
				`----------------------------STARTING LOGGER generateParts------------------------- rawPart=> ${JSON.stringify(
					rawPart
				)}`
			)
			context.logDebug(
				`----------------------------STARTING LOGGER generateParts------------------------- intermediateSegment=> ${JSON.stringify(
					intermediateSegment
				)}`
			)
			rawPart.payload.duration
			switch (rawPart.rawType) {
				case PartType.P:
					return generatePPart(context, (rawPart as unknown) as PartProps<PProp>)
				case PartType.STORYITEM: {
					const temp: PartProps<StoryProps> = rawPart as PartProps<StoryProps>
					const tempStr: string[] = temp.payload.mosAbstract.split(' ', 2)
					const array = tempStr[1].split(':')
					const seconds = parseInt(array[0], 10) * 60 + parseInt(array[1], 10) // parse  to seconds
					rawPart.payload.duration = seconds * 1000
					return generateStoryItemPart(context, (rawPart as unknown) as PartProps<StoryProps>)
				}
				case PartType.Invalid:
					context.logDebug(`----------------------------LOGGER generateParts INVALID-------------------------`)
					return {
						part: {
							externalId: rawPart.payload.externalId,
							title: rawPart.payload.name,
							invalid: true,
							invalidReason: {
								message: (rawPart.payload as InvalidProps).invalidReason,
							},
						},
						pieces: [],
						adLibPieces: [],
					}
				default:
					context.logDebug(`----------------------------LOGGER generateParts INVALID/DEFAULT-------------------------`)
					return {
						part: {
							externalId: rawPart.payload.externalId,
							title: rawPart.payload.name,
							invalid: true,
							invalidReason: {
								message: t(`Parts generation for ${rawPart.type} not implemented`),
							},
						},
						pieces: [],
						adLibPieces: [],
					}
			}
		}
	)

	return {
		segment: {
			name: intermediateSegment.payload.name, //name of segment on timeline
		},
		parts, //content of segment
	}
}
