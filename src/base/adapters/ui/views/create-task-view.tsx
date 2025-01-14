interface CreateTaskInputProps {
  creatingTask?: boolean;
  userId: string;
  title: string;
  description: string;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CreateTaskView: React.FC<CreateTaskInputProps> = ({
  creatingTask,
  userId,
  title,
  description,
  onChange,
  onSubmit,
}: CreateTaskInputProps) => {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow-md rounded-md mt-5">
      <h1 className="text-2xl font-bold mb-4">Add Task</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">User ID:</label>
          <input
            type="text"
            disabled
            value={userId}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            disabled={creatingTask}
            onChange={(e) => onChange("title", e.target.value)}
            name="title"
            value={title}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <input
            type="text"
            disabled={creatingTask}
            onChange={(e) => onChange("description", e.target.value)}
            name="description"
            value={description}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={creatingTask}
          onClick={onSubmit}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTaskView;
