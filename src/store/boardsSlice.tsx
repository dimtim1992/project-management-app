import { createSlice } from '@reduxjs/toolkit';
import {
  createBoard,
  createColumn,
  createTask,
  deleteBoard,
  deleteColumn,
  deleteTask,
  getBoards,
  getColumns,
  getTasksSet,
} from 'services/api';
import { BoardsState, IBoard, IColumn, ITask } from 'types/types';

const initialState: BoardsState = {
  userBoards: [] as IBoard[],
  userColumns: [] as IColumn[],
  userTasks: [] as ITask[],
  newBoardTitle: '',
  newBoardDescription: '',
  newColumnTitle: '',
  newTaskTitle: '',
  newTaskDescription: ' ',
  openAddBoardModal: false,
  openAddColumnModal: false,
  openAddTaskModal: false,
  boardLoading: '',
  activeBoard: {} as IBoard,
  isLoading: false,
  deleteToggle: false,
  taskToBeDeleted: null,
  columnToBeDeleted: null,
  boardToBeDeleted: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    toggleAddBoardModal(state, action) {
      state.openAddBoardModal = action.payload;
    },
    toggleAddColumnModal(state, action) {
      state.openAddColumnModal = action.payload;
    },
    toggleAddTaskModal(state, action) {
      state.openAddTaskModal = action.payload;
    },
    addBoard(state, action) {
      state.userBoards.push(action.payload);
    },
    setNewBoardTitle(state, action) {
      state.newBoardTitle = action.payload;
    },
    setNewBoardDescription(state, action) {
      state.newBoardDescription = action.payload;
    },
    setNewColumnTitle(state, action) {
      state.newColumnTitle = action.payload;
    },
    setNewTaskTitle(state, action) {
      state.newTaskTitle = action.payload;
    },
    setNewTaskDescription(state, action) {
      state.newTaskDescription = action.payload;
    },
    setActiveBoard(state, action) {
      state.activeBoard = state.userBoards.filter((board) => board._id === action.payload)[0];
      localStorage.setItem('activeBoardId', action.payload);
      localStorage.setItem('activeBoardTitle', state.activeBoard.title);
      console.log(localStorage.getItem('activeBoardId'));
      console.log(localStorage.getItem('activeBoardTitle'));
      console.log(localStorage);
    },
    resetActiveBoard(state) {
      state.activeBoard = {} as IBoard;
    },
    cleanUserColumn(state) {
      state.userColumns = [] as IColumn[];
    },
    setDeleteToggle(state, action) {
      state.deleteToggle = action.payload;
    },
    setTaskToBeDeleted(state, action) {
      state.taskToBeDeleted = action.payload;
    },
    setColumnToBeDeleted(state, action) {
      state.columnToBeDeleted = action.payload;
    },
    setBoardToBeDeleted(state, action) {
      state.boardToBeDeleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBoard.fulfilled, (state, { payload }) => {
      state.userBoards.push(payload);
      state.isLoading = false;
    });
    builder.addCase(getBoards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBoards.fulfilled, (state, { payload }) => {
      state.userBoards = payload;
      state.isLoading = false;
    });
    builder.addCase(deleteBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBoard.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getColumns.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getColumns.fulfilled, (state, { payload }) => {
      state.userColumns = payload;
      state.isLoading = false;
    });
    builder.addCase(createColumn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createColumn.fulfilled, (state, { payload }) => {
      state.userColumns.push(payload);
      state.isLoading = false;
    });
    builder.addCase(deleteColumn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteColumn.fulfilled, (state, { payload }) => {
      state.userColumns = state.userColumns.filter((column) => column._id !== payload._id);
      state.isLoading = false;
    });
    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.userTasks.push(payload);
      state.isLoading = false;
    });
    builder.addCase(getTasksSet.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasksSet.fulfilled, (state, { payload }) => {
      state.userTasks = payload;
      state.isLoading = false;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.userTasks = state.userTasks.filter((task) => task._id !== payload._id);
      state.isLoading = false;
    });
  },
});

export default boardsSlice.reducer;
export const {
  toggleAddBoardModal,
  toggleAddColumnModal,
  toggleAddTaskModal,
  addBoard,
  setNewBoardTitle,
  setNewBoardDescription,
  setNewColumnTitle,
  setNewTaskTitle,
  setNewTaskDescription,
  setActiveBoard,
  resetActiveBoard,
  cleanUserColumn,
  setDeleteToggle,
  setTaskToBeDeleted,
  setColumnToBeDeleted,
  setBoardToBeDeleted,
} = boardsSlice.actions;
