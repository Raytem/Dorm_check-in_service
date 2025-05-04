import React, { useState } from 'react';
import { ResidentEntity } from '@domain/entities';
import { Avatar, Box, BoxProps, Button, Textarea, Title } from '@mantine/core';
import KeyValueTable from '@components/shared/key-value-table';
import { Sex } from '@domain/enums';
import classes from './resident-card.module.css';
import { DateFormatterUtil } from 'infrastructure/utils';
import CheckInStatusChip from '@components/room/check-in-status-chip';

export interface ResidentCardProps extends BoxProps {
  resident: ResidentEntity;
  onEvict?: (resident: ResidentEntity) => void;
  onRelocate?: (resident: ResidentEntity) => void;
  onConfirmCheckIn?: (resident: ResidentEntity) => void;
  onCancelResidentCheckIn?: (resident: ResidentEntity) => void;
}

const ResidentCard: React.FC<ResidentCardProps> = ({
  resident,
  onEvict = () => {},
  onRelocate = () => {},
  onConfirmCheckIn = () => {},
  onCancelResidentCheckIn = () => {},
  ...props
}) => {
  const [note, setNote] = useState(resident.note);

  const baseInfoKeyValueData: Record<string, any> = {
    ['Номер зачетки']: resident.gradeBookNumber,
    ['Группа']: resident.groupName,
    ['Пол']: Sex.getDisplayName(resident.sex),
  };

  const midInfoKeyValueData: Record<string, any> = {};

  if (resident.checkInDate) {
    midInfoKeyValueData['Заселен'] = DateFormatterUtil.format(
      'D MMMM YYYY',
      resident.checkInDate,
    );
  }

  if (resident.evictionDate) {
    midInfoKeyValueData['Выселен'] = DateFormatterUtil.format(
      'D MMMM YYYY',
      resident.evictionDate,
    );
  }

  return (
    <Box className={classes['resident-card']} {...props}>
      <div className={classes['resident-card__inner']}>
        <div className={classes['resident-card__info-section']}>
          <div className={classes['resident-card__base-info']}>
            <Avatar
              src={resident.avatarUrl}
              name={`${resident.firstName} ${resident.lastName}`}
              size={'100px'}
            />

            <div className={classes['resident-card__base-info__right']}>
              <Title order={4}>{resident.getFullName()}</Title>

              <KeyValueTable data={baseInfoKeyValueData} keyWidth={'120px'} />
            </div>
          </div>

          <div className={classes['resident-card__mid-info']}>
            <CheckInStatusChip
              isCheckInConfirmed={resident.isCheckInConfirmed}
            />

            <KeyValueTable data={midInfoKeyValueData} keyWidth={'100px'} />

            <Textarea
              label={'Заметки'}
              autosize
              placeholder="Напишите что-нибудь"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div className={classes['resident-card__actions-section']}>
          <div className={classes['actions-section__top']}>
            <Button color={'red'} fullWidth onClick={() => onEvict(resident)}>
              Выселить
            </Button>

            <Button fullWidth onClick={() => onRelocate(resident)}>
              Переселить
            </Button>
          </div>

          <Button
            onClick={() => {
              return resident.isCheckInConfirmed
                ? onCancelResidentCheckIn(resident)
                : onConfirmCheckIn(resident);
            }}
          >
            {resident.isCheckInConfirmed
              ? 'Отменить подтверждение'
              : 'Подтвердить заселение'}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default ResidentCard;
