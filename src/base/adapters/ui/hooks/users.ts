import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useDependencies } from "../context/dependency-provider"
import { UserService } from "@/base/core/domain/services/user-service";
import { User } from "@/base/core/domain/entities/user";
import { DEFAULT_STALE_MILLISECONDS } from "@/base/constants/common-constants";

const fetchAllUsers = ({userService, queryClient}: {
  userService: UserService;
  queryClient: QueryClient;
}) => {
  const { data: users, isLoading: loading, error } = useQuery({
    queryKey: ['all-users'],
    queryFn: userService.fetchAllUsers,
    staleTime: DEFAULT_STALE_MILLISECONDS,
    retry: 1,
  }, queryClient);
  return {users, loading, error};
}

const fetchUserById = ({userService, queryClient, id}: {
  userService: UserService;
  queryClient: QueryClient;
  id: string;
}) => {
  const { data: user, isLoading: loading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.fetchUserById(id),
    staleTime: DEFAULT_STALE_MILLISECONDS,
    retry: 1,
  }, queryClient);
  return {user, loading, error};
}

const createUser = ({userService, queryClient}: {
  userService: UserService;
  queryClient: QueryClient;
}) => {
  const { data: user, isPending: loading, error, mutate } = useMutation({
    mutationKey: ['all-users'],
    mutationFn: (userData: Omit<User, "id">) => userService.createUser(userData)
  }, queryClient);

  return {user, loading, error, createUser: mutate};
}

export const useUsers = () => {

  const {userService, queryClient} = useDependencies();

  return {
    fetchAllUsers: () => fetchAllUsers({userService: userService, queryClient}),
    fetchUserById: (id: string) => fetchUserById({userService: userService, queryClient, id}),
    createUser: () => createUser({userService: userService, queryClient})
  }

}