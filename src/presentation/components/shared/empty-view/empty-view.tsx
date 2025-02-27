import React from 'react';
import { BoxProps, Stack, Title, Text, Group } from '@mantine/core';

export interface EmptyViewProps extends BoxProps {
	icon?: React.ReactNode;
	title?: string;
	description?: string;
	actionBarItems?: React.ReactNode;
}

const EmptyView: React.FC<EmptyViewProps> = ({
	icon,
	title= 'Данных нет',
	description,
	actionBarItems
				   }) => {
	return <Stack mih={'250px'} align={'center'} justify={'center'} gap={10}>
		{ icon && (
			<Stack w={125} h={125} c={'dimmed'} align={'center'} justify={'center'}>
				{ icon }
			</Stack>
		)}

		<Stack align={'center'} gap={'0'}>
			<Title order={4}>{title}</Title>
			{ description && (
				<Text c={'dimmed'} size={'sm'}>{ description }</Text>
			)}
		</Stack>

		{ actionBarItems && (
			<Group align={'center'}>
				{ actionBarItems }
			</Group>
		)}
	</Stack>
}

export default EmptyView