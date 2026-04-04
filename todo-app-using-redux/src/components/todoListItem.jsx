const todoListItem = ({ todo, complete, deleteFunc, editFunc }) => {
  return (
    <div className="flex min-w-[100%] w-full bg-gray-100 p-4 rounded justify-between items-center">
      <p className={`text-[#333] ${todo.completed ? "line-through" : ""}`}>
        {todo.text}
      </p>
      <div className="flex gap-2">
        <button
          disabled={todo.completed}
          className="bg-blue-500 text-white rounded p-1"
          onClick={editFunc}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white rounded p-1"
          onClick={deleteFunc}
        >
          Delete
        </button>
        <button
          disabled={todo.completed}
          className="bg-green-500 text-white rounded p-1"
          onClick={complete}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default todoListItem;
