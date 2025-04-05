import { IconClipboardCheck, IconDoor, IconReportAnalytics } from '@tabler/icons-react';
import { AppRoutes } from '@routing/app-routes.ts';
import { LinkData } from '@components/app-layout/navbar/types';

export const linksData: LinkData[] = [
	{
		label: 'Комнаты',
		link: AppRoutes.ROOMS,
		icon: <IconDoor />,
	},
	{
		label: 'Утверждение заселения',
		link: AppRoutes.CHECK_IN_CONFIRMATION,
		icon: <IconClipboardCheck />,
	},
	{
		label: 'Статистика заселенных',
		link: AppRoutes.POPULATED_STATISTICS,
		icon: <IconReportAnalytics/>
	}
]