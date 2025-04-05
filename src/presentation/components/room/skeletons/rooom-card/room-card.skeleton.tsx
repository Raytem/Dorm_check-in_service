import React from 'react';
import classes from '../../modals/relocate-resident/room-card/room-card.module.css';
import { Skeleton } from '@mantine/core';

const RoomCardSkeleton: React.FC = () => {
  return (
    <div className={classes['room-card']}>
      <Skeleton height={24} width={145} />
      <Skeleton height={24} width={68} />
    </div>
  );
};

export default RoomCardSkeleton;
