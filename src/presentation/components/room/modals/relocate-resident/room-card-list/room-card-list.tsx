import React from 'react';
import EmptyView from '@components/shared/empty-view';
import { Stack } from '@mantine/core';
import DataStatusContainer from '@components/shared/data-status-container';
import { RoomEntity } from '@domain/entities';
import RoomCard from '@components/room/modals/relocate-resident/room-card/room-card.tsx';
import RoomCardSkeleton from '@components/room/skeletons/rooom-card/room-card.skeleton.tsx';
import { IconDoor } from '@tabler/icons-react';

export interface RoomCardListProps {
  rooms: RoomEntity[];
  onCardClick: (room: RoomEntity) => void;
  isLoading: boolean;
  isShowStartTypingHint?: boolean;
  selectedRoom: null | RoomEntity;
  error?: null | unknown;
  skeletonCardsCount?: number;
}

const RoomCardList: React.FC<RoomCardListProps> = ({
  rooms,
  onCardClick,
  isLoading,
  isShowStartTypingHint,
  selectedRoom = null,
  error = null,
  skeletonCardsCount = 5,
}) => {
  let emptyViewTitle = 'Не удалось найти комнаты';
  if (isShowStartTypingHint) {
    emptyViewTitle = 'Начните вводить название комнаты';
  }

  return (
    <DataStatusContainer
      skipLoadingState
      dataLength={rooms.length}
      isLoading={isLoading}
      error={error}
      EmptyComponent={
        <EmptyView icon={<IconDoor size={'100%'} />} title={emptyViewTitle} />
      }
    >
      <Stack gap={10}>
        {isLoading
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
              );
            })}
      </Stack>
    </DataStatusContainer>
  );
};

export default RoomCardList;
