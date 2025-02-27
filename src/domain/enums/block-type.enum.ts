export enum BlockType {
	MALE = 'male',
	FEMALE = 'female',
}

export namespace BlockType {
	export function getDisplayName(blockType: BlockType) {
		const blockTypeMap: Record<BlockType, string> = {
			[BlockType.MALE]: 'Мужской',
			[BlockType.FEMALE]: 'Женский'
		}

		return blockTypeMap[blockType];
	}
}