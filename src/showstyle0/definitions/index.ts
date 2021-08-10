import { ITranslatableMessage } from '@sofie-automation/blueprints-integration'
import { IntermediatePart, IntermediateSegment } from './intermediate'

// sets the type of segments in the showstyle
export enum SegmentType {
	NORMAL = 'normal',
	OPENING = 'opening',
}
// sets the types of pieces in the showstyle
export enum PartType {
	// UNKNOWN = '',
	Invalid = 'invalid',
	Camera = 'camera',
	Remote = 'remote',
	VT = 'vt',
	VO = 'vo',
	Titles = 'titles',
	DVE = 'dve',
	GFX = 'gfx',
	P = 'p',
	STORYITEM = 'storyItem',
}
//  sets the partinfo in the showstyle
export enum PartInfo {
	NORMAL = 0,
}
//  sets the story properties in the showstyle
export type AllProps = PProp | StoryProps | InvalidProps
// declaration of the part properties in the showstyle
export interface PartProps<T extends AllProps> extends IntermediatePart {
	type: PartType | null
	rawType: string
	rawTitle: string
	info: PartInfo
	script: string
	payload: T
}
// declaration of the segment properties in the showstyle
export interface SegmentProps extends IntermediateSegment {
	type: SegmentType | null
	parts: PartProps<AllProps>[]
	payload: {
		name: string
	}
}
// declaration of the partBase properties in the showstyle
export interface PartBaseProps {
	externalId: string
	duration: number
	name: string
	script: string
}

export type PProp = PartBaseProps
// declaration of the stories properties in the showstyle
export interface StoryProps extends PartBaseProps {
	ObjectID: string
	MOSID: string
	Slug: string
	mosAbstract: string
	ObjectSlug: string
	Duration: number
	TimeBase: number
	Channel?: string
	MediaTime?: number
}

export interface InvalidProps extends PartBaseProps {
	invalidReason: ITranslatableMessage
}
// declaration of the ingested payload interface in the showstyle
export interface IngestPayload {
	ID: string
	externalId: string
	externalName: string
	Slug: string

	MosExternalMetaData?: MosExternalMetaData[]

	Body: MosPart[]
}
// declaration of the mosPart interface in the showstyle
export interface MosPart {
	Type: string

	Content: MosPartP | MosPartStoryItem
}
// declaration of the mosPartP interface in the showstyle
export interface MosPartP {
	//key signature so that typescripts accepts the @type and @text that MOS sends
	[key: string]: any
	text: string
}
// declaration of the MosPartStoryItem interface in the showstyle
export interface MosPartStoryItem {
	ID: number
	ObjectID: string
	MOSID: string
	Slug: string
	mosAbstract: string
	ObjectSlug: string
	Duration: number
	TimeBase: number
	Channel: string
}
// declaration of the MosExternalMetaData interface in the showstyle
export interface MosExternalMetaData {
	MosScope: string
	MosSchema: string
	MosPayload: MosPayload
}
// declaration of the MosPayload interface in the showstyle
export interface MosPayload {
	text: number
	Approved: number
	Creator: string
	MediaTime: number
	ModBy: string
	ModTime: string
	MOSItemDurations: number
	MOSObjSlugs: string
	MOSSlugs: string
	Owner: string
	pubApproved: number
	SourceMediaTime: number
	SourceModBy: string
	SourceModTime: number
	SourceTextTime: number
	TextTime: number
	CreatedDateTime: string
	RevisionNumber: number
	ENPSItemType: number
}
