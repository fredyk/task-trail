import { User } from "@/base/core/domain/entities/user";
import { UserPort } from "@/base/ports/user-port";
import { useCallback, useMemo, useState } from "react";

export class UserRepository {
  constructor(private userPort: UserPort) {}

  fetchAllUsers() {
    return this.userPort.fetchAllUsers();    
  }

  fetchUserById(id: string) {
    return this.userPort.fetchUserById(id);
  }

  createUser(user: Omit<User, "id">) {
    return this.userPort.createUser(user);
  }

}

export const useUserRepository = (initialUserPort?: UserPort) => {
  const [userPort, setUserPort] = useState<UserPort | undefined>(initialUserPort);

  const userRepository = useMemo(() => {
    if (!userPort) {
      throw new Error('UserPort is required at least once');
    }
    return new UserRepository(userPort);
  }, [userPort]);

  // Function to update the UserPort dynamically
  const updateUserPort = useCallback((newUserPort: UserPort) => {
    setUserPort(newUserPort);
  }, []);

  return { userRepository, updateUserPort };
};
