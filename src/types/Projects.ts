export type TProjects = {
  ProjectId: number;
  createAt: Date;
  updateAt: Date;
  teamId: number;
  topicId: number;
  status: number;
  team: Team[];
  topic: Topic[];
  comment: string;
};

type Team = {
  code: string;
  team: string;
  leaderId: number;
};

type Topic = {
  name: string;
  code: string;
  abtract: string;
  attachment: string;
};
