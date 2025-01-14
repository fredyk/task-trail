import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { useDependencies } from '../context/dependency-provider';
import { Task } from '@/base/core/domain/entities/task';
import { TaskService } from '@/base/core/domain/services/task-service';
import { DEFAULT_STALE_MILLISECONDS } from '@/base/constants/common-constants';

const fetchTasksForUser = ({ taskService, queryClient, userId }: {
  taskService: TaskService;
  queryClient: QueryClient;
  userId: string;
}) => {
  const { data: tasks, isLoading: loading, error } = useQuery({
    queryKey: ['tasks', userId],
    queryFn: () => taskService.fetchTasksForUser(userId),
    staleTime: DEFAULT_STALE_MILLISECONDS,
    retry: 1,
  }, queryClient);
  return { tasks, loading, error };
}

const fetchTaskById = ({ taskService, queryClient, id }: {
  taskService: TaskService;
  queryClient: QueryClient;
  id: string;
}) => {
  const { data: task, isLoading: loading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => taskService.fetchTaskById(id),
    staleTime: DEFAULT_STALE_MILLISECONDS,
    retry: 1,
  }, queryClient);
  return { task, loading, error };
}

const createTask = ({ taskService, queryClient }: {
  taskService: TaskService;
  queryClient: QueryClient;
}) => {
  const { data: task, isPending: loading, error, mutate } = useMutation({
    mutationKey: ['tasks'],
    mutationFn: (taskData: Omit<Task, 'id'>) => taskService.createTask(taskData)
  }, queryClient);

  return { task, loading, error, createTask: mutate };
}

export const useTasks = () => {
  const { taskService, queryClient } = useDependencies();

  return {
    fetchTasksForUser: (userId: string) => fetchTasksForUser({ taskService, queryClient, userId }),
    fetchTaskById: (id: string) => fetchTaskById({ taskService, queryClient, id }),
    createTask: () => createTask({ taskService, queryClient })
  }
}