import React, { useEffect, useState } from 'react';
import {
  Button,
  Center,
  CloseButton,
  Input,
  LoadingOverlay,
  Modal,
  Stack,
} from '@mantine/core';
import { ResidentEntity, RoomEntity } from '@domain/entities';
import { useDebouncedCallback } from 'use-debounce';
import RoomCardList from '@components/room/modals/relocate-resident/room-card-list/room-card-list.tsx';
import { useInjection } from 'inversify-react';
import { GetAvailableRoomsToRelocateResidentUseCase } from '@/usecases';
import { useFetch } from '@hooks/shared';

export interface RelocateResidentModalProps {
  isOpened: boolean;
  onClose: () => void;
  resident: ResidentEntity;
  roomFrom: RoomEntity;
  onRelocate: (resident: ResidentEntity, newRoomId: number) => void;
  isRelocateLoading?: boolean;
}

const RelocateResidentModal: React.FC<RelocateResidentModalProps> = ({
  isOpened,
  onClose,
  resident,
  roomFrom,
  onRelocate,
  isRelocateLoading = false,
}) => {
  const MIN_ROOM_NAME_LENGTH_TO_SEARCH = 2;
  const DEBOUNCE_DELAY = 700;

  const getAvailableRoomsToRelocateResidentUseCase = useInjection(
    GetAvailableRoomsToRelocateResidentUseCase,
  );

  const [searchRoomName, setSearchRoomName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<RoomEntity | null>(null);

  const {
    data: rooms,
    isLoading: isRoomsLoading,
    error: roomsError,
    refetch: refetchRooms,
    setData: setRooms,
  } = useFetch(async () => {
    return await getAvailableRoomsToRelocateResidentUseCase.execute(
      searchRoomName,
      resident.id,
    );
  });

  const refetchRoomsDebounced = useDebouncedCallback(() => {
    setSelectedRoom(null);
    if (searchRoomName.length < MIN_ROOM_NAME_LENGTH_TO_SEARCH) {
      return;
    }
    refetchRooms();
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    refetchRoomsDebounced();
  }, [searchRoomName]);

  const clearState = () => {
    setSearchRoomName('');
    setRooms(null);
    setSelectedRoom(null);
  };

  const onRoomNameChange = (value: string) => {
    if (value.length <= MIN_ROOM_NAME_LENGTH_TO_SEARCH) {
      setRooms(null);
    }
    setSearchRoomName(value);
  };

  const onRoomNameInputClear = () => {
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

  const onExitTransitionEnd = () => {
    clearState();
  };

  return (
    <Modal
      centered
      opened={isOpened}
      onClose={onClose}
      title={`Переселение студента ${resident.getFullName()} из комнаты ${roomFrom.roomName}`}
      size={'lg'}
      onExitTransitionEnd={onExitTransitionEnd}
    >
      <LoadingOverlay visible={isRelocateLoading} />
      <Stack gap={20}>
        <Input.Wrapper label={'Введите название новой комнаты'}>
          <Input
            value={searchRoomName}
            data-autofocus
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                onClick={onRoomNameInputClear}
                style={{
                  display: searchRoomName.length === 0 ? 'none' : undefined,
                }}
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
            height: '350px',
          }}
        >
          <RoomCardList
            rooms={rooms ?? []}
            selectedRoom={selectedRoom}
            isShowStartTypingHint={
              searchRoomName.length <= MIN_ROOM_NAME_LENGTH_TO_SEARCH
            }
            onCardClick={onRoomCardClick}
            isLoading={isRoomsLoading}
            error={roomsError}
          />
        </div>

        <Center>
          <Button
            fullWidth
            disabled={selectedRoom === null || searchRoomName.length === 0}
            onClick={() => onRelocate(resident, 1)}
          >
            {selectedRoom === null || searchRoomName.length === 0
              ? 'Переселить'
              : `Переселить в комнату ${selectedRoom.roomName}`}
          </Button>
        </Center>
      </Stack>
      <LoadingOverlay />
    </Modal>
  );
};

export default RelocateResidentModal;
