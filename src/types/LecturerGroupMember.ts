export type TLecturerGroupMember = {
  lecturerId: number;
  LecturerGroupId: number;
  isLeader: boolean;
  weight: number;
  lecturer: TLecturer;
};
export type TLecturer = {
  lecturerId: number;
  code: string;
  name: string;
  email: string;
};
