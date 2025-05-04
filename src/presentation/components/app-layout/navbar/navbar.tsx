import React, { useEffect, useState } from 'react';
import { AppShell, Transition } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileNavbar from 'presentation/components/app-layout/mobile-navbar';
import DesktopNavbar from 'presentation/components/app-layout/desktop-navbar';
import { NAVBAR_LINKS } from '@components/app-layout/navbar/navbar-links.tsx';

export interface NavbarProps {
  isMobile?: boolean;
  headerHeight?: number;
  isNavbarCollapsed?: boolean;
  toggleNavbarCollapsed?: () => void;
  onMobileLinkClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isMobile = false,
  headerHeight = 0,
  isNavbarCollapsed = true,
  toggleNavbarCollapsed = () => {},
  onMobileLinkClick = () => {},
}) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const index = NAVBAR_LINKS.findIndex((linkData) =>
      location.pathname.includes(linkData.link),
    );
    setActive(index === -1 ? 0 : index);
    if (index === -1) {
      navigate(NAVBAR_LINKS[0]!.link, { replace: true });
    }
  }, [location]);

  return (
    <>
      <AppShell.Navbar>
        {!isMobile ? (
          <MobileNavbar
            activeLinkIdx={active}
            toggleNavbarCollapsed={toggleNavbarCollapsed}
            onLinkClick={onMobileLinkClick}
          />
        ) : (
          <DesktopNavbar
            activeLinkIdx={active}
            toggleNavbarCollapsed={toggleNavbarCollapsed}
          />
        )}
      </AppShell.Navbar>

      <Transition
        mounted={isMobile && !isNavbarCollapsed}
        transition={'slide-right'}
      >
        {(styles) => (
          <MobileNavbar
            pos={'fixed'}
            w={400}
            top={headerHeight}
            bottom={0}
            left={0}
            activeLinkIdx={active}
            toggleNavbarCollapsed={toggleNavbarCollapsed}
            onLinkClick={onMobileLinkClick}
            style={styles}
          />
        )}
      </Transition>
    </>
  );
};

export default Navbar;
