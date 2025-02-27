import { LinkData } from '@layouts/app-layout/components/navbar/types';
import { IconClipboardCheck, IconDoor, IconReportAnalytics } from '@tabler/icons-react';

export const linksData: LinkData[] = [
	{
		label: 'Комнаты',
		link: '/rooms',
		icon: <IconDoor />,
	},
	{
		label: 'Утверждение заселения',
		link: '/check-in-confirmation',
		icon: <IconClipboardCheck />,
	},
	{
		label: 'Статистика заселенных',
		link: '/populated-statistics',
		icon: <IconReportAnalytics/>
	}
]