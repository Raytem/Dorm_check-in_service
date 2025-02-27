import React from 'react';
import { Loader, Stack } from '@mantine/core';
import ErrorView from '@components/shared/error-view';
import EmptyView from '@components/shared/empty-view';


interface DataStatusContainerProps {
	skipLoadingState: boolean

	isLoading: boolean;
	error?: unknown | null;
	dataLength?: number;

	LoadingComponent?: React.ReactNode;
	ErrorComponent?: React.ReactNode;
	EmptyComponent?: React.ReactNode;

	children: React.ReactNode;
}

const DataStatusContainer: React.FC<DataStatusContainerProps> = ({
	skipLoadingState = false,

	isLoading,
	error,
	dataLength,

	LoadingComponent = (
		<Stack w={'100%'} h={'100%'} align={'center'} justify={'center'}>
			<Loader />
		</Stack>
	),
	ErrorComponent,
	EmptyComponent = <EmptyView />,

	children,
 }) => {
	if (isLoading && !skipLoadingState) {
		return <>{LoadingComponent}</>;
	}

	if (error && !isLoading) {
		return <>{
			ErrorComponent ?? <ErrorView error={error}/>
		}</>;
	}

	if (dataLength === 0 && !isLoading && !error) {
		return <>{EmptyComponent}</>;
	}

	return <>{children}</>;
};


export default DataStatusContainer;