import LabelValueBoxSkeleton from '@pages/room/components/label-value-box/label-value-box.skeleton.tsx';
import { Group, Stack } from '@mantine/core';

const RoomPageSkeleton = () => {
	const valueBoxesCount = 4;

	return <Stack>
		<Group gap={'xl'}>
			{Array.from({ length: valueBoxesCount }).map((_, i) => (
				<LabelValueBoxSkeleton key={i} />
			))}
		</Group>
	</Stack>
};

export default RoomPageSkeleton;