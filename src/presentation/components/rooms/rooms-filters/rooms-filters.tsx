import React, { useEffect, useState } from 'react';
import {
  BoxProps,
  Button,
  Checkbox,
  CloseButton,
  ComboboxData,
  Group,
  Input,
  NumberInput,
  Select,
  Stack,
} from '@mantine/core';
import { BlockType } from '@domain/enums';
import { IconFilterCancel } from '@tabler/icons-react';
import { RoomSearchFilters } from '@domain/types/room-search-filters.ts';
import { useDebouncedCallback } from 'use-debounce';

export interface RoomFiltersProps extends BoxProps {
  filters: RoomSearchFilters;
  setFilters: (filters: RoomSearchFilters) => void;
  resetFilters: () => void;
}

const RoomsFilters: React.FC<RoomFiltersProps> = ({
  filters,
  setFilters,
  resetFilters,
  ...props
}) => {
  const DEBOUNCE_DELAY = 700;

  const {
    dormitoryNumber,
    floor,
    blockNumber,
    roomName,
    blockType,
    studentGroup,
    onlyAvailableRooms,
  } = filters;

  const [localRoomName, setRoomName] = useState(roomName);

  const [localFloor, setFloor] = useState(floor);

  const [localDormitoryNumber, setDormitoryNumber] = useState(dormitoryNumber);

  const [localBlockNumber, setBlockNumber] = useState(blockNumber);

  const [localStudentGroup, setStudentGroup] = useState(studentGroup);

  const [localOnlyAvailableRooms, setOnlyAvailableRooms] =
    useState(onlyAvailableRooms);
  const [localBlockType, setBlockType] = useState(blockType);

  const setFiltersDebounced = useDebouncedCallback(
    (filters: Partial<RoomSearchFilters>) => {
      setFilters(filters);
    },
    DEBOUNCE_DELAY,
  );

  useEffect(() => {
    setFilters({
      onlyAvailableRooms: localOnlyAvailableRooms,
      blockType: localBlockType,
    });
  }, [localOnlyAvailableRooms, localBlockType, setFilters]);

  useEffect(() => {
    setFiltersDebounced({
      roomName: localRoomName,
      floor: localFloor,
      dormitoryNumber: localDormitoryNumber,
      blockNumber: localBlockNumber,
      studentGroup: localStudentGroup,
    });
  }, [
    localRoomName,
    localFloor,
    localDormitoryNumber,
    localBlockNumber,
    localStudentGroup,
    setFilters,
  ]);

  const resetLocalState = () => {
    setRoomName(undefined);
    setFloor(undefined);
    setDormitoryNumber(undefined);
    setBlockNumber(undefined);
    setStudentGroup(undefined);
    setOnlyAvailableRooms(undefined);
    setBlockType(undefined);
  };

  const handleClearFilters = () => {
    resetFilters();
    resetLocalState();
  };

  const isFiltersEmpty = Object.values(filters).some(
    (val) => val !== undefined,
  );

  const parseNumberInputValue = (
    value: number | string,
  ): number | undefined => {
    if (typeof value === 'number') {
      return Number(value);
    }
    return undefined;
  };

  const blockTypeSelectData: ComboboxData = [
    { value: BlockType.MALE, label: 'Мужской' },
    { value: BlockType.FEMALE, label: 'Женский' },
  ];

  return (
    <Stack gap={'xl'} {...props}>
      <Stack>
        <Group align={'center'}>
          <Input.Wrapper label={'Номер общежития'}>
            <NumberInput
              value={localDormitoryNumber ?? ''}
              allowDecimal={false}
              min={1}
              onChange={(value) =>
                setDormitoryNumber(parseNumberInputValue(value))
              }
            />
          </Input.Wrapper>

          <Input.Wrapper label={'Этаж'}>
            <NumberInput
              value={localFloor ?? ''}
              allowDecimal={false}
              min={1}
              onChange={(value) => setFloor(parseNumberInputValue(value))}
            />
          </Input.Wrapper>

          <Input.Wrapper label={'Номер блока'}>
            <NumberInput
              value={localBlockNumber ?? ''}
              allowDecimal={false}
              min={1}
              onChange={(value) => setBlockNumber(parseNumberInputValue(value))}
            />
          </Input.Wrapper>

          <Select
            label={'Тип блока'}
            value={localBlockType ?? null}
            data={blockTypeSelectData}
            clearable
            onChange={(value) => {
              setBlockType((value as BlockType) ?? undefined);
            }}
          />

          <Input.Wrapper label={'Комната'}>
            <Input
              value={localRoomName || ''}
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  onClick={() => setRoomName(undefined)}
                  style={{ display: localRoomName ? undefined : 'none' }}
                />
              }
              onChange={(e) => {
                setRoomName(e.target.value || undefined);
              }}
            />
          </Input.Wrapper>

          <Input.Wrapper label={'Группа студента'}>
            <Input
              value={localStudentGroup || ''}
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  onClick={() => setStudentGroup(undefined)}
                  style={{ display: localStudentGroup ? undefined : 'none' }}
                />
              }
              onChange={(e) => {
                setStudentGroup(e.target.value || undefined);
              }}
            />
          </Input.Wrapper>
        </Group>

        <Checkbox
          checked={localOnlyAvailableRooms}
          label="Показывать только свободные комнаты"
          onChange={(e) => {
            setOnlyAvailableRooms(e.target.checked || undefined);
          }}
        />
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

export default RoomsFilters;
