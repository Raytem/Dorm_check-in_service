import React from 'react';
import { RoomEntity } from '@domain/entities';
import { Table, TableTrProps } from '@mantine/core';
import { BlockType } from '@domain/enums';

export interface RoomsTableRowProps extends TableTrProps {
  room: RoomEntity;
}

const RoomsTableRow: React.FC<RoomsTableRowProps> = ({
  room: {
    dormitoryNumber,
    floor,
    blockNumber,
    roomName,
    blockType,
    availablePlacesCount,
  },
  ...props
}) => {
  const rowColor =
    availablePlacesCount > 0 ? undefined : 'var(--mantine-color-yellow-light)';

  return (
    <Table.Tr bg={rowColor} {...props} style={{ cursor: 'pointer' }}>
      <Table.Td>{dormitoryNumber}</Table.Td>
      <Table.Td>{floor}</Table.Td>
      <Table.Td>{blockNumber}</Table.Td>
      <Table.Td>{roomName}</Table.Td>
      <Table.Td>{BlockType.getDisplayName(blockType)}</Table.Td>
      <Table.Td>{availablePlacesCount}</Table.Td>
    </Table.Tr>
  );
};

export default RoomsTableRow;
