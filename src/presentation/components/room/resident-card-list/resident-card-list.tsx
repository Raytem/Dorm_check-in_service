import React from 'react';
import { ResidentEntity } from '@domain/entities';
import DataStatusContainer from '@components/shared/data-status-container';
import EmptyView from '@components/shared/empty-view';
import { IconUsers } from '@tabler/icons-react';
import { Group } from '@mantine/core';
import ResidentCardSkeleton from '@components/room/skeletons/resident-card';
import ResidentCard from '@components/room/resident-card';

export interface ResidentCardListProps {
  residents: ResidentEntity[];
  isLoading: boolean;
  skeletonCardsCount?: number;
  onEvict?: (resident: ResidentEntity) => void;
  onRelocate?: (resident: ResidentEntity) => void;
  onConfirmCheckIn?: (resident: ResidentEntity) => void;
  onCancelResidentCheckIn?: (resident: ResidentEntity) => void;
}

const ResidentCardList: React.FC<ResidentCardListProps> = ({
  residents,
  isLoading,
  onEvict,
  onRelocate,
  onConfirmCheckIn,
  onCancelResidentCheckIn,
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
          icon={<IconUsers size={''} />}
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
                onCancelResidentCheckIn={onCancelResidentCheckIn}
                onRelocate={onRelocate}
              />
            ))}
      </Group>
    </DataStatusContainer>
  );
};

export default ResidentCardList;
