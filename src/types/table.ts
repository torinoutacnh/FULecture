import { ReactElement } from 'react';

export type TTableColumn<T> = {
  title: string | ReactElement;
  dataIndex: keyof T | 'index' | undefined;
  fixed?: 'left' | 'right' | undefined;
  render?: (value: any, data: T) => string | ReactElement | undefined;
};
