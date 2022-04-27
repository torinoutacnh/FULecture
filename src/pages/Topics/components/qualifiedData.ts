export type TQualifiedData = {
  comment: string;
  conclusion: string;
  teamId: number;
  semesterId: number;
  studentList: Student[];
};

type Student = {
  studentId: number;
  name: string;
  isQualified: boolean;
};
