import React from 'react';
import { Group } from '@mantine/core';
import LabelValueBox, { LabelValueBoxData } from '@pages/room/components/label-value-box/label-value-box.tsx';
import { BlockType } from '@domain/enums';
import { RoomDetailsEntity } from '@domain/entities';


export interface RoomInfoSectionProps {
	room: RoomDetailsEntity | null;
}

const RoomInfoSection: React.FC<RoomInfoSectionProps> = ({
	room,
}) => {
	if (!room) return null;

	const boxesData: LabelValueBoxData[] = [
		{ label: 'Этаж', value: room.floor },
		{ label: 'Номер блока', value: room.blockNumber },
		{ label: 'Тип блока', value: BlockType.getDisplayName(room.blockType) },
		{ label: 'Свободно мест', value: room.availablePlacesCount }
	]

	return (
		<Group gap={'md'}>
			{ boxesData.map((d, idx) => (
				<LabelValueBox
					key={idx}
					data={d}
					minWidth={'150px'}
				/>
			)) }
		</Group>
	);
};

export default RoomInfoSection;