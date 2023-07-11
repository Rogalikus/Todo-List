import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilteredValuesType, TaskListType } from "../types/types";
import { RootState } from "./store";
import { todoListId1, todoListId2 } from "./taskslist";

export interface TodoListSliceStateType {
  todoList: Array<TaskListType>;
}

export let initialState: TodoListSliceStateType = {
  todoList: [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to did", filter: "all" },
  ],
};

export const todoListsSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodoList(
      state,
      action: PayloadAction<{ newListTitle: string; newIdTodoList: string }>
    ) {
      let newList: TaskListType = {
        id: action.payload.newIdTodoList,
        title: action.payload.newListTitle,
        filter: "all",
      };
      state.todoList.push(newList);
    },
    removeTodoList(state, action: PayloadAction<string>) {
      let filteredTodoList = state.todoList.filter(
        (el) => el.id !== action.payload
      );
      state.todoList = filteredTodoList;
    },
    changeFilter(
      state,
      action: PayloadAction<{ value: FilteredValuesType; id: string }>
    ) {
      let taskList = state.todoList.find((el) => el.id === action.payload.id);
      if (taskList) {
        taskList.filter = action.payload.value;
      }
      state.todoList = [...state.todoList];
    },
  },
});

export const { addTodoList, removeTodoList, changeFilter } =
  todoListsSlice.actions;

export const todoListSelector = (state: RootState) => {
  return state.todoList;
};

export default todoListsSlice.reducer;
