const addTodo = () => {
  const { title, body } = useSelector((state) => state.modal);

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-[#333] ">{title}</h2>
      <div>
        <input
          type="text"
          placeholder="Enter todo title"
          className="border border-gray-300 rounded p-2 mb-4 w-full "
        />
      </div>
      <div className="flex justify-end gap-4 ">
        <button
          className="bg-blue-500 text-white rounded p-2"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
        <button
          className="bg-gray-300 rounded p-2"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default addTodo;
