import React from 'react';
import { BoxProps, Group, NavLink, ScrollArea } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {
  HOME_LINK,
  NAVBAR_LINKS,
} from '@components/app-layout/navbar/navbar-links.tsx';
import NavbarBurger from 'presentation/components/app-layout/navbar-burger';
import LogoutButton from '@components/app-layout/logout-button';
import { LinkData } from '@components/app-layout/navbar/types';

export interface MobileNavbarProps extends BoxProps {
  activeLinkIdx?: number;
  onLinkClick?: () => void;
  toggleNavbarCollapsed?: () => void;
}

const MobileNavbar = ({
  activeLinkIdx = 0,
  onLinkClick = () => {},
  toggleNavbarCollapsed = () => {},
  ...props
}: MobileNavbarProps): React.JSX.Element => {
  const navigate = useNavigate();

  const handleOnLinkClick = (linkData: LinkData) => {
    onLinkClick();
    toggleNavbarCollapsed();
    navigate(linkData.link);
  };

  return (
    <ScrollArea
      type={'auto'}
      bg={'var(--mantine-color-body)'}
      {...props}
      style={{
        zIndex: 201,
        ...props.style,
      }}
    >
      <Group
        wrap={'nowrap'}
        w={'100%'}
        justify={'space-between'}
        align={'center'}
        pr={'xl'}
      >
        <NavLink
          pl={'xl'}
          p={0}
          py={'45'}
          label={HOME_LINK.label}
          leftSection={HOME_LINK.icon}
          variant={'filled'}
          color={'main.6'}
          onClick={() => handleOnLinkClick(HOME_LINK)}
        />

        <NavbarBurger
          visibleFrom={'sm'}
          opened={true}
          onClick={toggleNavbarCollapsed}
        />
        <LogoutButton hiddenFrom={'sm'} variant={'outline'} />
      </Group>

      {NAVBAR_LINKS.map((linkData, idx) => {
        return (
          <NavLink
            key={linkData.link}
            py={'lg'}
            px={'xl'}
            label={linkData.label}
            leftSection={linkData.icon}
            variant="filled"
            active={idx === activeLinkIdx}
            color={'main.6'}
            onClick={() => handleOnLinkClick(linkData)}
          />
        );
      })}
    </ScrollArea>
  );
};

export default MobileNavbar;
