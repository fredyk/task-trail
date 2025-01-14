import React from "react";
import { useUsers } from "../hooks/users";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserListView: React.FC = () => {
  const { fetchAllUsers } = useUsers();

  const { users, loading } = fetchAllUsers();

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    users && (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr data-testid="user" key={user.id}>
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  data-testid="user.name"
                  >{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">{user.tasks.length}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default UserListView;
