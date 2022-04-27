import request from 'utils/axios';
import { TLecturerDepartment } from '../../types/lecturerDepartment';

export const getLecturerDepartments = (params: any) =>
  request.get<TLecturerDepartment>('/LecturerDepartments', { params });

export const getLecturerDepartmentById = (LecturerDepartmentId: number) =>
  request.get<TLecturerDepartment>(`/LecturerDepartments/${LecturerDepartmentId}`);

export const deleteLecturerDepartmentById = (LecturerDepartmentId: number) =>
  request.delete<any>(`/LecturerDepartments/${LecturerDepartmentId}`);

export const addLecturerDepartment = (values: Omit<TLecturerDepartment, 'LecturerDepartmentId'>) =>
  request.post<number>(`LecturerDepartments`, values);

export const editLecturerDepartment = (LecturerDepartmentId: number, data: TLecturerDepartment) =>
  request.put<any>(`/LecturerDepartments/${LecturerDepartmentId}`, data);
