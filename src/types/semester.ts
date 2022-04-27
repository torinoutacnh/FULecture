export type TSemester = {
  semesterId: number;
  name: string;
  status: number;
  assingningDate: Date;
  inProgressDate: Date;
  finishedDate: Date;
  maxProject: number;
  marginPass: number;
};

export type SemesterState = {
  isLoading: boolean;
  error: boolean;
  semester: TSemester | null;
};
