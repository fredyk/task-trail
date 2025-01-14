import React from "react";

interface CreateUserInputProps {
  name: string;
  email: string;
  phone: string;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CreateUserView: React.FC<CreateUserInputProps> = ({
  name,
  email,
  phone,
  onChange,
  onSubmit,
}: CreateUserInputProps) => {
  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">Add User</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            onChange={(e) => onChange("name", e.target.value)}
            name="name"
            value={name}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            onChange={(e) => onChange("email", e.target.value)}
            name="email"
            value={email}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone:
          </label>
          <input
            type="tel"
            onChange={(e) => onChange("phone", e.target.value)}
            name="phone"
            value={phone}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUserView;
