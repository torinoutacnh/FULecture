import request from 'utils/axios';
import { TTopicFeedback } from 'types/topicFeedback';

export const getTopicFeedbacks = (params: any) =>
  request.get<TTopicFeedback>('/topicfeedbacks', { params });

export const getTopicFeedbackById = (topicFeedbackId: number) =>
  request.get<TTopicFeedback>(`/topicfeedbacks/${topicFeedbackId}`);

export const deleteTopicFeedbackById = (topicFeedbackId: number) =>
  request.delete<any>(`/topicfeedbacks/${topicFeedbackId}`);

export const addTopicFeedback = (values: Omit<TTopicFeedback, 'topicFeedbackId'>) =>
  request.post<number>(`topicfeedbacks`, values);

export const editTopicFeedback = (topicFeedbackId: number, data: TTopicFeedback) =>
  request.put<any>(`/topicfeedbacks/${topicFeedbackId}`, data);
