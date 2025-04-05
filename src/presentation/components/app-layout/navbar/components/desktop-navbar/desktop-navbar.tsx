import React from 'react';
import { ActionIcon, ScrollArea, Stack, Tooltip, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import NavbarBurgerButton from '@components/app-layout/navbar/components/navbar-burger-button';
import { linksData } from '@components/app-layout/navbar/navbar.constants.tsx';


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