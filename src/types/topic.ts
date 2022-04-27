import ProjectList from '../pages/Topics/components/ProjectList';
export type TTopic = {
  topicId: number;
  mentorGroupId: number;
  departmentId: number;
  semesterId: number;
  submitterId: number;
  checkPointTemplateId: number;
  companyId: number;
  code: string;
  status: number;
  name: string;
  abtract: string;
  description: string;
  maxMembers: number;
  minMember: number;
  keywords: string;
  note: string;
  submitByStudent: boolean;
  company: TCompany;
  lecturerSubmiter: TLecturerSubmitter;
  department: TDepartment;
  attachment: string;
  Projects: Array<Project>;
  createDate: Date;
  context: string;
  problem: string;
  proposedSolution: string;
  theory: string;
  output: string;
  technology: string;
  taskpackage1: string;
  taskpackage2: string;
  taskpackage3: string;
  taskpackage4: string;
  taskpackage5: string;
};

type Project = {
  createAt: Date;
  updateAt: Date;
  teamId: number;
  topicId: number;
  status: number;
};

type TDepartment = {
  code: string;
  name: string;
};
type TCompany = {
  code: string;
  name: string;
};

type TLecturerSubmitter = {
  lecturerId: number;
  name: string;
  code: string;
};
