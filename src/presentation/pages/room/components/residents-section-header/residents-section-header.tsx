import React from 'react';
import { Button, Divider, Group, Skeleton, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export interface ResidentsSectionHeaderProps {
	onAddResident?: () => void;
	isLoading?: boolean;
}

const ResidentsSectionHeader: React.FC<ResidentsSectionHeaderProps> = ({
	onAddResident = () => {},
	isLoading = false,
}) => {
	return (
		<Stack>
			<Group justify="space-between" align="flex-end">
				{isLoading ? (
					<Skeleton height={30} width={160} />
				) : (
					<Title order={3}>Проживающие</Title>
				)}

				{isLoading
					? <Skeleton height={40} width={140} radius="md" />
					: (
						<Button
							size="md"
							leftSection={<IconPlus size={20} />}
							onClick={onAddResident}
						>
							Заселить
						</Button>
					)
				}
			</Group>
			<Divider />
		</Stack>
	);
};

export default ResidentsSectionHeader;