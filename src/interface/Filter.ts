export type Filters = {
    "Date posted"?: string[];
    "Skill"?: string[];
    "Number of Applications"?: {
      minApplications: number;
      maxApplications: number;
    };
    "Task Pay"?: string[];
    [key: string]: any;
  };
  