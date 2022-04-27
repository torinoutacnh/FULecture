import request from 'utils/axios';
import { TLecturerGroupMember } from 'types/LecturerGroupMember';

export const getLecturerGroupMembers = (params: any) =>
  request.get<any>('/LecturerGroupMembers', { params });

export const getLecturerGroupMemberById = (LecturerGroupMemberId: number) =>
  request.get<TLecturerGroupMember>(`/LecturerGroupMembers/${LecturerGroupMemberId}`);

export const deleteLecturerGroupMemberById = (LecturerGroupMemberId: number) =>
  request.delete<any>(`/LecturerGroupMembers/${LecturerGroupMemberId}`);

export const addLecturerGroupMember = (
  values: Omit<TLecturerGroupMember, 'LecturerGroupMemberId'>
) => request.post<number>(`/LecturerGroupMembers`, values);

export const editLecturerGroupMember = (
  LecturerGroupMemberId: number,
  data: TLecturerGroupMember
) => request.put<any>(`/LecturerGroupMembers/${LecturerGroupMemberId}`, data);
