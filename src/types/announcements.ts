export type TAnnouncements = {
  announcementId: number;
  createdAt: Date;
  updatedAt: Date;
  semesterId: number;
  userRole: number;
  title: string;
  content: string;
  semester: Semester;
};
type Semester = {
  semesterId: number;
  name: string;
  status: number;
  assingningDate: Date;
  inProgressDate: Date;
  finishedDate: Date;
};
