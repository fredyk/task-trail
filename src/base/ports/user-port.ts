import { User } from "../core/domain/entities/user";

export interface UserPort {
  fetchAllUsers(): Promise<User[]>;
  fetchUserById(id: string): Promise<User>;
  createUser(user: Omit<User, "id">): Promise<User>;
}