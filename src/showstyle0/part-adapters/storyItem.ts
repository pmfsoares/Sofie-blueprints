import {
	AccessorOnPackage,
	BlueprintResultPart,
	ExpectedPackage,
	IBlueprintPiece,
	IRundownUserContext,
	PieceLifespan,
} from '@sofie-automation/blueprints-integration'
import { Md5 } from 'ts-md5'
import { literal } from '../../common/util'
import { PartProps, StoryProps } from '../definitions'
import { createQuantelInputTimelineObjectsStory } from '../helpers/quantel'
import { createScriptPiece } from '../helpers/script'
import { getOutputLayerForSourceLayer, SourceLayer } from '../layers'
/**
 * This function generates Story Item to be displayed on timeline
 * @param context
 * @param part
 * @returns story item part (part, pieces and adlibs)
 */
export function generateStoryItemPart(context: IRundownUserContext, part: PartProps<StoryProps>): BlueprintResultPart {
	const mappings = context.getStudioMappings() //layer mappings on sofie web configuration
	const layerTemp: string =
		mappings[part.payload.Channel ? part.payload.Channel : 'A'].layerName != undefined
			? String(mappings[part.payload.Channel ? part.payload.Channel : 'A'].layerName)
			: String(mappings[part.payload.Channel ? part.payload.Channel : 'A'].device)

	const storyPiece: IBlueprintPiece = {
		enable: {
			// gives a 'take' to the clips of Isa Quantel
			start: 0, //start is 0 to match the take in the timeline
			//duration: part.payload.duration ? part.payload.duration : part.payload.Duration,
		},
		externalId: `${part.payload.externalId}`,
		name: `Channel: ${part.payload.Channel ? part.payload.Channel : 'quantel3'} » ${part.rawTitle}`,
		lifespan: PieceLifespan.WithinPart,
		sourceLayerId: SourceLayer.STORYITEM,
		outputLayerId: getOutputLayerForSourceLayer(SourceLayer.STORYITEM),
		content: {
			//comes from the isa clips
			fileName: `quantel:?${part.payload.ObjectSlug}`,
			path: `quantel:?${part.payload.ObjectSlug}`,
			mediaFlowIds: ['1'],
			timelineObjects: [...createQuantelInputTimelineObjectsStory(context, part)],
			sourceDuration: (part.payload.Duration / 2) * 40,
			ignoreMediaObjectStatus: true,
		},
		expectedPackages: [
			// that expected packages from isa
			literal<ExpectedPackage.ExpectedPackageQuantelClip>({
				type: ExpectedPackage.PackageType.QUANTEL_CLIP,
				content: {
					title: part.payload.ObjectSlug, // title of objectslug
				},
				sources: [
					{
						containerId: 'container0',
						accessors: {
							['quantel_acessor_1']: literal<AccessorOnPackage.Quantel>({
								title: part.payload.ObjectSlug,
							}),
						},
					},
				],
				_id: `${part.payload.externalId}_${part.payload.ObjectSlug}_ExpectedPackage`,
				version: {},
				layers: [layerTemp], //layer mapping on sofie's web configuration
				contentVersionHash: Md5.hashStr(`${part.payload.externalId}_${part.payload.ObjectSlug}_ExpectedPackage`),
				sideEffect: {}, // no side effects
			}),
		],
	}

	const pieces = [storyPiece] //pieces from isa
	const scriptPiece = createScriptPiece(part.payload.script, part.payload.externalId)
	if (scriptPiece) pieces.push(scriptPiece)
	context.logDebug(
		`-----------------START/END LOGGER generateStoryItemPart----------------- piecesStoryPart => ${JSON.stringify(
			pieces
		)}`
	)
	return {
		part: {
			externalId: `${part.payload.externalId}-${part.rawTitle}`,
			title: part.payload.name,
			expectedDuration: (part.payload.Duration / 2) * 40,
		},
		pieces: pieces,
		adLibPieces: [],
	}
}
