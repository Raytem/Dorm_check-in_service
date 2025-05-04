import React from 'react';
import { ResidentEntity } from '@domain/entities';
import { Avatar, Table, TableTrProps } from '@mantine/core';
import { Sex } from '@domain/enums';
import CheckInStatusChip from '@components/room/check-in-status-chip';
import { DateFormatterUtil } from 'infrastructure/utils';

export interface ResidentsTableRowProps extends TableTrProps {
  resident: ResidentEntity;
  isSelected?: boolean;
}

const ResidentsTableRow: React.FC<ResidentsTableRowProps> = ({
  resident: {
    avatarUrl,
    firstName,
    lastName,
    patronymic,
    sex,
    groupName,
    isCheckInConfirmed,
    checkInDate,
    gradeBookNumber,
  },
  isSelected = false,
  ...props
}) => {
  const getCheckInDateCellValue = () => {
    if (checkInDate === null) return '–';
    return DateFormatterUtil.format('DD MM YYYY', checkInDate);
  };

  const rowColor = isSelected ? 'var(--mantine-color-indigo-light)' : undefined;

  return (
    <Table.Tr bg={rowColor} {...props} style={{ cursor: 'pointer' }}>
      <Table.Td>
        {
          <Avatar
            radius={'xl'}
            size={40}
            src={avatarUrl}
            color={'gray.6'}
            variant={'filled'}
          />
        }
      </Table.Td>
      <Table.Td>{lastName}</Table.Td>
      <Table.Td>{firstName}</Table.Td>
      <Table.Td>{patronymic}</Table.Td>
      <Table.Td>{Sex.getDisplayName(sex)}</Table.Td>
      <Table.Td>{gradeBookNumber}</Table.Td>
      <Table.Td>{groupName}</Table.Td>
      <Table.Td>
        {<CheckInStatusChip isCheckInConfirmed={isCheckInConfirmed} />}
      </Table.Td>
      <Table.Td>{getCheckInDateCellValue()}</Table.Td>
    </Table.Tr>
  );
};

export default ResidentsTableRow;
