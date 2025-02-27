import { Skeleton, Stack } from '@mantine/core';

const LabelValueBoxSkeleton = () => {
	return (
		<Stack
			gap={10}
			w={'150px'}
			p={20}
			bg={'var(--mantine-color-gray-outline-hover)'}
			style={{
				borderRadius: 'var(--mantine-radius-md)'
			}}
		>
			<Skeleton height={'24'} width={'50'} />
			<Skeleton height={'24'} width={'100'} />
		</Stack>
	);
};

export default LabelValueBoxSkeleton;