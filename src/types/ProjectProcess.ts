export type TProjectProcess = {
  procjectProcessId: number;
  projectId: number;
  processId: number;
  process: Process;
};
type Process = {
  name: String;
  description: String;
  processMode: number;
  startTime: Date;
  endTime: Date;
  activities: Array<Activity>;
};

type Activity = {
  activityId: number;
  name: string;
  startTime: Date;
  endTime: Date;
};
