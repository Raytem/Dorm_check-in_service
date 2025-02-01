export class AuthenticatedUserEntity {
	constructor(
		public id: number,
		public firstName: string,
		public lastName: string,
		public patronymic: string,
		public userName: string,
		public avatarUrl: string | null,
		public email: string,
		public roles: string[]
	) {}
}