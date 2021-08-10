import {
	IBlueprintAdLibPiece,
	IShowStyleUserContext,
	PieceLifespan,
	TSR,
} from '@sofie-automation/blueprints-integration'
import { literal } from '../../common/util'
import { AtemSourceType, StudioConfig } from '../../studio0/helpers/config'
import { AtemLayers } from '../../studio0/layers'
import { getOutputLayerForSourceLayer, SourceLayer } from '../layers'
/**
 * Gets shelf globalAdLibs from studio mappings
 * @param context
 * @returns Global AdLibs on shelf layout on rundonw view
 */
export function getGlobalAdlibs(context: IShowStyleUserContext): IBlueprintAdLibPiece[] {
	const config = context.getStudioConfig() as StudioConfig
	context.logDebug(
		`-----------------START/END LOGGER getGlobalAdlibs-----------------config=> ${JSON.stringify(config)}`
	)
	const mappings = context.getStudioMappings()
	let layerTemp = ''
	for (const key in mappings) {
		layerTemp = mappings[key].layerName != undefined ? String(mappings[key].layerName) : String(mappings[key].device)
		break
	}
	const makeCameraAdlib = (id: number, input: number): IBlueprintAdLibPiece => ({
		_rank: 0 + id,
		externalId: 'text' + id,
		name: `P Script ${id + 1}`,
		lifespan: PieceLifespan.WithinPart,
		expectedDuration: 60000,
		sourceLayerId: SourceLayer.P,
		outputLayerId: getOutputLayerForSourceLayer(SourceLayer.P),
		content: {
			timelineObjects: [
				literal<TSR.TimelineObjAtemME>({
					id: '',
					enable: { start: 0 },
					layer: AtemLayers.AtemMeProgram,
					content: {
						deviceType: TSR.DeviceType.ATEM,
						type: TSR.TimelineContentTypeAtem.ME,

						me: {
							input: input,
							transition: TSR.AtemTransitionStyle.CUT,
						},
					},
				}),
			],
		},
	})
	const makeRemoteAdlib = (id: number, input: number): IBlueprintAdLibPiece => ({
		_rank: 100 + id,
		externalId: 'rem' + id,
		name: `Nao local ${id + 1}`,
		lifespan: PieceLifespan.WithinPart,
		expectedDuration: 60000,
		sourceLayerId: SourceLayer.STORYITEM,
		outputLayerId: getOutputLayerForSourceLayer(SourceLayer.STORYITEM),
		content: {
			timelineObjects: [
				literal<TSR.TimelineObjQuantelClip>({
					id: '',
					enable: { start: 0 },
					layer: layerTemp,
					content: {
						deviceType: TSR.DeviceType.QUANTEL,
						title: `TESTE: ${input}`,
					},
				}),
			],
		},
	})

	return [
		...config.atemSources
			.filter((source) => source.type === AtemSourceType.Camera)
			.map((source, i) => makeCameraAdlib(i, source.input)),
		...config.atemSources
			.filter((source) => source.type === AtemSourceType.Remote)
			.map((source, i) => makeRemoteAdlib(i, source.input)),
	]
}
