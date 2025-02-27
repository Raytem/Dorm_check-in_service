export enum Sex {
	MALE = 'male',
	FEMALE = 'female',
}

export namespace Sex {
	export function getDisplayName(sex: Sex) {
		const sexMap: Record<Sex, string> = {
			[Sex.MALE]: 'Мужской',
			[Sex.FEMALE]: 'Женский'
		}
		return sexMap[sex];
	}
}