import request from 'utils/axios';
import { TProjectProcess } from 'types/ProjectProcess';

export const getProjectProcesses = (params: any) =>
  request.get<any>('/ProjectProcesses', { params });
