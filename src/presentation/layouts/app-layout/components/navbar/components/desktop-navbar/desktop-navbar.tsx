import React from 'react';
import NavbarBurgerButton from '@layouts/app-layout/components/navbar/components/navbar-burger-button';
import { ActionIcon, ScrollArea, Stack, Tooltip, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { linksData } from '@layouts/app-layout/components/navbar/navbar.constants.tsx';


export interface DesktopNavbarProps {
	activeLinkIdx: number,
	toggleNavbarCollapsed: () => void
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
	activeLinkIdx = 0,
 	toggleNavbarCollapsed,
}) => {
	const { colorScheme } = useMantineColorScheme()
	const actionIconColor = colorScheme === 'dark' ? 'text' : 'main.6'

	return <Stack align={'center'} gap={0} h={'100%'}>
		<NavbarBurgerButton my={35} opened={false} onClick={toggleNavbarCollapsed} />
		<ScrollArea type={'auto'} w={'100%'}>
			<Stack align="center" py={'md'}>
				{
					linksData.map((data, idx) => {
						return <Tooltip key={data.link} label={data.label} position={'right'}>
							<Link to={data.link} key={idx}>
								<ActionIcon
									color={actionIconColor}
									size={'xl'}
									variant={idx === activeLinkIdx ? 'light' : 'subtle'}
								>
									{data.icon}
								</ActionIcon>
							</Link>
						</Tooltip>
					})
				}
			</Stack>
		</ScrollArea>
	</Stack>
}

export default DesktopNavbar