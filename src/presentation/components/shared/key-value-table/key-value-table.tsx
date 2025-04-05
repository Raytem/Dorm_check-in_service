import React from 'react';
import classes from './key-value-table.module.css';
import { MantineColor, Text } from '@mantine/core';

export interface KeyValueTableProps {
  data: Record<string, any>;
  keyWidth?: React.CSSProperties['width'];
  keyTextColor?: MantineColor;
  valueTextColor?: MantineColor;
}

const KeyValueTable: React.FC<KeyValueTableProps> = ({
  data,
  keyWidth = '150px',
  keyTextColor = 'dimmed',
  valueTextColor = 'text',
}) => {
  return (
    <div className={classes['key-value-table']}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className={classes['key-value-table__row']}>
          <div
            style={{ width: keyWidth }}
            className={classes['key-value-table__cell']}
          >
            <Text color={keyTextColor}>{key}</Text>
          </div>

          <div className={classes['key-value-table__cell']}>
            <Text color={valueTextColor}>{String(value)}</Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyValueTable;
