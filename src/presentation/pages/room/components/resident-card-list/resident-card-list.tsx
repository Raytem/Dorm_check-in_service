import React from 'react';
import { ResidentEntity } from '@domain/entities';
import DataStatusContainer from '@components/shared/data-status-container';
import EmptyView from '@components/shared/empty-view';
import { IconUserOff } from '@tabler/icons-react';
import ResidentCard from '@pages/room/components/resident-card';
import ResidentCardSkeleton from '@pages/room/components/resident-card/skeleton';
import { Group } from '@mantine/core';


export interface ResidentCardListProps {
	residents: ResidentEntity[];
	isLoading: boolean;
	skeletonCardsCount?: number;
}

const ResidentCardList: React.FC<ResidentCardListProps> = ({
	residents,
	isLoading,
	skeletonCardsCount = 3
}) => {
	const dataLength = isLoading
		? skeletonCardsCount
		: residents.length;

	const maxWidthStyles = {
		base: '100%',
		md: 400,
	}

	return <DataStatusContainer
		skipLoadingState
		dataLength={dataLength}
		EmptyComponent={<EmptyView
			icon={<IconUserOff size={''}/>}
			title={'Проживающих нет'}
			description={'В эту комнату еще никого не заселили'}
		/>}
	>
		<Group>
			{
				isLoading
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
					/>
				))
			}
		</Group>
	</DataStatusContainer>
};

export default ResidentCardList;