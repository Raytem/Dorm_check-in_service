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
import { AppRoutes, AppRoutesParams } from '@routing/app-routes.ts';
import { ResidentEntity } from '@domain/entities';
import { modalManager } from '@presentation/modals/modal-manager.tsx';

const RoomPage = () => {
	const gatRoomDetailsUseCase = useInjection(GetRoomDetailsUseCase)

	const { roomId } = useParams<AppRoutesParams[AppRoutes.ROOM]>()

	const { data: room, isLoading, error, refetch } = useFetch(async () => {
		if (roomId === undefined) return null;
		return await gatRoomDetailsUseCase.execute(Number(roomId));
	}, true)

	useEffect(() => {
		window.scrollTo({ top: 0 });
		refetch(true);
	}, []);

	const onAddResident = () => {
		// TODO: запуск юзкейса
		refetch(false);
		modalManager.showSuccess('Студент успешно заселен')
	}

	const onEvictResident = (resident: ResidentEntity) => {
		modalManager.openConfirmResidentEvictionModal(resident.getFullName(), () => {
			// TODO: запуск юзкейса
			refetch(false);
			modalManager.showSuccess('Студент успешно выселен')
		})
	}

	const onRelocateResident = (resident: ResidentEntity) => {
		// TODO: запуск юзкейса
		if (!room) return;

		modalManager.openRelocateResidentModal(
			resident, room,
			false, // TODO: add relocate loading state
			async (roomId) => {
				modalManager.showSuccess(`Студент успешно переселен ${roomId}`) //TODO: удалить id
				refetch(false);
			}
		)
	}

	const onConfirmResidentCheckIn = (_resident: ResidentEntity) => {
		// TODO: запуск юзкейса
		refetch(false);
		modalManager.showSuccess('Заселение успешно подтверждено')
	}

	const onCancelResidentCheckIn = (_resident: ResidentEntity) => {
		// TODO: запуск юзкейса
		refetch(false);
		modalManager.showSuccess('Подтверждение о заселении отменено')
	}

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
				onEvict={onEvictResident}
				onRelocate={onRelocateResident}
				onConfirmCheckIn={onConfirmResidentCheckIn}
				onCancelResidentCheckIn={onCancelResidentCheckIn}
			/>
		</Stack>
	</RoomPageLayout>
}

export default RoomPage;