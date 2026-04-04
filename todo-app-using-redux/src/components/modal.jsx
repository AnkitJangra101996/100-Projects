import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { closeModal } from "../features/modal";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../features/todo";
import toast from "react-hot-toast";

function Modal({ isOpen, onClose, type, title }) {
  const [addTodoText, setAddTodoText] = useState("");
  const dispatch = useDispatch();

  const { editableTodo } = useSelector((state) => state.modal);

  const modalRoot = document.getElementById("modal-root");

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAddTodoFunction = () => {
    if (addTodoText.trim() === "") return;
    const myPromise = new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    }).then(() => {
      const newTodo = {
        id: Date.now(),
        text: addTodoText,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      dispatch(closeModal());
    });

    toast.promise(myPromise, {
      loading: "Createing todo....",
      success: "Todo added successfully",
      error: "Todo not added successfully",
    });
  };

  const handleEditTodoFunction = () => {
    if (addTodoText.trim() === "") {
      toast.error("Todo text cannot be empty");
      return;
    }
    if (!editableTodo.text || !editableTodo.id) {
      toast.error("Invalid todo data");
      return;
    }
    const editPromise = new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    }).then(() => {
      dispatch(
        editTodo({
          id: editableTodo.id,
          text: addTodoText,
        })
      );
      dispatch(closeModal());
    });

    toast.promise(editPromise, {
      loading: "Editing todo....",
      success: "Todo updated successfully",
      error: "Todo not updated successfully",
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg min-w-[300px]"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {type === "add" ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-[#333] ">{title}</h2>
            <div>
              <input
                type="text"
                placeholder="Enter todo title"
                className="border border-gray-300 rounded p-2 mb-4 w-full "
                onChange={(e) => setAddTodoText(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4 ">
              <button
                className="bg-blue-500 text-white rounded p-2"
                onClick={handleAddTodoFunction}
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
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-[#333] ">{title}</h2>
            <div>
              <input
                type="text"
                placeholder="Enter todo title"
                className="border border-gray-300 rounded p-2 mb-4 w-full "
                defaultValue={editableTodo.text}
                onChange={(e) => setAddTodoText(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4 ">
              <button
                className="bg-blue-500 text-white rounded p-2"
                onClick={handleEditTodoFunction}
              >
                Edit Todo
              </button>
              <button
                className="bg-gray-300 rounded p-2"
                onClick={() => dispatch(closeModal())}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
