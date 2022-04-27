import request from 'utils/axios';

export const getDepartments = (params: any) => request.get('/departments', { params });

export const getTeams = (params: any) => request.get('/teams', { params });

export const getSemesters = (params: any) => request.get('/semesters', { params });

export const getCompanies = (params: any) => request.get('/companies', { params });
