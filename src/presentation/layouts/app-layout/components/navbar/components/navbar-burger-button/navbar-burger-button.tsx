import React from 'react';
import { ActionIcon, BoxProps, Burger, useMantineColorScheme } from '@mantine/core';


export interface NavbarBurgerButtonProps extends BoxProps {
	opened: boolean;
	onClick: () => void;
}

const NavbarBurgerButton: React.FC<NavbarBurgerButtonProps> = ({
	opened = false,
	onClick = () => {},
	...props
}) => {
	const { colorScheme } = useMantineColorScheme()

	return <ActionIcon
		variant={'default'}
		size={'xl'}
		onClick={onClick}
		{...props}
	>
		<Burger
			color={colorScheme === 'dark' ? 'white' : 'main.6'}
			opened={opened}
		/>
	</ActionIcon>
}

export default NavbarBurgerButton;