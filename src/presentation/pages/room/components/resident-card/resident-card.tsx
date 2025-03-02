import React from 'react';
import { ResidentEntity } from '@domain/entities';
import { Avatar, Box, BoxProps, Button, Title } from '@mantine/core';
import KeyValueTable from '@components/shared/key-value-table';
import { Sex } from '@domain/enums';
import CheckInStatusChip from '@pages/room/components/resident-card/check-in-status-chip';
import classes from './resident-card.module.css'
import { DateFormatterUtil } from '@presentation/utils';


export interface ResidentCardProps extends BoxProps {
	resident: ResidentEntity,
}

const ResidentCard: React.FC<ResidentCardProps> = ({
	resident,
	...props
}) => {
	if (!resident) return null;

	const baseInfoKeyValueData: Record<string, any>  = {
		'Номер зачетки': resident.gradeBookNumber,
		'Группа': resident.groupName,
		'Пол': Sex.getDisplayName(resident.sex)
	}

	const midInfoKeyValueData: Record<string, any> = {
		'Заселен': DateFormatterUtil.format('d MMMM yyyy', resident.checkInDate),
	}
	if (resident.evictionDate) {
		midInfoKeyValueData['Выселен'] = DateFormatterUtil.format('d MMMM yyyy', resident.evictionDate);
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
							<Title order={4}>{resident.lastName} {resident.firstName} {resident.patronymic}</Title>

							<KeyValueTable
								data={baseInfoKeyValueData}
								keyWidth={'120px'}
							/>
						</div>
					</div>

					<div className={classes['resident-card__mid-info']}>
						<CheckInStatusChip isCheckInConfirmed={resident.isCheckInConfirmed} />

						<KeyValueTable
							data={midInfoKeyValueData}
							keyWidth={'100px'}
						/>
						{/*<Textarea*/}
						{/*	placeholder="Напишите что-нибудь"*/}
						{/*/>*/}
					</div>
				</div>


				<div className={classes['resident-card__actions-section']}>
					<div className={classes['actions-section__top']}>
						<Button
							color={'red'}
							fullWidth
						>
							Выселить
						</Button>

						<Button
							fullWidth
						>
							Переселить
						</Button>
					</div>

					<Button>
						{resident.isCheckInConfirmed ? 'Отменить подтверждение' : 'Подтвердить заселение'}
					</Button>
				</div>

			</div>
		</Box>
	);
};

export default ResidentCard;