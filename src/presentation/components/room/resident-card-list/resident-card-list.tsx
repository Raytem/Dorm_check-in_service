import React from 'react';
import { ResidentEntity } from '@domain/entities';
import DataStatusContainer from '@components/shared/data-status-container';
import EmptyView from '@components/shared/empty-view';
import { IconUsers } from '@tabler/icons-react';
import { Group } from '@mantine/core';
import ResidentCardSkeleton from '@components/room/skeletons/resident-card';
import ResidentCard from '@components/room/resident-card';
import {
  CancelResidentCheckInHandler,
  ConfirmResidentCheckInHandler,
  EvictResidentHandler,
  RelocateResidentHandler,
  SaveResidentNotesHandler,
} from '@components/room/resident-card/resident-card.tsx';

export interface ResidentCardListProps {
  residents: ResidentEntity[];
  isLoading: boolean;
  skeletonCardsCount?: number;
  onEvict?: EvictResidentHandler;
  onRelocate?: RelocateResidentHandler;
  onConfirmCheckIn?: ConfirmResidentCheckInHandler;
  onCancelCheckIn?: CancelResidentCheckInHandler;
  onSaveNotes?: SaveResidentNotesHandler;
}

const ResidentCardList: React.FC<ResidentCardListProps> = ({
  residents,
  isLoading,
  onEvict,
  onRelocate,
  onConfirmCheckIn,
  onCancelCheckIn,
  onSaveNotes,
  skeletonCardsCount = 3,
}) => {
  const dataLength = isLoading ? skeletonCardsCount : residents.length;

  const maxWidthStyles = {
    base: '100%',
    md: 400,
  };

  return (
    <DataStatusContainer
      skipLoadingState
      dataLength={dataLength}
      EmptyComponent={
        <EmptyView
          icon={<IconUsers size={'100%'} />}
          title={'Проживающих нет'}
          description={'В эту комнату еще никого не заселили'}
        />
      }
    >
      <Group align={'stretch'}>
        {isLoading
          ? Array.from({ length: skeletonCardsCount }).map((_, index) => (
              <ResidentCardSkeleton
                key={`resident-card-skeleton-${index}`}
                maw={maxWidthStyles}
              />
            ))
          : residents.map((resident) => (
              <ResidentCard
                key={resident.id}
                resident={resident}
                maw={maxWidthStyles}
                onEvict={onEvict}
                onConfirmCheckIn={onConfirmCheckIn}
                onCancelCheckIn={onCancelCheckIn}
                onRelocate={onRelocate}
                onSaveNotes={onSaveNotes}
              />
            ))}
      </Group>
    </DataStatusContainer>
  );
};

export default ResidentCardList;
