import request from 'utils/axios';
import { TLecturer } from 'types/lecturer';

export const getLecturers = (params: any) => request.get<TLecturer>('/lecturers', { params });

export const getLecturerById = (lecturerId: any) =>
  request.get<TLecturer>(`/lecturers/${lecturerId}`);

export const deleteLecturerById = (lecturerId: number) =>
  request.delete<any>(`/lecturers/${lecturerId}`);

export const addLecturer = (values: Omit<TLecturer, 'lecturerId'>) =>
  request.post<number>(`/lecturers`, values);

export const editLecturer = (lecturerId: number, data: TLecturer) =>
  request.put<any>(`/lecturers/${lecturerId}`, data);

export const searchLecturer = (values: string) =>
  request.get<TLecturer>(`/lecturers?SearchValue=${values}`);
