import { TaskPort } from "@/base/ports/task-port";
import { UserPort } from "@/base/ports/user-port";
import { createContext, ReactNode, useContext, useMemo } from "react";
import {
  UserRepository,
  useUserRepository,
} from "../../repositories/user-repository";
import { TaskRepository, useTaskRepository } from "../../repositories/task-repository";
import { UserService } from "@/base/core/domain/services/user-service";
import { TaskService } from "@/base/core/domain/services/task-service";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface DependencyContextProps {
  apiName: string;
  apiDisplayName: string;
  userRepository: UserRepository;
  taskRepository: TaskRepository;
  updateUserPort: (newUserPort: UserPort) => void;
  updateTaskPort: (newTaskPort: TaskPort) => void;
  userService: UserService;
  taskService: TaskService;
  queryClient: QueryClient;
}

export const DependencyContext = createContext<DependencyContextProps | null>(
  null
);

export const useDependencies = (): DependencyContextProps => {
  const context = useContext(DependencyContext);
  if (!context) {
    throw new Error("useDependencies must be used within a DependencyProvider");
  }
  return context;
};

interface DependencyProviderProps {
  apiName: string;
  apiDisplayName: string;
  defaultUserPort: UserPort;
  defaultTaskPort: TaskPort;
  children: ReactNode;
}

export const DependencyProvider: React.FC<DependencyProviderProps> = ({
  apiName,
  apiDisplayName,
  defaultUserPort,
  defaultTaskPort,
  children,
}) => {

  const queryClient = useQueryClient();

  // Initialize repositories
  const {userRepository, updateUserPort} = useUserRepository(defaultUserPort);
  const {taskRepository, updateTaskPort} = useTaskRepository(defaultTaskPort);

  // Initialize services
  const userService = useMemo(() => new UserService(userRepository), [userRepository]);
  const taskService = useMemo(() => new TaskService(taskRepository), [taskRepository]);

  return (
    <DependencyContext.Provider
      value={{
        apiName,
        apiDisplayName,
        userRepository,
        taskRepository,
        updateUserPort,
        updateTaskPort,
        userService,
        taskService,
        queryClient,
      }}
    >
      {children}
    </DependencyContext.Provider>
  );
};
