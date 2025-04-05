import React from 'react';
import { Group } from '@mantine/core';
import { BlockType } from '@domain/enums';
import { RoomDetailsEntity } from '@domain/entities';
import {
  LabelValueBox,
  LabelValueBoxData,
} from '@components/room/label-value-box/label-value-box.tsx';

export interface RoomInfoSectionProps {
  room: RoomDetailsEntity | null;
}

const RoomInfoSection: React.FC<RoomInfoSectionProps> = ({ room }) => {
  if (!room) return null;

  const boxesData: LabelValueBoxData[] = [
    { label: 'Этаж', value: room.floor },
    { label: 'Номер блока', value: room.blockNumber },
    { label: 'Тип блока', value: BlockType.getDisplayName(room.blockType) },
    { label: 'Свободно мест', value: room.availablePlacesCount },
  ];

  return (
    <Group gap={'md'}>
      {boxesData.map((d, idx) => (
        <LabelValueBox key={idx} data={d} minWidth={'150px'} />
      ))}
    </Group>
  );
};

export default RoomInfoSection;
