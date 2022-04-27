import request from 'utils/axios';
import { TMarks } from 'types/Marks';

export const getMarks = (params: any) => request.get<TMarks>('/Marks', { params });

export const getMarksById = (MarksId: any) => request.get<TMarks>(`/Marks/${MarksId}`);

export const deleteMarksById = (MarksId: number) => request.delete<any>(`/Marks/${MarksId}`);

export const addMarks = (values: Omit<TMarks, 'MarksId'>) => request.post<number>(`/Marks`, values);

export const editMarks = (MarksId: number, data: TMarks) =>
  request.put<any>(`/Marks/${MarksId}`, data);

export const searchMarks = (values: string) => request.get<TMarks>(`/Marks?SearchValue=${values}`);

export const addMarkList = (values: any) => request.post(`/Marks/list`, values);

export const addMarkTeam = (teamId: number, values: any, listStudent: any) =>
  request.post(`/Marks/team?teamId=${teamId}`, values, listStudent);
