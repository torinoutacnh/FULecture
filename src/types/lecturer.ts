export type TLecturer = {
  lecturerId: number;
  email: string;
  name: string;
  code: string;
  isDisable: boolean;
  departments: TDepartment[];
};

export type TDepartment = {
  code: string;
  name: string;
};
