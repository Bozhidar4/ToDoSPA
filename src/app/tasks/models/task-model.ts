export interface Task {
    id: number;
    name: string;
    description: string;
    dueDate: Date;
    isDone: boolean;
    status: string;
    canComplete: boolean;
    canDelete: boolean;
  }