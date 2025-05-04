import EmptyView from '@components/shared/empty-view';
import { IconExclamationCircle } from '@tabler/icons-react';
import { EmptyViewProps } from '@components/shared/empty-view/empty-view.tsx';
import { ErrorUtil } from 'infrastructure/utils';
import React from 'react';

export interface ErrorViewProps extends Partial<EmptyViewProps> {
  error?: unknown | Error;
}

const ErrorView: React.FC<ErrorViewProps> = ({
  error,
  title = 'Произошла ошибка',
  description,
  icon = <IconExclamationCircle size={'100%'} />,
}) => {
  return (
    <EmptyView
      icon={icon}
      title={title}
      description={description ?? ErrorUtil.parseError(error)}
    />
  );
};

export default ErrorView;
