import React from 'react';
import { ActionIcon, Burger as MantineBurger } from '@mantine/core';
import classes from '@layouts/app-layout/components/header/header.module.css';

export interface BurgerProps {
	opened: boolean,
	onClick: () => void,
}

const Burger: React.FC<BurgerProps> = ({
	opened,
	onClick
}) => {
	return <ActionIcon
		className={classes['header__toolbarBurger']!}
		hiddenFrom='sm'
		size={'lg'}
		bg={'main.7'}
		variant={'light'}
		onClick={onClick}
	>
		<MantineBurger
			color={'white'}
			opened={opened}
			size="sm"
		/>
	</ActionIcon>
}

export default Burger