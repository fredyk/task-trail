import { UserMapper, UserMapperReverse } from "@/base/core/mappers/user-mapper";
import { JpUserDto } from "../../adapters/api/dtos/jp-user-dto";
import { User } from "@/base/core/domain/entities/user";

export const mapUserFromJpApi: UserMapper<JpUserDto> = (apiUser: JpUserDto): User => {
  return {
    id: `${apiUser.id}`,
    name: apiUser.name,
    email: apiUser.email,
    phone: apiUser.phone,
  };
}

export const mapUserToJpApi: UserMapperReverse<JpUserDto> = (user: User | Omit<User, "id">): JpUserDto => {
  return {
    id: (user as User).id ? parseInt((user as User).id) : 0,
    name: user.name,
    email: user.email,
    phone: user.phone,
  };
}