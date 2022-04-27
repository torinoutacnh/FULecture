export type TWeeklyReport = {
  id: number;
  week: number;
  from: Date;
  to: Date;
  reportBy: string;
  isIndividual: boolean;
  tasksCompleted: string;
  tasksInProgress: string;
  taskBeginNextWeek: string;
  urgentIssue: string;
  selfAssessment: string;
  firstMentorComment: string;
  secondMentorComment: string;
  thirdMentorComment: string;
  projectId: number;
};
