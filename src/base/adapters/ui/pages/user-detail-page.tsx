import { useParams } from "react-router-dom";
import { useTasks } from "../hooks/tasks";
import { useUsers } from "../hooks/users";
import UserDetailView from "../views/user-detail-view";
import { User } from "@/base/core/domain/entities/user";
import React, { useEffect } from "react";
import CreateTaskView from "../views/create-task-view";

const CreateTaskWrapper = ({ user }: { user: User }) => {

  const { createTask: useCreateTask } = useTasks();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const {task: createdTask, loading, error, createTask } = useCreateTask();

  useEffect(() => {
    if (!error && createdTask?.id) {
      setTitle("");
      setDescription("");
    }
  }, [createdTask, error]);

  const onChange = (name: string, value: string) => {
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
    }
  }

  return (
    <>
      <CreateTaskView
        creatingTask={loading}
        userId={user.id}
        title={title}
        description={description}
        onChange={onChange}
        onSubmit={(e) => {
          e.preventDefault();
          createTask({
            userId: user.id,
            title,
            description,
            status: "OPEN",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }}
       />
      {error && <p className="text-danger">{error.message}</p>}
    </>
  );
}

const UserDetailPage = () => {

  const { fetchUserById } = useUsers();
  const { fetchTasksForUser } = useTasks();
  const { id } = useParams<{ id: string }>();

  const { user, loading: userLoading, error: userError } = fetchUserById(id as string);
  const { tasks, loading: tasksLoading, error: tasksError } = fetchTasksForUser(id as string);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (!user || userError || tasksError) ? (
    <div>User {id} not found</div>
  ) : (
    <UserDetailView
      user={user}
      tasks={tasks || []}
      loadingTasks={tasksLoading}
      CreateTaskWrapper={CreateTaskWrapper}
    />
  );

}

export default UserDetailPage;