import request from 'utils/axios';
import { TTopic } from 'types/topic';

export const getTopics = (params: any) => request.get<TTopic>('/topics', { params });

export const getTopicById = (topicId: number) => request.get<any>(`/topics/${topicId}`);

export const deleteTopicById = (topicId: number) => request.delete<any>(`/topics/${topicId}`);

export const addTopic = (values: Omit<TTopic, 'topicId'>) =>
  request.post<number>(`/topics`, values);

export const editTopic = (topicId: number, data: TTopic) =>
  request.put<any>(`/topics/${topicId}`, data);

export const getTopicNoTypeById = (topicId: number) => request.get(`/topics/${topicId}`);

export const approveTopic = (topicId: number) => request.put(`/topics/${topicId}/approve`);

export const rejectTopic = (topicId: number) => request.put(`/topics/${topicId}/reject`);
