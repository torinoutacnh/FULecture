export type TTeam = {
  teamId: number;
  leaderId: number;
  departmentId: number;
  semesterId: number;
  topicId: number;
  code: string;
  name: string;
  isLocked: boolean;
  isPublic: true;
  maxMembers: number;
  leader: any;
  department: Array<TDepartment>;
  topic: any;
};

type TDepartment = {
  code: string;
  name: string;
};
