import { TaskMapper, TaskMapperReverse } from "@/base/core/mappers/task-mapper";
import { JpTaskDto } from "../../adapters/api/dtos/jp-task-dto";
import { Task } from "@/base/core/domain/entities/task";

export const mapTaskFromJpApi: TaskMapper<JpTaskDto> = (apiTask: JpTaskDto): Task => {
  return {
    id: `${apiTask.id}`,
    title: apiTask.title,
    description: `Description for task ${apiTask.id}`,
    status: apiTask.completed ? 'DONE' : 'OPEN',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: `${apiTask.userId}`,
  };
}

export const mapTaskToJpApi: TaskMapperReverse<JpTaskDto> = (task: Task | Omit<Task, 'id'>): JpTaskDto => {
  return {
    id: (task as Task)?.id ? parseInt((task as Task).id) : 0,
    userId: parseInt(task.userId),
    title: task.title,
    completed: task.status === 'DONE',
  };
}