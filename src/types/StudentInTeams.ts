export type TStudentInTeams = {
  studentId: number;
  semesterId: number;
  createdAt: Date;
  updatedAt: Date;
  teamId: number;
  student: Student;
  team: Team;
};
type Student = {
  studentId: number;
  name: string;
  email: string;
  code: string;
  tagSkill: string;
  department: Department;
};
type Team = {
  teamId: number;
  code: string;
  name: string;
  leaderId: string;
};
type Department = {
  departmentId: number;
  code: string;
  name: string;
};
