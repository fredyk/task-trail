import { Link } from "react-router-dom";
import UserListView from "../views/user-list-view";

const UserListPage = () => (
  <div className="min-h-screen p-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-end">
          <Link to="/users/new">Add User</Link>
        </div>
        <UserListView />
      </div>
    </div>
  </div>
);

export default UserListPage;