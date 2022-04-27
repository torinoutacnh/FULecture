export type TCheckpoint = {
  checkpointId: number;
  name: string;
  description: string;
  weight: number;
  marginPass: number;
  isTemplate: boolean;
  isEvaluate: boolean;
  semesterId: number;
  departmentId: number;
  department: Department;
};

type Department = {
  departmentId: number;
  code: string;
  name: string;
};
