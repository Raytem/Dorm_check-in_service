import { Checkbox, Table } from '@mantine/core';

const DormitoriesPage = () => {
	const elements = [
		{ dormitoryNumber: 1, floor: 2, room: '219м', studentName: 'Руммо Д.С.', course: 4, confirmed: true, checkInDate: '20 января 2024', note: "Аболтус" },
		{ dormitoryNumber: 1, floor: 2, room: '219м', studentName: 'Руммо Д.С.', course: 4, confirmed: false, checkInDate: '20 января 2024', note: "Аболтус" },
		{ dormitoryNumber: 1, floor: 2, room: '219м', studentName: 'Руммо Д.С.', course: 4, confirmed: true, checkInDate: '20 января 2024', note: "Аболтус" },
		{ dormitoryNumber: 1, floor: 2, room: '219м', studentName: 'Руммо Д.С.', course: 4, confirmed: false, checkInDate: '20 января 2024', note: "Аболтус" },
		{ dormitoryNumber: 1, floor: 2, room: '219м', studentName: 'Руммо Д.С.', course: 4, confirmed: true, checkInDate: '20 января 2024', note: "Аболтус" },
		{ dormitoryNumber: 1, floor: 2, room: '219м', studentName: 'Руммо Д.С.', course: 4, confirmed: true, checkInDate: '20 января 2024', note: "Аболтус" },
	];

	const rows = elements.map((element) => (
		<Table.Tr key={element.studentName}>
			<Table.Td>{element.dormitoryNumber}</Table.Td>
			<Table.Td>{element.floor}</Table.Td>
			<Table.Td>{element.room}</Table.Td>
			<Table.Td>{element.studentName}</Table.Td>
			<Table.Td>{element.course}</Table.Td>
			<Table.Td><Checkbox checked={element.confirmed} disabled /></Table.Td>
			<Table.Td>{element.checkInDate}</Table.Td>
			<Table.Td>{element.note}</Table.Td>
		</Table.Tr>
	));

	return  <Table
		verticalSpacing={'md'}
		withTableBorder
		withColumnBorders
		highlightOnHover
	>
		<Table.Thead bg={'main.6'} c={'white'}>
			<Table.Tr color={'main.4'}>
				<Table.Th>Общежитие</Table.Th>
				<Table.Th>Этаж</Table.Th>
				<Table.Th>Комната</Table.Th>
				<Table.Th>ФИО Студента</Table.Th>
				<Table.Th>Курс</Table.Th>
				<Table.Th>Подтвержден</Table.Th>
				<Table.Th>Дата заселения</Table.Th>
				<Table.Th>Примечание</Table.Th>
			</Table.Tr>
		</Table.Thead>
		<Table.Tbody>{rows}</Table.Tbody>
	</Table>
}

export default DormitoriesPage;