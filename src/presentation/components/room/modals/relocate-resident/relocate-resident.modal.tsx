import React from 'react';
import {
  Button,
  Center,
  CloseButton,
  Input,
  LoadingOverlay,
  Modal,
  Stack,
} from '@mantine/core';
import { ResidentEntity, RoomEntity, RoomId } from '@domain/entities';
import RoomCardList from '@components/room/modals/relocate-resident/room-card-list/room-card-list.tsx';
import { useRelocateResidentModalActions } from './use-relocate-resident-modal-actions.hook';

export interface RelocateResidentModalProps {
  isOpened: boolean;
  onClose: () => void;
  resident: ResidentEntity;
  roomFrom: RoomEntity;
  onRelocate: (resident: ResidentEntity, newRoomId: RoomId) => void;
  isRelocateLoading?: boolean;
}

const RelocateResidentModal: React.FC<RelocateResidentModalProps> = (props) => {
  const {
    constants: { MIN_ROOM_NAME_LENGTH_TO_SEARCH },
    states: { searchRoomName, selectedRoom },
    queries: { getRoomsForRelocate },
    handlers: {
      onRoomNameChange,
      onRoomNameInputClear,
      onRoomCardClick,
      onExitTransitionEnd,
    },
  } = useRelocateResidentModalActions(props);

  const canCloseModal = !props.isRelocateLoading;

  return (
    <Modal
      centered
      opened={props.isOpened}
      onClose={props.onClose}
      title={`Переселение студента "${props.resident.getFullName()}" из комнаты ${props.roomFrom.roomName}`}
      size={'lg'}
      onExitTransitionEnd={onExitTransitionEnd}
      closeButtonProps={{
        disabled: !canCloseModal,
      }}
      closeOnClickOutside={canCloseModal}
      closeOnEscape={canCloseModal}
    >
      <LoadingOverlay visible={props.isRelocateLoading} />
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
            rooms={getRoomsForRelocate.data ?? []}
            selectedRoom={selectedRoom}
            isShowStartTypingHint={
              searchRoomName.length <= MIN_ROOM_NAME_LENGTH_TO_SEARCH
            }
            onCardClick={onRoomCardClick}
            isLoading={getRoomsForRelocate.isLoading}
            error={getRoomsForRelocate.error}
          />
        </div>

        <Center>
          <Button
            fullWidth
            disabled={selectedRoom === null || searchRoomName.length === 0}
            onClick={() => props.onRelocate(props.resident, 1)}
          >
            {selectedRoom === null || searchRoomName.length === 0
              ? 'Выберите комнату'
              : `Переселить в комнату ${selectedRoom.roomName}`}
          </Button>
        </Center>
      </Stack>
      <LoadingOverlay />
    </Modal>
  );
};

export default RelocateResidentModal;
