import { UserRepository } from "@/base/adapters/repositories/user-repository";
import { User } from "../entities/user";

export class UserService {

  constructor(private userRepository: UserRepository) {}

  fetchAllUsers = () => this.userRepository.fetchAllUsers();

  fetchUserById = (id: string) => this.userRepository.fetchUserById(id);

  createUser = (user: Omit<User, "id">) => this.userRepository.createUser(user);

}
