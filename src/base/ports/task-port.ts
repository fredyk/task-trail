import { Task } from "../core/domain/entities/task";

export interface TaskPort {
  fetchTasksForUser(userId: string): Promise<Task[]>;
  fetchTaskById(id: string): Promise<Task>;
  createTask(task: Omit<Task, 'id'>): Promise<Task>;
  updateTask(task: Task): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}