import request from 'utils/axios';
import { TProcess } from 'types/process';

export const getProcesses = (params: any) => request.get<TProcess>('/Processes', { params });

export const getProcessById = (ProcessId: number) =>
  request.get<TProcess>(`/Processes/${ProcessId}`);

export const deleteProcessById = (ProcessId: number) =>
  request.delete<any>(`/Processes/${ProcessId}`);

export const addProcess = (values: Omit<TProcess, 'ProcessId'>) =>
  request.post<number>(`/Processes`, values);

export const editProcess = (ProcessId: number, data: TProcess) =>
  request.put<any>(`/Processes/${ProcessId}`, data);
