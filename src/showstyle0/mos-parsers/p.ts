import { IngestPayload, MosPart, MosPartP, PartBaseProps, PartInfo, PartProps, PartType, PProp } from '../definitions'
/**
 * on this function, ingested "p" on ENPS is parsed by parseBaseProps on story on timeline
 * @param ingestPart
 * @param ingestPayload
 * @returns
 */
export function parseP(ingestPart: MosPart, ingestPayload: IngestPayload): PartProps<PProp> {
	const rawP = ingestPart.Content as MosPartP
	return {
		type: PartType.P,
		rawType: ingestPart.Type,
		rawTitle: rawP.text,
		info: PartInfo.NORMAL,
		script: 'Ola, eu sou um guiao',
		payload: {
			...parseBaseProps(ingestPayload),
		},
	}
}
/**
 * "p" is parsed on part
 * @param part
 * @returns
 */
export function parseBaseProps(part: IngestPayload): PartBaseProps {
	return {
		externalId: part.externalId, //ererea
		duration: 0, // TODO - better default time?
		name: part.externalName,
		script: 'Ola, eu sou um guiao',
	}
}
