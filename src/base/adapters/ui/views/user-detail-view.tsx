import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Task } from "@/base/core/domain/entities/task";
import { User } from "@/base/core/domain/entities/user";

function DetailsSection({ user }: { user: User }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{user.name} Details</h1>
      <p className="text-gray-700"><span className="font-semibold">ID:</span> {user.id}</p>
      <p className="text-gray-700"><span className="font-semibold">Name:</span> {user.name}</p>
      <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
      <p className="text-gray-700"><span className="font-semibold">Phone:</span> {user.phone}</p>
    </div>
  );
}

function TasksSection({ user, tasks }: { user: User; tasks: Task[] }) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-md p-4">
      <h1 className="mt-5 text-xl font-semibold text-gray-800">{user.name}'s Tasks</h1>
      <table className="w-full mt-3">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr data-testid="task" key={task.id}>
              <td>{task.id}</td>
              <td data-testid="task.title">{task.title}</td>
              <td data-testid="task.description">{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const UserDetailView = ({
  user,
  tasks,
  loadingTasks,
  CreateTaskWrapper,
}: {
  user: User;
  tasks: Task[];
  loadingTasks: boolean;
  CreateTaskWrapper: React.FC<{ user: User }>;
}) => {
  const navigate = useNavigate();

  return (

    <div className="space-y-6">
      <button className="text-blue-500 hover:underline flex items-center" onClick={() => navigate(-1)}>
        <FiArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>
      <DetailsSection user={user} />
      {loadingTasks ? (
        <div className="text-center text-gray-500">Loading tasks...</div>
      ) : (
        <div className="space-y-4">
          <CreateTaskWrapper user={user} />
          <TasksSection user={user} tasks={tasks} />
        </div>
      )}
    </div>
  );
};

export default UserDetailView;
