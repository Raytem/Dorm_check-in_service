import React from 'react';
import EmptyView from '@components/shared/empty-view';
import { Stack } from '@mantine/core';
import DataStatusContainer from '@components/shared/data-status-container';
import { RoomEntity } from '@domain/entities';
import RoomCard from '@pages/room/modals/relocate-resident/components/room-card/room-card.tsx';
import RoomCardSkeleton from '@pages/room/modals/relocate-resident/components/room-card/room-card.skeleton.tsx';
import { IconDoor } from '@tabler/icons-react';

export interface RoomCardListProps {
	rooms: RoomEntity[],
	onCardClick: (room: RoomEntity) => void,
	isLoading: boolean,
	searchTextLength?: number,
	selectedRoom: null | RoomEntity,
	error?: null | unknown,
	skeletonCardsCount?: number,
}

const RoomCardList: React.FC<RoomCardListProps> = ({
	rooms,
	onCardClick,
	isLoading,
	searchTextLength = 0,
   	selectedRoom = null,
	error = null,
	skeletonCardsCount = 5,
}) => {
	return (
		<DataStatusContainer
			skipLoadingState
			dataLength={rooms.length}
			isLoading={isLoading}
			error={error}
			EmptyComponent={
				<EmptyView
					icon={<IconDoor size={''}/>}
					title={
						searchTextLength === 0
							? 'Начните вводить название комнаты'
							: 'Не удалось найти комнаты'
					}
				/>
			}
		>
			<Stack gap={10}>
				{
					isLoading
						? Array.from({ length: skeletonCardsCount }).map((_, index) => (
							<RoomCardSkeleton key={index} />
						))
						: rooms.map((room) => {
							const isSelected = room.id === selectedRoom?.id;

							return (
								<RoomCard
									key={room.id}
									room={room}
									isSelected={isSelected}
									onClick={onCardClick}
								/>
							)
						})
				}
			</Stack>
		</DataStatusContainer>
	)
};

export default RoomCardList;