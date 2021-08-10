import { BlueprintMapping, BlueprintMappings, LookaheadMode, TSR } from '@sofie-automation/blueprints-integration'
import { MappingOBSType } from 'timeline-state-resolver-types'
import { literal } from '../../common/util'
import { OBSLayers, QuantelLayers } from '../layers'
/**
 * Sets Blueprints mappings
 */
export default literal<BlueprintMappings>({
	[QuantelLayers.Quantel_A]: literal<TSR.MappingQuantel & BlueprintMapping>({
		device: TSR.DeviceType.QUANTEL,
		deviceId: 'TX',
		portId: 'S6001SC0-A',
		channelId: 0,
		lookahead: LookaheadMode.PRELOAD,
	}),
	[QuantelLayers.Quantel_B]: literal<TSR.MappingQuantel & BlueprintMapping>({
		device: TSR.DeviceType.QUANTEL,
		deviceId: 'TX',
		portId: 'S6001SC0-B',
		channelId: 1,
		lookahead: LookaheadMode.PRELOAD,
	}),
	[OBSLayers.OBS_A]: literal<TSR.MappingOBS & BlueprintMapping>({
		device: TSR.DeviceType.OBS,
		deviceId: 'OBS',
		mappingType: MappingOBSType.CurrentScene,
		lookahead: LookaheadMode.NONE,
	}),
	[OBSLayers.OBS_B]: literal<TSR.MappingOBS & BlueprintMapping>({
		device: TSR.DeviceType.OBS,
		deviceId: 'OBS',
		mappingType: MappingOBSType.CurrentScene,
		lookahead: LookaheadMode.NONE,
	}),
})
/**
 * Get all AuxMapping to be injested on Sofie's Web configuration
 * @param total of defined mappings
 * @returns mappings
 */
export function getAllAuxMappings(total: number): BlueprintMappings {
	const mappings: BlueprintMappings = {}

	for (let i = 0; i < total; i++) {
		mappings[`atem_aux_${i}`] = literal<TSR.MappingAtem & BlueprintMapping>({
			device: TSR.DeviceType.ATEM,
			deviceId: 'atem0',
			lookahead: LookaheadMode.NONE,

			mappingType: TSR.MappingAtemType.Auxilliary,
			index: i,
		})
	}

	return mappings
}
