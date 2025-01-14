import { User } from "../domain/entities/user";

export type UserMapper<T extends object> = (apiUser: T) => User;
export type UserMapperReverse<T extends object> = (user: User | Omit<User, "id">) => T;