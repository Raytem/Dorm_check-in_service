import React from 'react';
import { Chip } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

export interface CheckInStatusChipProps {
  isCheckInConfirmed: boolean;
}

const CheckInStatusChip: React.FC<CheckInStatusChipProps> = ({
  isCheckInConfirmed,
}) => {
  const checkInChipText = isCheckInConfirmed
    ? 'Заселение подтверждено'
    : 'Заселение не подтверждено';

  const chipIcon = isCheckInConfirmed ? (
    <IconCheck size={16} />
  ) : (
    <IconX size={16} />
  );

  const chipColor = isCheckInConfirmed ? 'green' : 'red';

  return (
    <Chip
      icon={chipIcon}
      color={chipColor}
      checked={true}
      style={{ pointerEvents: 'none' }}
    >
      {checkInChipText}
    </Chip>
  );
};

export default CheckInStatusChip;
