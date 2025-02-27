import React from 'react';
import { Stack } from '@mantine/core';
import { Text } from '@mantine/core';

export interface LabelValueBoxProps {
	value: any;
	label: string;
	minWidth?: React.CSSProperties['minWidth'];
	maxWidth?: React.CSSProperties['maxWidth'];
}

export const LabelValueBox: React.FC<LabelValueBoxProps> = ({
	label,
	value,
	maxWidth,
	minWidth,
}) => {
	return (
		<Stack
			gap={0}
			align={'flex-start'}
	   		maw={maxWidth}
			miw={minWidth}
			p={20}
			bg={'var(--mantine-color-gray-outline-hover)'}
			style={{
				borderRadius: 'var(--mantine-radius-md)'
			}}
		>
			<Text fw={700} size={'lg'}>
				{ value }
			</Text>
			<Text color={'dimmed'}>
				{ label }
			</Text>
		</Stack>
	);
}

export default LabelValueBox;