import LabelValueBox from '@pages/room/components/label-value-box/label-value-box';
import { Group, Stack } from '@mantine/core';
import ResidentCardList from '@pages/room/components/resident-card-list';
import ResidentsSectionHeader from '@pages/room/components/residents-section-header';

const RoomPageSkeleton = () => {
	const valueBoxesCount = 4;

	return <Stack gap={'xl'}>
		<Group gap={'md'}>
			{Array.from({ length: valueBoxesCount }).map((_, i) => (
				<LabelValueBox data={{
					label: '',
					value: '',
				}} key={i} isLoading />
			))}
		</Group>

		<ResidentsSectionHeader isLoading />

		<ResidentCardList residents={[]} isLoading skeletonCardsCount={3} />
	</Stack>
};

export default RoomPageSkeleton;