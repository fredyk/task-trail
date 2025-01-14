import { User } from "@/base/core/domain/entities/user";
import { UserPort } from "@/base/ports/user-port";
import { mapUserFromJpApi, mapUserToJpApi } from "../../core/mappers/jp-user-mapper";
import { API_BASE_URL } from "../../constants/jp-constants";
import axios from 'axios';

export const JsonPlaceholderUserAdapter: UserPort = {

  async fetchAllUsers(): Promise<User[]> {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.map(mapUserFromJpApi);
  },

  async fetchUserById(id: string): Promise<User> {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return mapUserFromJpApi(response.data);
  },
  
  async createUser(user: Omit<User, "id">): Promise<User> {
    const response = await axios.post(`${API_BASE_URL}/users`, mapUserToJpApi(user));
    return mapUserFromJpApi(response.data);
  }

}
