import React from 'react';
import { BoxProps, Group, NavLink, ScrollArea } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import NavbarBurgerButton from '@layouts/app-layout/components/navbar/components/navbar-burger-button';
import { linksData } from '@layouts/app-layout/components/navbar/navbar.constants.tsx';
import { Link } from 'react-router-dom';
import LogoutButton from '@layouts/app-layout/components/logout-button';


export interface MobileNavbarProps extends BoxProps {
	activeLinkIdx?: number;
	onLinkClick?: () => void;
	isNavbarCollapsed?: boolean;
	toggleNavbarCollapsed?: () => void;
}

const MobileNavbar = ({
	activeLinkIdx = 0,
	onLinkClick = () => {},
	toggleNavbarCollapsed = () => {},
	...props
}: MobileNavbarProps): React.JSX.Element => {
	return <ScrollArea
		type={'auto'}
		bg={'var(--mantine-color-body)'}
		{...props}
		style={{
		zIndex: 201,
		...props.style
	   }}>
			<Group wrap={'nowrap'} w={'100%'} justify={'space-between'} align={'center'} pr={'xl'}>
				<Link to={linksData[0]!.link} style={{ width: '100%' }}>
					<NavLink
						pl={'xl'}
						p={0}
						py={'45'}
						label={'Главная'}
						leftSection={<IconHome/>}
						variant={'filled'}
						color={'main.6'}
						onClick={() => {
							onLinkClick()
							toggleNavbarCollapsed()
						}}
					/>
				</Link>

				<NavbarBurgerButton visibleFrom={'sm'} opened={true} onClick={toggleNavbarCollapsed} />
				<LogoutButton hiddenFrom={'sm'} variant={'outline'} />
			</Group>

			{
				linksData.map((data, idx) => {
					return <Link to={data.link} key={idx}>
						<NavLink
							py={'lg'}
							px={'xl'}
							label={data.label}
							leftSection={data.icon}
							variant='filled'
							active={idx === activeLinkIdx}
							color={'main.6'}
							onClick={() => {
								onLinkClick()
								toggleNavbarCollapsed()
							}}
						/>
					</Link>
				})
			}
	</ScrollArea>
}

export default MobileNavbar;