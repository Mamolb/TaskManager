export interface Task {
  id: string;
  title: string;
  description?: string | null;  
  completed: boolean; //TODO: REMOVE AFTER IMPLEMNTATION OF STATUS
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
  dueDate?: Date | null;  
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
