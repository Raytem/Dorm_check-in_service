import React from 'react';
import { BoxProps, Button, Checkbox, CloseButton, Group, Input, NumberInput, Select, Stack } from '@mantine/core';
import { BlockType } from '@domain/enums';
import { RoomSearchFiltersEntity } from '@domain/entities/room-search-filters.entity.ts';
import { useDebouncedFilter } from '@presentation/hooks';
import { IconFilterCancel } from '@tabler/icons-react';

export interface RoomFiltersProps extends BoxProps {
	filters: RoomSearchFiltersEntity;
	setFilters: (filters: RoomSearchFiltersEntity) => void;
	resetFilters: () => void;
}

const RoomsFilters: React.FC<RoomFiltersProps> = ({
  	filters: {
		dormitoryNumber,
		floor,
		blockNumber,
		roomName,
		blockType,
		studentGroup,
		onlyAvailableRooms
	},
	setFilters,
	resetFilters,
	...props
}) => {
	const debounceDelay = 700

	const [localRoomName, setRoomName] = useDebouncedFilter<RoomSearchFiltersEntity['roomName']>(
		roomName,
		debounceDelay,
		(value) => setFilters({ roomName: value })
	)

	const [localFloor, setFloor] = useDebouncedFilter<RoomSearchFiltersEntity['floor']>(
		floor,
		debounceDelay,
		(value) => setFilters({ floor: value })
	)

	const [localDormitoryNumber, setDormitoryNumber] = useDebouncedFilter<RoomSearchFiltersEntity['dormitoryNumber']>(
		dormitoryNumber,
		debounceDelay,
		(value) => setFilters({ dormitoryNumber: value })
	)

	const [localBlockNumber, setBlockNumber] = useDebouncedFilter<RoomSearchFiltersEntity['blockNumber']>(
		blockNumber,
		debounceDelay,
		(value) => setFilters({ blockNumber: value })
	)

	const [localStudentGroup, setStudentGroup] = useDebouncedFilter<RoomSearchFiltersEntity['studentGroup']>(
		studentGroup,
		debounceDelay,
		(value) => setFilters({ studentGroup: value })
	)

	const resetLocalState = () => {
		setRoomName(undefined)
		setFloor(undefined)
		setDormitoryNumber(undefined)
		setBlockNumber(undefined)
		setStudentGroup(undefined)
	}

	const handleClearFilters = () => {
		resetFilters()
		resetLocalState()
	}

	const isFiltersEmpty = dormitoryNumber !== undefined
		|| floor !== undefined
		|| blockNumber !== undefined
		|| roomName !== undefined
		|| blockType !== undefined
		|| studentGroup !== undefined
		|| onlyAvailableRooms !== undefined;

	const parseNumberInputValue = (value: number | string): number | undefined => {
		if ( typeof value === 'number' ) {
			return Number(value)
		}
		return undefined
	}

	const blockTypeSelectData = [
		{ value: BlockType.MALE, label: 'Мужской' },
		{ value: BlockType.FEMALE, label: 'Женский' }
	]

	return <Stack gap={'xl'} {...props} >
		<Stack>
			<Group align={'center'}>
				<Input.Wrapper label={'Номер общежития'}>
					<NumberInput
						value={localDormitoryNumber ?? ''}
						allowDecimal={false}
						min={1}
						onChange={(value) => setDormitoryNumber(parseNumberInputValue(value))}
					/>
				</Input.Wrapper>

				<Input.Wrapper label={'Этаж'}>
					<NumberInput
						value={localFloor ?? ''}
						allowDecimal={false}
						min={1}
						onChange={(value) => setFloor(parseNumberInputValue(value))}
					/>
				</Input.Wrapper>

				<Input.Wrapper label={'Номер блока'}>
					<NumberInput
						value={localBlockNumber ?? ''}
						allowDecimal={false}
						min={1}
						onChange={(value) => setBlockNumber(parseNumberInputValue(value))}
					/>
				</Input.Wrapper>

				<Select
					label={'Тип блока'}
					value={blockType ?? null}
					data={blockTypeSelectData}
					clearable
					onChange={(value) => {setFilters({ blockType: value as BlockType  }) }}
				/>

				<Input.Wrapper label={'Комната'}>
					<Input
						value={localRoomName || ''}
						rightSectionPointerEvents="all"
						rightSection={
							<CloseButton
								onClick={() => setRoomName(undefined)}
								style={{ display: localRoomName ? undefined : 'none' }}
							/>
						}
						onChange={(e) => {
							setRoomName(e.target.value || undefined);
						}} />
				</Input.Wrapper>

				<Input.Wrapper label={'Группа студента'}>
					<Input
						value={localStudentGroup || ''}
						rightSectionPointerEvents="all"
						rightSection={
							<CloseButton
								onClick={() => setStudentGroup(undefined) }
								style={{ display: localStudentGroup ? undefined : 'none' }}
							/>
						}
						onChange={(e) => setStudentGroup(e.target.value || undefined) }

					/>
				</Input.Wrapper>
			</Group>

			<Checkbox
				checked={onlyAvailableRooms}
				label="Показывать только свободные комнаты"
				onChange={(e) => {
					setFilters({ onlyAvailableRooms: e.target.checked || undefined })
				}}
			/>
		</Stack>

		<Stack w={'fit-content'}>
			<Button
				color={'red'}
				leftSection={<IconFilterCancel/>}
				disabled={!isFiltersEmpty}
				onClick={handleClearFilters}
			>
				Сбросить фильтры
			</Button>
		</Stack>
	</Stack>
}

export default RoomsFilters;