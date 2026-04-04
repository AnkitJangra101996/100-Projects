import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal } from "./features/modal";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/modal";
import TodoListItem from "./components/todoListItem";
import { completeTodo, deleteTodo } from "./features/todo";

const App = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const { isOpen, title, type, editableTodo } = useSelector(
    (state) => state.modal
  );

  const handleCompleteTodo = (id) => {
    const completePromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      dispatch(completeTodo(id));
    });

    toast.promise(completePromise, {
      loading: "Completing todo...",
      success: "Todo completed successfully!",
      error: "Failed to complete todo.",
    });
  };

  const handleDeleteTodo = (id) => {
    const deletePromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      dispatch(deleteTodo(id));
    });

    toast.promise(deletePromise, {
      loading: "Deleting todo...",
      success: "Todo deleted successfully!",
      error: "Failed to delete todo.",
    });
  };

  const openEditModal = ({ id, text }) => {
    dispatch(
      openModal({
        isOpen: true,
        type: "edit",
        title: "Edit Todo",
        editableTodo: { id, text },
      })
    );
  };

  return (
    <>
      <main className="flex justify-center items-center min-h-screen flex-col gap-4 max-w-xl min-w-xl">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Todo List</h1>
          <button
            onClick={() =>
              dispatch(
                openModal({
                  isOpen: true,
                  type: "add",
                  title: "Add Todo",
                })
              )
            }
            className="bg-blue-500 text-white rounded p-4"
          >
            Create Todo
          </button>
        </div>
        <ul className="mt-4 w-full flex flex-col gap-4">
          {todos?.length !== 0 ? (
            todos.map((todo) => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                complete={() => handleCompleteTodo(todo.id)}
                deleteFunc={() => handleDeleteTodo(todo.id)}
                editFunc={() => openEditModal({ id: todo.id, text: todo.text })}
              />
            ))
          ) : (
            <div className="flex flex-col items-center gap-2">
              <li>No todos available</li>
            </div>
          )}
        </ul>
      </main>
      <Modal
        isOpen={isOpen}
        onClose={() => dispatch(closeModal())}
        type={type}
        title={title}
        editableTodo={editableTodo}
      ></Modal>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
