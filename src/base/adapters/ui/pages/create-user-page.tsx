import React, { useEffect } from "react";
import { useUsers } from "../hooks/users";
import { Link, useNavigate } from "react-router-dom";
import CreateUserView from "../views/create-user-view";

const CreateUserPage: React.FC = () => {

  const navigate = useNavigate();

  const { createUser: useCreateUser } = useUsers();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const {user, loading, error, createUser} = useCreateUser();

  useEffect(() => {
    if (!error && user?.id) {
      navigate("/users");
    }
  }, [user, error, navigate]);

  const onChange = (name: string, value: string) => {
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser({name, email, phone});
  };

  return !loading && (
    <>
      <CreateUserView
        name={name}
        email={email}
        phone={phone}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <Link to="/users">Back to Users</Link>
      {error && <p className="text-danger">{error.message}</p>}
    </>
  );

}

export default CreateUserPage;