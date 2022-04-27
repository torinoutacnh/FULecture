import request from 'utils/axios';
import { TEvaluationBoard } from 'types/EvaluationBoard';

export const getEvaluationBoards = (params: any) =>
  request.get<TEvaluationBoard>('/evaluationboards', { params });

export const getEvaluationBoardById = (evaluationBoardId: number) =>
  request.get<TEvaluationBoard>(`/evaluationboards/${evaluationBoardId}`);

export const deleteEvaluationBoardById = (evaluationBoardId: number) =>
  request.delete<any>(`/evaluationboards/${evaluationBoardId}`);

export const addEvaluationBoard = (values: Omit<TEvaluationBoard, ' evaluationBoardId'>) =>
  request.post<number>(`evaluationboards`, values);

export const editEvaluationBoard = (evaluationBoardId: number, data: TEvaluationBoard) =>
  request.put<any>(`/evaluationboards/${evaluationBoardId}`, data);
