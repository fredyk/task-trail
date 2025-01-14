import { TaskRepository } from "@/base/adapters/repositories/task-repository";
import { Task } from "../entities/task";

export class TaskService {

  constructor(private taskRepository: TaskRepository) {}

  fetchTasksForUser = (userId: string) => this.taskRepository.fetchTasksForUser(userId);

  fetchTaskById = (id: string) => this.taskRepository.fetchTaskById(id);

  createTask = (task: Omit<Task, 'id'>) => this.taskRepository.createTask(task);

  updateTask = (task: Task) => this.taskRepository.updateTask(task);

  deleteTask = (id: string) => this.taskRepository.deleteTask(id);

}
