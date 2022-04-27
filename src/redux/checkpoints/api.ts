import request from 'utils/axios';
import { TCheckpoint } from 'types/checkpoints';

export const getCheckpoints = (params: any) => request.get<TCheckpoint>('/checkpoints', { params });

export const getCheckpointById = (checkpointId: any) =>
  request.get<any>(`/checkpoints/${checkpointId}`);

export const deleteCheckpointById = (checkpointId: number) =>
  request.delete<any>(`/checkpoints/${checkpointId}`);

export const addCheckpoint = (values: Omit<TCheckpoint, 'checkpointId'>) =>
  request.post<number>(`checkpoints`, values);

export const editCheckpoint = (checkpointId: number, data: TCheckpoint) =>
  request.put<any>(`/checkpoints/${checkpointId}`, data);
