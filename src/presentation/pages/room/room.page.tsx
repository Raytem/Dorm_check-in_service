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
import { useDocumentVisibility } from '@mantine/hooks';

const RoomPage = () => {
	const { roomId } =
		useParams<AppRoutesParams[AppRoutes.ROOM]>()
	const documentVisibility = useDocumentVisibility();
	const gatRoomDetailsUseCase = useInjection(GetRoomDetailsUseCase)

	const {
		data: room,
		isLoading: isRoomLoading,
		error: roomError,
		refetch: refetchRoom,
	} = useFetch(async () => {
		if (roomId === undefined) return null;
		return await gatRoomDetailsUseCase.execute(Number(roomId));
	}, true)

	useEffect(() => {
		if (documentVisibility === 'hidden') return;
		refetchRoom(false);
	}, [documentVisibility]);

	useEffect(() => {
		window.scrollTo({ top: 0 });
		refetchRoom();
	}, []);

	const onAddResident = () => {
		// TODO: запуск юзкейса
		refetchRoom(false);
		modalManager.showSuccess('Студент успешно заселен')
	}

	const onEvictResident = (resident: ResidentEntity) => {
		modalManager.openConfirmResidentEvictionModal(resident.getFullName(), () => {
			// TODO: запуск юзкейса
			refetchRoom(false);
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
				refetchRoom(false);
				modalManager.showSuccess(`Студент успешно переселен ${roomId}`) //TODO: удалить id
			}
		)
	}

	const onConfirmResidentCheckIn = (_resident: ResidentEntity) => {
		// TODO: запуск юзкейса
		refetchRoom(false);
		modalManager.showSuccess('Заселение успешно подтверждено')
	}

	const onCancelResidentCheckIn = (_resident: ResidentEntity) => {
		// TODO: запуск юзкейса
		refetchRoom(false);
		modalManager.showSuccess('Подтверждение о заселении отменено')
	}

	return <RoomPageLayout
		dormitoryNumber={room?.dormitoryNumber}
		roomName={room?.roomName}
		isLoading={isRoomLoading}
		error={roomError}
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
				isLoading={isRoomLoading}
				onEvict={onEvictResident}
				onRelocate={onRelocateResident}
				onConfirmCheckIn={onConfirmResidentCheckIn}
				onCancelResidentCheckIn={onCancelResidentCheckIn}
			/>
		</Stack>
	</RoomPageLayout>
}

export default RoomPage;