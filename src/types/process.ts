export type TProcess = {
  processId: number;
  name: string;
  description: String;
  startTime: Date;
  endTime: Date;
  isTemplate: boolean;
  semesterId: number;
  departmentId: number;
  activities: Array<Activity>;
};

type Activity = {
  activityId: number;
  name: string;
  startTime: Date;
  endTime: Date;
};
