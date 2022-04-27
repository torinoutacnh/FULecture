import request from 'utils/axios';
import { TProjects } from 'types/Projects';

export const getProjects = (params: any) => request.get<TProjects>('/Projects', { params });

export const getProjectsById = (ProjectId: any) => request.get<TProjects>(`/Projects/${ProjectId}`);

export const deleteProjectsById = (ProjectId: number) =>
  request.delete<any>(`/Projects/${ProjectId}`);

export const addProject = (values: Omit<TProjects, 'ProjectId'>) =>
  request.post<number>(`/Projects`, values);

export const editProject = (ProjectId: number, data: TProjects) =>
  request.put<any>(`/Projects/${ProjectId}`, data);

export const approveProject = (ProjectId: number, comment: string) =>
  request.put<any>(`/Projects/${ProjectId}/approve?comment=${comment}`);

export const rejectProject = (ProjectId: number, comment: string) =>
  request.put<any>(`/Projects/${ProjectId}/reject?comment=${comment}`);
