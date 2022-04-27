import request from 'utils/axios';
import { TMarkColumns } from 'types/MarkColumns';

export const getMarkColumns = (params: any) =>
  request.get<TMarkColumns>('/MarkColumns', { params });

export const getMarkColumnsById = (MarkColumnsId: any) =>
  request.get<TMarkColumns>(`/MarkColumns/${MarkColumnsId}`);

export const deleteMarkColumnsById = (MarkColumnsId: number) =>
  request.delete<any>(`/MarkColumns/${MarkColumnsId}`);

export const addMarkColumns = (values: Omit<TMarkColumns, 'MarkColumnsId'>) =>
  request.post<number>(`/MarkColumns`, values);

export const editMarkColumns = (MarkColumnsId: number, data: TMarkColumns) =>
  request.put<any>(`/MarkColumns/${MarkColumnsId}`, data);

export const searchMarkColumns = (values: string) =>
  request.get<TMarkColumns>(`/MarkColumns?SearchValue=${values}`);
