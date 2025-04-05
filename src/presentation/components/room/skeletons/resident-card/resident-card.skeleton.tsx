import classes from '@components/room/resident-card/resident-card.module.css';
import { Box, BoxProps, Skeleton, Stack } from '@mantine/core';
import React from 'react';

const ResidentCardSkeleton: React.FC<BoxProps> = ({
	...props
}) => {
	return (
		<Box className={classes['resident-card']} {...props}>
			<div className={classes['resident-card__inner']}>
				<div className={classes['resident-card__info-section']}>
					<div className={classes['resident-card__base-info']}>
						<Box w={100} h={100}>
							<Skeleton circle height={100} width={100} />
						</Box>

						<div className={classes['resident-card__base-info__right']}>
							<Skeleton width={'100%'} height={26} />

							<Stack gap={5}>
								<Skeleton height={18} width={'70%'}/>
								<Skeleton height={18} width={'50%'} />
								<Skeleton height={18} width={'60%'} />
							</Stack>
						</div>
					</div>

					<div className={classes['resident-card__mid-info']}>
						<Skeleton radius={'25'} height={28} width={180}></Skeleton>

						<Stack gap={5}>
							<Skeleton height={18} width={'80%'}/>
							<Skeleton height={18} width={'85%'} />
							<Skeleton height={18} width={'75%'} />
						</Stack>
					</div>
				</div>


				<div className={classes['resident-card__actions-section']}>
					<div className={classes['actions-section__top']}>
						<Skeleton height={36}></Skeleton>
						<Skeleton height={36}></Skeleton>
					</div>

					<Skeleton height={36}></Skeleton>
				</div>

			</div>
		</Box>
	);
};

export default ResidentCardSkeleton;