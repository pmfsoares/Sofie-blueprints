import { IBlueprintShowStyleBase, IngestRundown, IStudioContext } from '@sofie-automation/blueprints-integration'
import * as _ from 'underscore'

/**
 * Gets ShowStyle set on Sofie's Web Configuration
 * @param _context
 * @param showStyles
 * @param _ingestRundown
 * @returns
 */
export function getShowStyleId(
	_context: IStudioContext,
	showStyles: IBlueprintShowStyleBase[],
	_ingestRundown: IngestRundown
): string | null {
	const showStyle =
		_.find(showStyles, (s) => s._id === 'showstyle0' || s.blueprintId === 'sofie-showstyle0') || _.first(showStyles) // checks if Show Style defined on Sofie Web Configuration is correct
	if (showStyle) {
		return showStyle._id
	}

	return null
}
