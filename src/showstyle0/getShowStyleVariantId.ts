import {
	ExtendedIngestRundown,
	IBlueprintShowStyleVariant,
	IStudioUserContext,
} from '@sofie-automation/blueprints-integration'
// import _ = require('underscore')

/**
 * gets showstyle variant id
 * @param _context
 * @param showStyleVariants
 * @param _ingestRundown
 * @returns
 */
export function getShowStyleVariantId(
	_context: IStudioUserContext,
	showStyleVariants: IBlueprintShowStyleVariant[],
	_ingestRundown: ExtendedIngestRundown
): string | null {
	_context.logDebug('STARTING LOGGER SHOWSTYLE VARIANT')
	_context.logDebug(JSON.stringify(_ingestRundown))
	// Here you could parse bits of the rundown to decide which showstyle variant the rundown should have

	// TODO - the fallback used below doesn't work for some reason
	_context.logDebug(`-------------getShowStyleVariantId--------------------ids=> ${JSON.stringify(showStyleVariants)}`)
	for (const variant of showStyleVariants) {
		return variant._id
	}

	// Fallback to the first
	const firstVariant = showStyleVariants[0] // _.first(showStyleVariants)
	if (firstVariant) {
		return firstVariant._id
	}
	// return 'HhhhArAYKMBL42oaG'
	return 'ERcEhkk8vjL5taq4L'
}
