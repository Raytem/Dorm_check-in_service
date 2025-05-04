import {
  IconClipboardCheck,
  IconDoor,
  IconHome,
  IconReportAnalytics,
} from '@tabler/icons-react';
import { AppRoutes } from '@routing/app-routes.ts';
import { LinkData } from '@components/app-layout/navbar/types';

export const HOME_LINK: LinkData = {
  label: 'Главная',
  link: AppRoutes.HOME,
  icon: <IconHome />,
};

export const NAVBAR_LINKS: LinkData[] = [
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
    icon: <IconReportAnalytics />,
  },
];
