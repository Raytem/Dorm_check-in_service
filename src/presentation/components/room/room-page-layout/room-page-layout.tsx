import PageLayout from 'presentation/layouts/page';
import React from 'react';
import RoomPageSkeleton from '@components/room/skeletons/room-page';
import DataStatusContainer from '@components/shared/data-status-container';
import { AppRoutes } from '@routing/app-routes.ts';

export interface RoomPageLayoutProps {
  dormitoryNumber?: number;
  roomName?: string;
  isLoading?: boolean;
  error?: unknown;
  children?: React.ReactNode;
}

const RoomPageLayout: React.FC<RoomPageLayoutProps> = ({
  dormitoryNumber,
  roomName,
  isLoading = false,
  error = null,
  children,
}) => {
  return (
    <PageLayout
      backButton={{
        title: 'К списку комнат',
        to: AppRoutes.getPath(AppRoutes.ROOMS),
      }}
      title={`Общежитие ${dormitoryNumber ?? '_'}, комната ${roomName ?? '_'}`}
      isTitleLoading={isLoading}
    >
      <DataStatusContainer skipLoadingState isLoading={isLoading} error={error}>
        {isLoading ? <RoomPageSkeleton /> : children}
      </DataStatusContainer>
    </PageLayout>
  );
};

export default RoomPageLayout;
