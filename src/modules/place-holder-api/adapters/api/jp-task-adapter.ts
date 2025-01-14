import { Task } from "@/base/core/domain/entities/task";
import { TaskPort } from "@/base/ports/task-port";
import { mapTaskFromJpApi, mapTaskToJpApi } from "../../core/mappers/jp-task-mapper";
import axios from "axios";
import { API_BASE_URL } from "../../constants/jp-constants";

export const JsonPlaceholderTaskAdapter: TaskPort = {

  async fetchTasksForUser(userId: string): Promise<Task[]> {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/todos`);
    return response.data.map(mapTaskFromJpApi);
  },

  async fetchTaskById(id: string): Promise<Task> {
    const response = await axios.get(`${API_BASE_URL}/todos/${id}`);
    return mapTaskFromJpApi(response.data);
  },

  async createTask(task: Task | Omit<Task, 'id'>): Promise<Task> {
    const response = await axios.post(`${API_BASE_URL}/todos`, mapTaskToJpApi(task));
    return mapTaskFromJpApi(response.data);
  },

  async updateTask(task: Task): Promise<Task> {
    const response = await axios.put(`${API_BASE_URL}/todos/${task.id}`, mapTaskToJpApi(task));
    return mapTaskFromJpApi(response.data);
  },

  async deleteTask(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
  },

};