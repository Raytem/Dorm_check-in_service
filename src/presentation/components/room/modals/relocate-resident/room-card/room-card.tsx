import React from 'react';
import { RoomEntity } from '@domain/entities';
import classes from './room-card.module.css'
import { Text } from '@mantine/core';
import { BlockType } from '@domain/enums';
import classNames from 'classnames';

export interface RoomCardProps {
	room: RoomEntity,
	isSelected?: boolean,
	onClick?: (room: RoomEntity) => void,
}

const RoomCard: React.FC<RoomCardProps> = ({
	room,
	isSelected = false,
	onClick = () => {},
}) => {
	const cardClassNames = [classes['room-card']]
	if (isSelected) {
		cardClassNames.push(classes['room-card_active'])
	}

	return <div
		className={classNames(cardClassNames)}
		onClick={() => {
			onClick(room)
		}}
	>
		<Text>{room.roomName}, общежитие {room.dormitoryNumber}</Text>
		<Text>{BlockType.getDisplayName(room.blockType)}</Text>
	</div>
};

export default RoomCard;