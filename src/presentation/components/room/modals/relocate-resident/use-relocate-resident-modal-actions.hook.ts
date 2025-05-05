import { RelocateResidentModalProps } from '@components/room/modals/relocate-resident/relocate-resident.modal.tsx';
import { useInjection } from 'inversify-react';
import { GetAvailableRoomsToRelocateResidentUseCase } from '@usecases/rooms';
import { useEffect, useState } from 'react';
import { RoomEntity } from '@domain/entities';
import { useFetch } from '@hooks/shared';
import { useDebouncedCallback } from 'use-debounce';

export const useRelocateResidentModalActions = (
  props: RelocateResidentModalProps,
) => {
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
      props.resident.id,
    );
  });

  const refetchRoomsDebounced = useDebouncedCallback(() => {
    setSelectedRoom(null);
    refetchRooms();
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    if (searchRoomName.length < MIN_ROOM_NAME_LENGTH_TO_SEARCH) {
      return;
    }
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

  return {
    constants: { MIN_ROOM_NAME_LENGTH_TO_SEARCH },
    states: {
      searchRoomName,
      selectedRoom,
    },
    queries: {
      getRoomsForRelocate: {
        data: rooms,
        isLoading: isRoomsLoading,
        error: roomsError,
        refetch: refetchRooms,
      },
    },
    handlers: {
      onRoomNameChange,
      onRoomNameInputClear,
      onRoomCardClick,
      onExitTransitionEnd,
    },
  };
};
