import request from 'utils/axios';
import { TWeeklyReport } from 'types/WeeklyReport';

export const getWeeklyReports = (params: any) => request.get<any>('/weeklyReports', { params });

export const getWeeklyReportById = (weeklyReportId: any) =>
  request.get<any>(`/weeklyReports/${weeklyReportId}`);

export const deleteWeeklyReportById = (weeklyReportId: number) =>
  request.delete<any>(`/weeklyReports/${weeklyReportId}`);

export const addWeeklyReport = (values: Omit<TWeeklyReport, 'weeklyReportId'>) =>
  request.post<number>(`weeklyReports`, values);

export const editWeeklyReport = (weeklyReportId: number, data: TWeeklyReport) =>
  request.put<any>(`/weeklyReports/${weeklyReportId}`, data);

export const editComment = (weeklyReportId: number, email: string, comment: string) =>
  request.put<any>(`/weeklyReports/${weeklyReportId}/${email}?comment=${comment}`);
