import { JsonPlaceholderUserAdapter } from "@/modules/place-holder-api/adapters/api/jp-user-adapter";
import { UserPort } from "../ports/user-port";
import { TaskPort } from "../ports/task-port";
import { JsonPlaceholderTaskAdapter } from "@/modules/place-holder-api/adapters/api/jp-task-adapter";

type ApiName = 'json-placeholder'; // | 'taskTrail';

const displayNames: Record<ApiName, string> = {
  'json-placeholder': 'JSON Placeholder',
  // 'taskTrail': 'Task Trail',
};

const userAdapters: Record<ApiName, UserPort> = {
  'json-placeholder': JsonPlaceholderUserAdapter,
  // 'taskTrail': new Error('Not implemented'),
};

const taskAdapters: Record<ApiName, TaskPort> = {
  'json-placeholder': JsonPlaceholderTaskAdapter,
  // 'taskTrail': new Error('Not implemented'),
};

export const chooseDefaultApi = () => {
  const adapterName = import.meta.env.VITE_DEFAULT_USER_ADAPTER;
  return chooseApiByName(adapterName);
}

export const chooseApiByName = (adapterName: ApiName) => {
  // check if the adapter name is valid
  if (!userAdapters[adapterName as ApiName]) {
    throw new Error('Invalid adapter name ' + adapterName);
  }
  return {
    name: adapterName,
    displayName: displayNames[adapterName],
    userPort: userAdapters[adapterName],
    taskPort: taskAdapters[adapterName],
  };
}