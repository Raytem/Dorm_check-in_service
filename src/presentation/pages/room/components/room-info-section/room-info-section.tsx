import React from 'react';
import { Group } from '@mantine/core';
import LabelValueBox from '@pages/room/components/label-value-box/label-value-box.tsx';
import { BlockType } from '@domain/enums';
import { RoomDetailsEntity } from '@domain/entities';


export interface RoomInfoSectionProps {
	room: RoomDetailsEntity | null;
}

const RoomInfoSection: React.FC<RoomInfoSectionProps> = ({
	room,
}) => {
	if (!room) return null;

	const boxesData = [
		{ label: 'Этаж', value: room.floor },
		{ label: 'Номер блока', value: room.blockNumber },
		{ label: 'Тип блока', value: BlockType.getDisplayName(room.blockType) },
		{ label: 'Свободно мест', value: room.availablePlacesCount }
	]

	return (
		<Group gap={'md'}>
			{ boxesData.map((d) => (
				<LabelValueBox
					value={d.value}
					label={d.label}
					minWidth={'150px'}
				/>
			)) }
		</Group>
	);
};

export default RoomInfoSection;