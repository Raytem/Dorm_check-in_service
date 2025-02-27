import React from 'react';
import { Group, Stack, StackProps, Title } from '@mantine/core';

export interface PageLayoutProps extends StackProps {
	title?: string
	children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
	title,
	children,
	...props
}) => {
	return <Stack gap={'xl'} {...props}>
		<Group>
			{ title && <Title order={2}>{ title }</Title> }
		</Group>

		{ children }
	</Stack>
}

export default PageLayout;