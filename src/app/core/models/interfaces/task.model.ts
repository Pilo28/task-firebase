export interface Task {
    id?: string; 
    title: string;
    description?: string; 
    completed: boolean;
    dueDate?: Date;
    userId: string; 
}
  