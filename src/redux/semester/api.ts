import request from 'utils/axios';
import { TSemester } from 'types/semester';

export const getSemesters = (params: any) => request.get<any>('/semesters', { params });

export const getSemesterById = (semesterId: any) =>
  request.get<TSemester>(`/semesters/${semesterId}`);

export const deleteSemesterById = (semesterId: any) =>
  request.delete<any>(`/semesters/${semesterId}`);

export const addSemester = (values: Omit<TSemester, 'semesterId'>) =>
  request.post<number>(`/semesters`, values);

export const editSemester = (semesterId: number, data: TSemester) =>
  request.put<any>(`/semesters/${semesterId}`, data);
