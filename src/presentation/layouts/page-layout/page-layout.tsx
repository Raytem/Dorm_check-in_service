import React from 'react';
import { Group, Skeleton, Stack, StackProps, Title } from '@mantine/core';
import BackButton, { BackButtonProps } from '@layouts/page-layout/components/back-button.tsx';

export interface PageLayoutProps extends StackProps {
	backButton?: BackButtonProps
	title?: string
	children: React.ReactNode;
	isTitleLoading?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
	backButton,
	title,
	isTitleLoading = false,
	children,
	...props
}) => {
	return <Stack gap={'xl'} {...props}>
		<Stack
			hidden={ !title && !backButton}
		>
			{ backButton && <BackButton { ...backButton } /> }

			<Group>
				{ title &&
					isTitleLoading
						? <Skeleton height={35} width={260}/>
						: <Title order={2}>{ title }</Title>
				}
			</Group>
		</Stack>

		{ children }
	</Stack>
}

export default PageLayout;