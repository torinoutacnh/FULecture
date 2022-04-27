import request from 'utils/axios';
import { TLecturerGroup } from 'types/LecturerGroup';

export const getLecturerGroups = (params: any) =>
  request.get<TLecturerGroup>('/LecturerGroups', { params });

export const getLecturerGroupById = (lecturerGroupId: number) =>
  request.get<TLecturerGroup>(`/LecturerGroups/${lecturerGroupId}`);

export const deleteLecturerGroupById = (LecturerGroupId: number) =>
  request.delete<any>(`/LecturerGroups/${LecturerGroupId}`);

export const addLecturerGroup = (values: Omit<TLecturerGroup, 'LecturerGroupId'>) =>
  request.post<number>(`/LecturerGroups`, values);

export const editLecturerGroup = (LecturerGroupId: number, data: TLecturerGroup) =>
  request.put<any>(`/LecturerGroups/${LecturerGroupId}`, data);
