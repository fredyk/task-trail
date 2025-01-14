import { Task } from "../domain/entities/task";

export type TaskMapper<T extends object> = (apiTask: T) => Task;
export type TaskMapperReverse<T extends object> = (task: Task | Omit<Task, 'id'>) => T;