import request from 'utils/axios';
import { TEvidence } from 'types/evidences';

export const getEvidences = (params: any) => request.get<TEvidence>('/Evidences', { params });

export const getEvidenceById = (EvidenceId: number) =>
  request.get<TEvidence>(`/Evidences/${EvidenceId}`);

export const deleteEvidenceById = (EvidenceId: number) =>
  request.delete<any>(`/Evidences/${EvidenceId}`);

export const addEvidence = (values: Omit<TEvidence, 'EvidenceId'>) =>
  request.post<number>(`Evidences`, values);

export const editEvidence = (EvidenceId: number, data: TEvidence) =>
  request.put<any>(`/Evidences/${EvidenceId}`, data);
