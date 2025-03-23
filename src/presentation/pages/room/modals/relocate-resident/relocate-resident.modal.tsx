import React, { useEffect, useState } from 'react';
import { Box, Button, Center, CloseButton, Input, LoadingOverlay, ScrollArea, Stack } from '@mantine/core';
import { ResidentEntity, RoomEntity } from '@domain/entities';
import { useDebounce } from 'use-debounce';
import RoomCardList from '@pages/room/modals/relocate-resident/components/room-card-list/room-card-list.tsx';
import { useInjection } from 'inversify-react';
import { GetRoomsUseCase } from '@/usecases';
import { useFetch } from '@presentation/hooks';

export interface RelocateResidentModalProps {
	resident: ResidentEntity;
	onRelocate: (newRoomId: number) => void;
	isRelocateLoading?: boolean
}

const RelocateResidentModal: React.FC<RelocateResidentModalProps> = ({
	//resident,
 	onRelocate,
	isRelocateLoading = false,
}) => {
	const MIN_ROOM_NAME_LENGTH_TO_SEARCH = 2;

	const getRoomsUseCase = useInjection(GetRoomsUseCase)

	const [searchRoomName, setSearchRoomName] =
		useState('');
	const [debouncedSearchRoomName, setDebouncedRoomName] =
		useDebounce(searchRoomName,  700);
	const [selectedRoom, setSelectedRoom] =
		useState<RoomEntity | null>(null)

	const {
		data: rooms,
		isLoading: isRoomsLoading,
		error: roomsError,
		refetch: refetchRooms,
		setData: setRooms,
	} = useFetch(async () => {
		return await getRoomsUseCase.execute({
			page: 1,
			limit: 1,
			roomName: debouncedSearchRoomName,
		});
	})

	useEffect(() => {
		setSelectedRoom(null)

		if (debouncedSearchRoomName.length >= MIN_ROOM_NAME_LENGTH_TO_SEARCH) {
			refetchRooms()
		}
	}, [debouncedSearchRoomName]);

	const onRoomNameChange = (value: string) => {
		if (value.length === 0) {
			onRoomNameInputClear()
		}
		setSearchRoomName(value);
	}

	const onRoomNameInputClear = () => {
		setDebouncedRoomName('')
		setSearchRoomName('');
		setRooms(null);
	}

	const onRoomCardClick = (room: RoomEntity) => {
		if (
			selectedRoom !== null
			&& selectedRoom.id === room.id
		) {
			setSelectedRoom(null);
			return;
		}
		setSelectedRoom(room);
	}

	return <Box>
		<LoadingOverlay
			visible={isRelocateLoading}
		/>
			<Stack gap={20}>
				<Input.Wrapper label={'Введите название новой комнаты'}>
					<Input
						value={searchRoomName}
						rightSectionPointerEvents="all"
						rightSection={
							<CloseButton
								onClick={() => onRoomNameInputClear()}
								style={{ display: debouncedSearchRoomName.length === 0 ? 'none' : undefined }}
							/>
						}
						onChange={(e) => {
							onRoomNameChange(e.target.value)
						}}
					/>
				</Input.Wrapper>

				<ScrollArea
					h={300}
				>
					<RoomCardList
						rooms={rooms?.data ?? []}
						selectedRoom={selectedRoom}
						searchTextLength={debouncedSearchRoomName.length}
						onCardClick={onRoomCardClick}
						isLoading={isRoomsLoading}
						error={roomsError}
					/>
				</ScrollArea>

				<Center>
					<Button
						fullWidth
						disabled={selectedRoom === null}
						onClick={() => onRelocate(1)}
					>
						{selectedRoom === null
								? 'Переселить'
								: `Переселить в комнату ${selectedRoom.roomName}`}
					</Button>
				</Center>
			</Stack>
		<LoadingOverlay/>
	</Box>
};

export default RelocateResidentModal;