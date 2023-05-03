import { configureStore } from "@reduxjs/toolkit";
import todoLists from "./todoLists";
import taskslist from "./taskslist";

export const store = configureStore({
  reducer: {
    todoList: todoLists,
    tasksList: taskslist,
  },
});

export type RootState = ReturnType<typeof store.getState>;
