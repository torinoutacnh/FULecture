export type TLecturerGroup = {
  LecturerGroupId: number;
  departmentId: number;
  semesterId: number;
  name: string;
  department: Array<TDepartment>;
  lecturerLecturerGroupMembers: Array<TLecturerLecturerGroupMembers>;
};

type TDepartment = {
  code: string;
  name: string;
};
type TLecturerLecturerGroupMembers = {
  name: string;
  code: string;
};
