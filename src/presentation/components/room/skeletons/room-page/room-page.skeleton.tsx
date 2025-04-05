import { Group, Stack } from '@mantine/core';
import ResidentsSectionHeader from '@components/room/residents-section-header';
import ResidentCardList from '@components/room/resident-card-list';
import LabelValueBox from '@components/room/label-value-box';

const RoomPageSkeleton = () => {
  const VALUE_BOXES_COUNT = 4;

  return (
    <Stack gap={'xl'}>
      <Group gap={'md'}>
        {Array.from({ length: VALUE_BOXES_COUNT }).map((_, i) => (
          <LabelValueBox
            data={{
              label: '',
              value: '',
            }}
            key={i}
            isLoading
          />
        ))}
      </Group>

      <ResidentsSectionHeader isLoading />

      <ResidentCardList residents={[]} isLoading skeletonCardsCount={3} />
    </Stack>
  );
};

export default RoomPageSkeleton;
