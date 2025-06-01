import React from 'react';
import {
  Button,
  Divider,
  Group,
  Skeleton,
  Stack,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export interface ResidentsSectionHeaderProps {
  onAddResident?: () => void;
  addResidentBlockerReason: null | string;
  isLoading?: boolean;
}

const ResidentsSectionHeader: React.FC<ResidentsSectionHeaderProps> = ({
  onAddResident = () => {},
  addResidentBlockerReason = null,
  isLoading = false,
}) => {
  const isAddResidentButtonDisabled = addResidentBlockerReason !== null;
  const isAddResidentButtonTooltipDisabled = addResidentBlockerReason === null;

  return (
    <Stack>
      <Group justify="space-between" align="flex-end">
        {isLoading ? (
          <Skeleton height={30} width={160} />
        ) : (
          <Title order={3}>Проживающие</Title>
        )}

        {isLoading ? (
          <Skeleton height={40} width={140} radius="md" />
        ) : (
          <Tooltip
            label={addResidentBlockerReason}
            disabled={isAddResidentButtonTooltipDisabled}
          >
            <Button
              size="md"
              leftSection={<IconPlus size={20} />}
              onClick={onAddResident}
              disabled={isAddResidentButtonDisabled}
            >
              Заселить
            </Button>
          </Tooltip>
        )}
      </Group>
      <Divider />
    </Stack>
  );
};

export default ResidentsSectionHeader;
