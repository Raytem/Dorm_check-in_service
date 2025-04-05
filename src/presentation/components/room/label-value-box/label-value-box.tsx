import React from 'react';
import { Stack, Text, Skeleton } from '@mantine/core';

export interface LabelValueBoxData {
	value: any;
	label: string;
}

export interface LabelValueBoxProps {
	data: LabelValueBoxData;
	minWidth?: React.CSSProperties['minWidth'];
	maxWidth?: React.CSSProperties['maxWidth'];
	isLoading?: boolean;
}

export const LabelValueBox: React.FC<LabelValueBoxProps> = ({
	data,
	maxWidth,
	minWidth,
	isLoading = false,
}) => {
	return (
		<Stack
			gap={5}
			align="flex-start"
			maw={maxWidth}
			miw={minWidth}
			p={20}
			bg="var(--mantine-color-gray-outline-hover)"
			style={{ borderRadius: 'var(--mantine-radius-md)' }}
		>
			{isLoading ? (
				<Skeleton height={24} width={50} />
			) : (
				<Text fw={700} size="lg">
					{data.value}
				</Text>
			)}

			{isLoading ? (
				<Skeleton height={24} width={100} />
			) : (
				<Text color="dimmed">{data.label}</Text>
			)}
		</Stack>
	);
};

export default LabelValueBox;