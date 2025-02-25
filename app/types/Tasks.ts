export interface Task {
  id: string;
  title: string;
  description?: string | null;  //Now allows both `string` and `null`
  completed: boolean;
  dueDate?: Date | null;  //Allow `null` for optional values
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
