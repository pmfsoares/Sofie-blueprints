// declaration of the IntermediatePart in the showstyle
export interface IntermediatePart {
	type: string | null
	payload: any
}
// declaration of the IntermediateSegment in the showstyle
export interface IntermediateSegment {
	type: string | null
	parts: IntermediatePart[]
	payload: any
}
