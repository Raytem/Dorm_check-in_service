import React, { useEffect, useState } from 'react';
import { AppShell, Group, NavLink, useMantineColorScheme } from '@mantine/core';
import { IconBuildings, IconClipboardCheck } from '@tabler/icons-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VSTULogo from '@components/shared/vstu-logo';

interface LinkData {
	label: string;
	link: string;
	icon: React.ReactNode;
}

const linksData: LinkData[] = [
	{
		label: 'Общежития',
		link: '/dormitories',
		icon: <IconBuildings />,
	},
	{
		label: 'Утверждение заселения',
		link: '/check-in-confirmation',
		icon: <IconClipboardCheck />,
	}
]

export interface NavbarProps {
	onLinkClick?: () => void
}

const Navbar: React.FC<NavbarProps> = ({
	onLinkClick = () => {}
}) => {
	const [active, setActive] = useState(0);
	const { colorScheme } = useMantineColorScheme()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const index = linksData.findIndex((linkData) => location.pathname.includes(linkData.link))
		setActive(index === -1 ? 0 : index)
		if (index === -1) {
			navigate(linksData[0]!.link, { replace: true });
		}
	}, [location])

	return <AppShell.Navbar>
		<Group justify={'center'} w={'100%'} py={'md'}>
			<VSTULogo size={130} color={ colorScheme !== 'dark' ? 'main.6' : 'gray.4'} />
		</Group>

		{
			linksData.map((data, idx) => {
				return <Link to={data.link} key={idx}>
					<NavLink
						py={'lg'}
						px={'xl'}
						label={data.label}
						leftSection={data.icon}
						variant='filled'
						active={idx === active}
						color={'main.6'}
						onClick={() => {
							onLinkClick()
						}}
					/>
				</Link>
			})
		}
	</AppShell.Navbar>
}

export default Navbar