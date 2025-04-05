import React from 'react';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';


export interface BackButtonProps {
	title?: string,
	link: string,
}

const BackButton: React.FC<BackButtonProps> = ({
	title = 'Назад',
	link
}) => {
	return (
		<Link
			to={link}
			style={{ alignSelf: 'flex-start' }}
		>
			<Button
				variant={'transparent'}
				pl={0}
				leftSection={
					<IconArrowLeft/>
				}
			>
				{ title }
			</Button>
		</Link>
	);
};

export default BackButton;