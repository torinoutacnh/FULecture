import request from 'utils/axios';
import { TStudentInTeams } from 'types/StudentInTeams';

export const getStudentInTeams = (params: any) => request.get<any>('/StudentInTeams', { params });

export const getStudentInTeamById = (StudentInTeamId: number) =>
  request.get<any>(`/StudentInTeams/${StudentInTeamId}`);

export const deleteStudentInTeamById = (StudentInTeamId: number) =>
  request.delete<any>(`/StudentInTeams/${StudentInTeamId}`);

export const addStudentInTeam = (values: Omit<TStudentInTeams, 'StudentInTeamId'>) =>
  request.post<number>(`StudentInTeams`, values);

export const editStudentInTeam = (StudentInTeamId: number, data: TStudentInTeams) =>
  request.put<any>(`/StudentInTeams/${StudentInTeamId}`, data);

export const qualifiedStudentInTeam = (value: any) =>
  request.put<any>(`/StudentInTeams/qualified`, value);
