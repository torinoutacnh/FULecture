import request from 'utils/axios';
import { TAnnouncements } from 'types/announcements';

export const getAnnoucements = (params: any) =>
  request.get<TAnnouncements>('/announcements', { params });

export const getAnnoucementById = (annoucementId: any) =>
  request.get<any>(`/announcements/${annoucementId}`);

export const deleteAnnoucementById = (annoucementId: number) =>
  request.delete<any>(`/announcements/${annoucementId}`);

export const addAnnoucement = (values: Omit<TAnnouncements, ' annoucementId'>) =>
  request.post<number>(`announcements`, values);

export const editAnnoucement = (annoucementId: number, data: TAnnouncements) =>
  request.put<any>(`/announcements/${annoucementId}`, data);
