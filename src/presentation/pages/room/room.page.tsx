import { useParams } from 'react-router-dom';
import { useInjection } from 'inversify-react';
import { GetRoomDetailsUseCase } from '@/usecases';
import { useFetch } from '@presentation/hooks';
import { useEffect } from 'react';
import RoomPageLayout from '@pages/room/components/room-page-layout';
import RoomInfoSection from '@pages/room/components/room-info-section';
import ResidentCardList from '@pages/room/components/resident-card-list';
import ResidentsSectionHeader from '@pages/room/components/residents-section-header';
import { Stack } from '@mantine/core';

const RoomPage = () => {
	const gatRoomDetailsUseCase = useInjection(GetRoomDetailsUseCase)
	const { roomId } = useParams()

	const { data: room, isLoading, error, refetch } = useFetch(async () => {
		return await gatRoomDetailsUseCase.execute(roomId!)
	})

	useEffect(() => {
		refetch()
	}, []);

	const onAddResident = () => {}

	return <RoomPageLayout
		dormitoryNumber={room?.dormitoryNumber}
		roomName={room?.roomName}
		isLoading={isLoading}
		error={error}
	>
		<Stack gap={'xl'}>
			<RoomInfoSection
				room={room}
			/>

			<ResidentsSectionHeader
				onAddResident={onAddResident}
			/>

			<ResidentCardList
				residents={room?.residents ?? []}
				isLoading={isLoading}
			/>
		</Stack>
	</RoomPageLayout>
}

export default RoomPage;