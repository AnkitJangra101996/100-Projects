import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    completeTodo: (state, action) => {
      const todo = state.todos.find(
        (todo) => todo.id === action.payload && !todo.completed
      );
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
  },
});

export const { addTodo, deleteTodo, completeTodo, editTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
