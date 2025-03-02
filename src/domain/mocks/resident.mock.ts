import { ResidentEntity } from '@domain/entities';
import { Sex } from '@domain/enums';

export const RESIDENT_MOCK_DATA: ResidentEntity[] = [
	new ResidentEntity(
		1,
		'Алексей',
		'Иванов',
		'Сергеевич',
		'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		123456,
		'А-01',
		Sex.MALE,
		true,
		new Date('2024-01-15'),
		new Date('2024-06-30'),
		'Хорошо себя вел'
	),
	new ResidentEntity(
		2,
		'Мария',
		'Петрова',
		'Алексеевна',
		'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		654321,
		'Б-02',
		Sex.FEMALE,
		false,
		new Date('2023-09-01'),
		new Date('2024-06-30'),
		'Хорошо себя вел'
	),
	new ResidentEntity(
		3,
		'Дмитрий',
		'Сидоров',
		'Игоревич',
		'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		789123,
		'В-03',
		Sex.MALE,
		true,
		new Date('2022-11-10'),
		null,
		'Хорошо себя вел'
	),
	new ResidentEntity(
		4,
		'Анна',
		'Кузнецова',
		'Владимировна',
		'https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		321789,
		'Г-04',
		Sex.FEMALE,
		true,
		new Date('2023-02-20'),
		null,
		'Хорошо себя вел'
	),
];