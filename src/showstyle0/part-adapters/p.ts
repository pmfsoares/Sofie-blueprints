import {
	BlueprintResultPart,
	IBlueprintPiece,
	IRundownUserContext,
	PieceLifespan,
} from '@sofie-automation/blueprints-integration'
import { StudioConfig } from '../../studio0/helpers/config'
import { PartProps, PProp } from '../definitions'
import { createQuantelInputTimelineObjectsP } from '../helpers/quantel'
import { getOutputLayerForSourceLayer, SourceLayer } from '../layers'
/**
 * On this function, generates "pPart" on timeline
 * @param context
 * @param part
 * @returns
 */
export function generatePPart(context: IRundownUserContext, part: PartProps<PProp>): BlueprintResultPart {
	const config = context.getStudioConfig() as StudioConfig
	context.logDebug(JSON.stringify(config))
	const PPiece: IBlueprintPiece = {
		enable: {
			start: 0,
		},
		externalId: part.payload.externalId,
		name: part.rawTitle,
		lifespan: PieceLifespan.WithinPart,
		sourceLayerId: SourceLayer.P,
		outputLayerId: getOutputLayerForSourceLayer(SourceLayer.P),
		content: {
			timelineObjects: [...createQuantelInputTimelineObjectsP(context, part)],
		},
	}

	const pieces = [PPiece]
	return {
		part: {
			externalId: `${part.payload.externalId}-${part.rawTitle}`,
			title: part.payload.name,

			expectedDuration: part.payload.duration,
		},
		pieces: pieces,
		adLibPieces: [],
	}
}
