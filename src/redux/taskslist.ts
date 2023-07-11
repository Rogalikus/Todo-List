import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { TaskType } from "../types/types";
import { RootState } from "./store";

export interface TasksListStateType {
  [taskListId: string]: Array<TaskType>;
}

export interface TasksSliceStateType {
  tasksList: TasksListStateType;
}

export let todoListId1 = v1();
export let todoListId2 = v1();

export let initialState: TasksSliceStateType = {
  tasksList: {
    [todoListId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "React", isDone: true },
    ],
    [todoListId2]: [
      { id: v1(), title: "Social-Network", isDone: true },
      { id: v1(), title: "CLothingStore", isDone: true },
      { id: v1(), title: "TodoList", isDone: false },
    ],
  },
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(
      state,
      action: PayloadAction<{ newTitle: string; todoListId: string }>
    ) {
      let newTask = { id: v1(), title: action.payload.newTitle, isDone: false };

      let tasks = state.tasksList[action.payload.todoListId];

      let newTasks = [newTask, ...tasks];
      state.tasksList[action.payload.todoListId] = newTasks;
    },
    removeTasks(state, action: PayloadAction<{ id: string; taskId: string }>) {
      let filteredTasks = state.tasksList[action.payload.taskId].filter(
        (el) => el.id !== action.payload.id
      );
      state.tasksList[action.payload.taskId] = filteredTasks;
    },
    changeStatus(
      state,
      action: PayloadAction<{ id: string; isDone: boolean; todoListId: string }>
    ) {
      let tasks = state.tasksList[action.payload.todoListId];
      const findItem = tasks.find((e) => e.id === action.payload.id);
      if (findItem) {
        findItem.isDone = action.payload.isDone;
      }
    },
    addIdTodoList(state, action: PayloadAction<string>) {
      state.tasksList[action.payload] = [];
    },
    removeIdTodoList(state, action: PayloadAction<string>) {
      delete state.tasksList[action.payload];
    },
  },
});

export const tasksListSelector = (state: RootState) => {
  return state.tasksList;
};

export const {
  addTask,
  removeTasks,
  changeStatus,
  addIdTodoList,
  removeIdTodoList,
} = tasksSlice.actions;

export default tasksSlice.reducer;
