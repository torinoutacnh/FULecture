export type TTopicFeedback = {
  topicFeedbackId: number;
  createdAt: Date;
  updatedAt: Date;
  topicId: number;
  approverId: number;
  content: string;
  isApprove: boolean;
};
