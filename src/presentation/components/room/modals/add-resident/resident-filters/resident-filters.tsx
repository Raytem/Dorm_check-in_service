import React, { useEffect, useState } from 'react';
import {
  BoxProps,
  Button,
  CloseButton,
  Group,
  Input,
  NumberInput,
  Stack,
} from '@mantine/core';
import { IconFilterCancel } from '@tabler/icons-react';
import { GetCandidatesForRoomFilters } from '@domain/types';
import { useDebouncedCallback } from 'use-debounce';

export interface ResidentFiltersProps extends BoxProps {
  filters: GetCandidatesForRoomFilters;
  setFilters: (filters: GetCandidatesForRoomFilters) => void;
  onResetFilters: () => void;
}

const ResidentFilters: React.FC<ResidentFiltersProps> = ({
  filters,
  setFilters,
  onResetFilters,
}) => {
  const DEBOUNCE_DELAY = 700;

  const { fullName, groupName, gradeBookNumber, facultyName } = filters;

  const [localFullName, setFullName] = useState(fullName);
  const [localGroupName, setGroupName] = useState(groupName);
  const [localGradeBookNumber, setGradeBookNumber] = useState(gradeBookNumber);
  const [localFacultyName, setFacultyName] = useState(facultyName);

  const setFiltersDebounced = useDebouncedCallback(
    (filters: GetCandidatesForRoomFilters) => {
      setFilters(filters);
    },
    DEBOUNCE_DELAY,
  );

  useEffect(() => {
    setFiltersDebounced({
      fullName: localFullName,
      groupName: localGroupName,
      gradeBookNumber: localGradeBookNumber,
      facultyName: localFacultyName,
    });
  }, [localFullName, localGroupName, localGradeBookNumber, localFacultyName]);

  const resetLocalState = () => {
    setFullName(undefined);
    setGroupName(undefined);
    setGradeBookNumber(undefined);
    setFacultyName(undefined);
  };

  const handleClearFilters = () => {
    setFilters({});
    resetLocalState();
    onResetFilters();
  };

  const parseNumberInputValue = (
    value: number | string,
  ): number | undefined => {
    if (typeof value === 'number') {
      return Number(value);
    }
    return undefined;
  };

  const isFiltersEmpty = Object.values(filters).some(
    (val) => val !== undefined,
  );

  return (
    <Stack gap={'xl'}>
      <Stack>
        <Group align={'center'}>
          <Input.Wrapper label={'ФИО'}>
            <Input
              value={localFullName ?? ''}
              onChange={(e) => setFullName(e.target.value || undefined)}
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  onClick={() => setFullName(undefined)}
                  style={{ display: localFullName ? undefined : 'none' }}
                />
              }
            />
          </Input.Wrapper>

          <Input.Wrapper label={'Группа'}>
            <Input
              value={localGroupName ?? ''}
              onChange={(e) => setGroupName(e.target.value || undefined)}
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  onClick={() => setGroupName(undefined)}
                  style={{ display: localGroupName ? undefined : 'none' }}
                />
              }
            />
          </Input.Wrapper>

          <Input.Wrapper label={'Номер зачетки'}>
            <NumberInput
              value={localGradeBookNumber ?? ''}
              allowDecimal={false}
              min={1}
              onChange={(value) =>
                setGradeBookNumber(parseNumberInputValue(value))
              }
            />
          </Input.Wrapper>

          <Input.Wrapper label={'Факультет'}>
            <Input
              value={localFacultyName ?? ''}
              onChange={(e) => setFacultyName(e.target.value || undefined)}
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  onClick={() => setFacultyName(undefined)}
                  style={{ display: localFacultyName ? undefined : 'none' }}
                />
              }
            />
          </Input.Wrapper>
        </Group>
      </Stack>

      <Stack w={'fit-content'}>
        <Button
          color={'red'}
          leftSection={<IconFilterCancel />}
          disabled={!isFiltersEmpty}
          onClick={handleClearFilters}
        >
          Сбросить фильтры
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResidentFilters;
