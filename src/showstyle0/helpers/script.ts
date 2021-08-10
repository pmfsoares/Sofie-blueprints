import { IBlueprintPiece, PieceLifespan, ScriptContent, WithTimeline } from '@sofie-automation/blueprints-integration'
import { literal } from '../../common/util'
import { MosPart, MosPartP } from '../definitions'
import { getOutputLayerForSourceLayer, SourceLayer } from '../layers'
/**
 * Gets first words from script
 * @param input
 * @returns
 */
function getFirstWords(input: string): string {
	const firstWordsMatch = (input + '').match(/^([\S]*[^\n]){1,3}/)
	if (firstWordsMatch) {
		return firstWordsMatch[0].trim()
	} else {
		return ''
	}
}
/**
 * Gets last words from script
 * @param input
 * @returns
 */
function getLastWords(input: string): string {
	const lastWordsMatch = (input + '').match(/([\S]+[\s]*){1,3}$/)
	if (lastWordsMatch) {
		return lastWordsMatch[0].trim()
	} else {
		return ''
	}
}
/**
 * Create a script from piece to display on prompter
 * @param script
 * @param extId
 * @returns
 */
export function createScriptPiece(script: string, extId: string): IBlueprintPiece | undefined {
	if (script.trim() === '') return undefined

	const firstWords = getFirstWords(script)
	const lastWords = getLastWords(script)

	return {
		externalId: extId,
		name: (firstWords ? firstWords + '\u2026' : '') + '||' + (lastWords ? '\u2026' + lastWords : ''),
		enable: { start: 0 },
		sourceLayerId: SourceLayer.SCRIPT,
		outputLayerId: getOutputLayerForSourceLayer(SourceLayer.SCRIPT),
		isTransition: false,
		lifespan: PieceLifespan.WithinPart,
		metaData: {
			source: 'script',
		},
		content: literal<WithTimeline<ScriptContent>>({
			sourceDuration: 0,
			fullScript: script,
			firstWords,
			lastWords,
			timelineObjects: [],
		}),
	}
}

/**
 * Parse teleprompter script from a MosParts array
 * @param part MosPart arr
 * @returns
 */
export function parseScript(part: MosPart[]): string {
	let fullScript = ''

	let upper = -1
	let lower = -1
	let toRem: MosPart[] = []
	let temp: MosPart[] = []

	part.forEach((element: MosPart, key) => {
		if (element.Type.match(/p/i)) {
			const tempContent = element.Content as MosPartP
			if (element['Type'] == 'p') {
				if (tempContent['@type'] == 'text' && tempContent.text) {
					//MOS object in one line to be removed
					if (tempContent.text.match(/^\[.+\]$/gi)) {
						lower = key
						upper = lower
						temp = part.slice(lower, upper + 1)
						const temp2 = toRem.concat(temp)
						toRem = temp2
					}
					//Beginning of the MOS Object to be removed
					else if (tempContent.text.match(/^\[.+/gim)) {
						lower = key
						upper = getLower(lower, part)
						temp = part.slice(lower, upper + 1)
						const temp2 = toRem.concat(temp)
						toRem = temp2
					}
				}
			}
			if (lower != -1 || upper != -1) {
				lower = -1
				upper = -1
			}
		}
	})
	//Remove the objects from the original array
	toRem.forEach((ele) => {
		const index = part.indexOf(ele)
		part.splice(index, 1)
	})

	//loop throught the array and join all the strings to be returned
	part.forEach((element) => {
		if (!element.Type.match(/p/i)) return
		const tempContent: MosPartP = element.Content as MosPartP
		if (tempContent.text == undefined) {
			//fullScript += ' \n'
		} else if (tempContent.text != undefined) {
			fullScript += tempContent.text + '\n'
		}
	})
	console.log(fullScript)

	return fullScript
}

/**
 * Parse a MosParts array for the end of a MOS object
 * @param start position on where to start the parsing
 * @param arr MosPart arr
 * @returns
 */
export function getLower(start: number, arr: MosPart[]): number {
	let upper = -1

	for (let i = start; i < arr.length; i++) {
		if (!arr[i].Type.match(/p/i)) continue
		const ele: MosPartP = arr[i].Content as MosPartP
		if (ele['@type'] == 'text' && ele['text']) {
			if (ele['text'].match(/.+\]$/gim)) {
				upper = i
				break
			}
		}
	}
	return upper
}
