import React from 'react';
import {
	AppShell,
	Box,
	Title,
	TitleOrder,
	useMatches,
} from '@mantine/core';

import { useInjection } from 'inversify-react';
import { ConfigService } from '@infrastructure/services';
import { useSelector } from 'react-redux';
import { selectAuthenticatedUser } from '@application/store/slices';
import { Link } from 'react-router-dom';

import ProfileBlock from '@layouts/app-layout/components/profile-block';
import Burger from './components/burger';
import ThemeButton from './components/theme-button';

import classes from './header.module.css';
import LogoutButton from '../logout-button';


export interface HeaderProps {
	burgerOpened: boolean;
	toggleBurger: () => void;
}

const Header: React.FC<HeaderProps> = ({
	burgerOpened,
	toggleBurger,
}) => {
	const config = useInjection(ConfigService)

	const { authenticatedUser } = useSelector(selectAuthenticatedUser)

	const logoTitleOrder: TitleOrder = useMatches({
		base: 4,
		md: 3,
	});

	return  <AppShell.Header
		bg={'main.6'}
		c={'white'}
	>
		<Box
			className={classes['header__inner']!}
		>
			<Box
				className={classes['header__logo']!}
			>
				<Link to={'/'}>
					<Title
						order={logoTitleOrder}
						lineClamp={2}
						textWrap={'wrap'}
					>
						{config.getConfig().app.title}
					</Title>
				</Link>
			</Box>


			<Box
				className={classes['header__toolbar']!}
			>
				<ThemeButton className={classes['header__toolbarThemeBtn']!}/>

				{
					authenticatedUser && <>
						<ProfileBlock
							className={classes['header__toolbarProfile']!}
							name={authenticatedUser.firstName}
							surname={authenticatedUser.lastName}
							patronymic={authenticatedUser.patronymic}
							username={authenticatedUser.userName}
							email={authenticatedUser.email}
							avatarUrl={authenticatedUser.avatarUrl}
						/>

						<LogoutButton visibleFrom={'sm'} className={classes['header__toolbarLogoutBtn']!}/>

						<Box className={classes['header__toolbarSpacer']!}></Box>

						<Burger
							opened={burgerOpened}
							onClick={toggleBurger}
						/>
					</>
				}
			</Box>
		</Box>
	</AppShell.Header>
}

export default Header