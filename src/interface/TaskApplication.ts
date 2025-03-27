interface Compensation {
  currency: string;
  amount: number;
}

interface TaskDetails {
  _id: string;
  title: string;
  description: string;
  taskType: string;
  location: string;
  requirements: string;
  deadline: string;
  compensation: Compensation;
  visibility: string;
  link1?: string;
  link2?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TaskApplication {
  _id: string;
  taskId: TaskDetails;
  earnerId: string;
  earnerStatus: string;
  reviewStatus: string;
  reviewedAt: string | null;
  submittedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
