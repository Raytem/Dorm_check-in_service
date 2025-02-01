export class TextUtil {
	static capitalize(str: string): string {
		if (str.length) {
			return str[0]!.toUpperCase() + str.substring(1)
		}
		return str
	}
}