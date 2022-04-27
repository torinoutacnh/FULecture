export type TEvaluationBoard = {
  evaluationBoardId: number;
  name: string;
  semesterId: number;
  checkpointId: number;
  departmentId: number;
  startTime: Date;
  endTime: Date;
  isDisable: boolean;
  isTemplate: boolean;
  semester: Semester;
  councils: number;
  teams: number;
};
type Semester = {
  semesterId: number;
  name: number;
  status: number;
  assingningDate: Date;
  inProgressDate: Date;
  finishedDate: Date;
};
