import request from 'utils/axios';
import { TTeam } from 'types/Team';

export const getTeams = (params: any) => request.get<any>('/teams', { params });

export const getTeamById = (teamId: number) => request.get<any>(`/teams/${teamId}`);

export const deleteTeamById = (teamId: number) => request.delete<any>(`/teams/${teamId}`);

export const addTeam = (values: Omit<TTeam, 'teamId'>) => request.post<number>(`teams`, values);

export const editTeam = (teamId: number, data: TTeam) => request.put<any>(`/teams/${teamId}`, data);
