import { Avatar, Group, Stack, Text, useMatches } from '@mantine/core';
import React from 'react';
import { TextUtil } from '@presentation/utils';

export interface ProfileBlockProps {
	name: string,
	surname: string,
	patronymic: string,
	username: string,
	email: string
	avatarUrl: string | null
	className?: string
}

const ProfileBlock: React.FC<ProfileBlockProps> = (props) => {

	const displayName = `${TextUtil.capitalize(props.surname)} ${props.name.slice(1, 2).toUpperCase()}. ${props.patronymic.slice(1, 2).toUpperCase()}.`;

	const avatarSize: number = useMatches({
		base: 40,
		sm: 50,
	});

	return <Group
		className={props.className ?? ''}
		h="100%"
		gap={'md'}
		wrap={'nowrap'}
		align={'center'}
	>
		<Avatar
			radius={'xl'}
			size={avatarSize}
			src={props.avatarUrl}
			color={'gray.6'}
			variant={'filled'}
		/>
		<Stack gap={0}>
			<Text fw={'bold'} lineClamp={1}>{displayName}</Text>
			<Text visibleFrom={'sm'} size={'xs'} lineClamp={1}>{props.username}</Text>
			<Text size={'xs'} lineClamp={1}>{props.email}</Text>
		</Stack>
	</Group>
}

export default ProfileBlock;