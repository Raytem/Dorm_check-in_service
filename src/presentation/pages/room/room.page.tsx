import { useParams } from 'react-router-dom';
import LabelValueBox from '@pages/room/components/label-value-box/label-value-box.tsx';
import { useInjection } from 'inversify-react';
import { GetRoomDetailsUseCase } from '@/usecases';
import { BlockType } from '@domain/enums';
import { useFetch } from '@presentation/hooks';
import { useEffect } from 'react';
import { Group } from '@mantine/core';
import RoomPageLayout from '@pages/room/components/room-page-layout';

const RoomPage = () => {
	const gatRoomDetailsUseCase = useInjection(GetRoomDetailsUseCase)
	const { roomId } = useParams()

	const { data: room, isLoading, error, refetch } = useFetch(async () => {
		return await gatRoomDetailsUseCase.execute(roomId!)
	})

	useEffect(() => {
		refetch()
	}, []);

	const boxesData = [
		{ label: 'Этаж', value: room?.floor },
		{ label: 'Номер блока', value: room?.blockNumber },
		{ label: 'Тип блока', value: BlockType.getDisplayName(room?.blockType ?? BlockType.MALE) },
		{ label: 'Свободно мест', value: room?.availablePlacesCount }
	]

	return <RoomPageLayout
		dormitoryNumber={room?.dormitoryNumber}
		roomName={room?.roomName}
		isLoading={isLoading}
		error={error}
	>
		<Group gap={'xl'}>
			{ boxesData.map((d) => (
				<LabelValueBox value={d.value} label={d.label} minWidth={'150px'}/>
			)) }
		</Group>
	</RoomPageLayout>
}

export default RoomPage;