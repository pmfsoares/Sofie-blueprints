import { IngestPayload, MosPart, MosPartStoryItem, PartInfo, PartProps, PartType, StoryProps } from '../definitions'
/**
 * here, ingested part on ENPS is parsed by parseBaseProps into story on timeline
 * @param ingestPart
 * @param ingestPayload
 * @returns
 */
export function parseStory(ingestPart: MosPart, ingestPayload: IngestPayload, script: string): PartProps<StoryProps> {
	const rawP = ingestPart.Content as MosPartStoryItem
	return {
		type: PartType.STORYITEM,
		rawType: ingestPart.Type,
		rawTitle: rawP.Slug,
		info: PartInfo.NORMAL,
		script: script,
		payload: {
			...parseBaseProps(rawP, ingestPayload.externalId, script, ingestPayload),
		},
	}
}
/**
 *  MosPartStoryItem is parsed on story
 * @param part
 * @param extId
 * @returns
 */
export function parseBaseProps(
	part: MosPartStoryItem,
	extId: string,
	script: string,
	ingestPayload: IngestPayload
): StoryProps {
	const tmp: StoryProps = {
		externalId: extId,
		name: part.Slug,
		duration: part.Duration,
		script: script,
		ObjectID: part.ObjectID,
		MOSID: part.MOSID,
		Slug: part.Slug,
		mosAbstract: part.mosAbstract,
		ObjectSlug: part.ObjectSlug,
		Duration: part.Duration,
		TimeBase: part.TimeBase,
	}
	if (part.Channel) {
		tmp.Channel = part.Channel
	}
	if (ingestPayload.MosExternalMetaData && ingestPayload.MosExternalMetaData[0].MosPayload.MediaTime) {
		tmp.MediaTime = ingestPayload.MosExternalMetaData[0].MosPayload.MediaTime
	}
	return tmp
}
