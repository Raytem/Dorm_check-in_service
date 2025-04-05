import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Center,
  CloseButton,
  Input,
  LoadingOverlay,
  Stack,
} from '@mantine/core';
import { ResidentEntity, RoomEntity } from '@domain/entities';
import { useDebounce } from 'use-debounce';
import RoomCardList from '@components/room/modals/relocate-resident/room-card-list/room-card-list.tsx';
import { useInjection } from 'inversify-react';
import { GetRoomsUseCase } from '@/usecases';
import { useFetch } from '@hooks/shared';

export interface RelocateResidentModalProps {
  resident: ResidentEntity;
  onRelocate: (newRoomId: number) => void;
  isRelocateLoading?: boolean;
}

const RelocateResidentModal: React.FC<RelocateResidentModalProps> = ({
  //resident,
  onRelocate,
  isRelocateLoading = false,
}) => {
  const MIN_ROOM_NAME_LENGTH_TO_SEARCH = 2;

  const getRoomsUseCase = useInjection(GetRoomsUseCase);

  const [searchRoomName, setSearchRoomName] = useState('');
  const [debouncedSearchRoomName, setDebouncedRoomName] = useDebounce(
    searchRoomName,
    700,
  );
  const [selectedRoom, setSelectedRoom] = useState<RoomEntity | null>(null);

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
  });

  useEffect(() => {
    setSelectedRoom(null);

    if (debouncedSearchRoomName.length >= MIN_ROOM_NAME_LENGTH_TO_SEARCH) {
      refetchRooms();
    }
  }, [debouncedSearchRoomName]);

  const onRoomNameChange = (value: string) => {
    if (value.length === 0) {
      onRoomNameInputClear();
    }
    setSearchRoomName(value);
  };

  const onRoomNameInputClear = () => {
    setDebouncedRoomName('');
    setSearchRoomName('');
    setRooms(null);
  };

  const onRoomCardClick = (room: RoomEntity) => {
    if (selectedRoom !== null && selectedRoom.id === room.id) {
      setSelectedRoom(null);
      return;
    }
    setSelectedRoom(room);
  };

  const searchTextLength = useMemo(() => {
    return searchRoomName.length === 0 ? 0 : debouncedSearchRoomName.length;
  }, [searchRoomName.length, debouncedSearchRoomName.length]);

  return (
    <Box>
      <LoadingOverlay visible={isRelocateLoading} />
      <Stack gap={20}>
        <Input.Wrapper label={'Введите название новой комнаты'}>
          <Input
            value={searchRoomName}
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                onClick={() => onRoomNameInputClear()}
                style={{ display: searchTextLength === 0 ? 'none' : undefined }}
              />
            }
            onChange={(e) => {
              onRoomNameChange(e.target.value);
            }}
          />
        </Input.Wrapper>

        <div
          style={{
            overflowY: 'scroll',
            height: '300px',
          }}
        >
          <RoomCardList
            rooms={rooms?.data ?? []}
            selectedRoom={selectedRoom}
            searchTextLength={searchTextLength}
            onCardClick={onRoomCardClick}
            isLoading={isRoomsLoading}
            error={roomsError}
          />
        </div>

        <Center>
          <Button
            fullWidth
            disabled={selectedRoom === null || searchTextLength === 0}
            onClick={() => onRelocate(1)}
          >
            {selectedRoom === null || searchTextLength === 0
              ? 'Переселить'
              : `Переселить в комнату ${selectedRoom.roomName}`}
          </Button>
        </Center>
      </Stack>
      <LoadingOverlay />
    </Box>
  );
};

export default RelocateResidentModal;
