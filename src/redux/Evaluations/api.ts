import request from 'utils/axios';
import { TEvaluations } from 'types/Evaluations';

export const getEvaluations = (params: any) =>
  request.get<TEvaluations>('/Evaluations', { params });

export const getEvaluationById = (EvaluationId: number) =>
  request.get<TEvaluations>(`/Evaluations/${EvaluationId}`);

export const deleteEvaluationById = (EvaluationId: number) =>
  request.delete<any>(`/Evaluations/${EvaluationId}`);

export const addEvaluation = (values: Omit<TEvaluations, ' EvaluationId'>) =>
  request.post<number>(`Evaluations`, values);

export const editEvaluation = (EvaluationId: number, data: TEvaluations) =>
  request.put<any>(`/Evaluations/${EvaluationId}`, data);

export const approveEvaluation = (EvaluationId: number) =>
  request.put<any>(`/Evaluations/approve/${EvaluationId}`);
