import { Task } from "@/base/core/domain/entities/task";
import { TaskPort } from "@/base/ports/task-port";
import { useState, useMemo, useCallback } from "react";

export class TaskRepository {
  constructor(private taskPort: TaskPort) {}

  fetchTasksForUser(userId: string) {
    return this.taskPort.fetchTasksForUser(userId);
  }

  fetchTaskById(id: string) {
    return this.taskPort.fetchTaskById(id);
  }

  createTask(task: Omit<Task, 'id'>) {
    return this.taskPort.createTask(task);
  }

  updateTask(task: Task) {
    return this.taskPort.updateTask(task);
  }

  deleteTask(id: string) {
    return this.taskPort.deleteTask(id);
  }

}

export const useTaskRepository = (initialTaskPort?: TaskPort) => {
  const [taskPort, setTaskPort] = useState<TaskPort | undefined>(initialTaskPort);

  const taskRepository = useMemo(() => {
    if (!taskPort) {
      throw new Error('TaskPort is required at least once');
    }
    return new TaskRepository(taskPort);
  }, [taskPort]);

  // Function to update the TaskPort dynamically
  const updateTaskPort = useCallback((newTaskPort: TaskPort) => {
    setTaskPort(newTaskPort);
  }, []);

  return { taskRepository, updateTaskPort };
};