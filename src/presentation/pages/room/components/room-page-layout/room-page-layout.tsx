import PageLayout from '@/presentation/layouts/page-layout';
import React from 'react';
import RoomPageSkeleton from '@pages/room/skeletons';
import DataStatusContainer from '@components/shared/data-status-container';

export interface RoomPageLayoutProps {
	dormitoryNumber?: number;
	roomName?: string;
	isLoading?: boolean
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
	return <PageLayout
		backButton={{ title: 'К списку комнат', link: '/rooms' }}
		title={`Общежитие ${dormitoryNumber ?? '_'}, комната ${roomName ?? '_'}`}
		isTitleLoading={isLoading}
	>
		<DataStatusContainer
			skipLoadingState
			isLoading={isLoading}
			error={error}
		>

		{ isLoading ? <RoomPageSkeleton/> : children }
		</DataStatusContainer>
	</PageLayout>
};

export default RoomPageLayout;