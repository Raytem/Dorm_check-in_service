import React from 'react';
import { ResidentEntity } from '@domain/entities';
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import KeyValueTable from '@components/shared/key-value-table';
import { Sex } from '@domain/enums';
import classes from './resident-card.module.css';
import { DateFormatterUtil } from 'infrastructure/utils';
import CheckInStatusChip from '@components/room/check-in-status-chip';
import EditableText from 'presentation/components/shared/editable-text';

export type EvictResidentHandler = (resident: ResidentEntity) => void;
export type RelocateResidentHandler = (resident: ResidentEntity) => void;
export type ConfirmResidentCheckInHandler = (resident: ResidentEntity) => void;
export type CancelResidentCheckInHandler = (resident: ResidentEntity) => void;
export type SaveResidentNotesHandler = (
  resident: ResidentEntity,
  notes: string,
) => void;

export interface ResidentCardProps extends BoxProps {
  resident: ResidentEntity;
  onEvict?: EvictResidentHandler;
  onRelocate?: RelocateResidentHandler;
  onConfirmCheckIn?: ConfirmResidentCheckInHandler;
  onCancelCheckIn?: CancelResidentCheckInHandler;
  onSaveNotes?: SaveResidentNotesHandler;
}

const ResidentCard: React.FC<ResidentCardProps> = ({
  resident,
  onEvict = () => {},
  onRelocate = () => {},
  onConfirmCheckIn = () => {},
  onCancelCheckIn = () => {},
  onSaveNotes = () => {},
  ...props
}) => {
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

            <Stack gap={0}>
              <Text>Заметки:</Text>
              <EditableText
                onSave={(notes) => onSaveNotes(resident, notes)}
                initialText={resident.note}
                placeholder={'Введите что-нибудь'}
                textAreaProps={{
                  autosize: true,
                }}
              />
            </Stack>
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
                ? onCancelCheckIn(resident)
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
