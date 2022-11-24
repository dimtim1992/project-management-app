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
    // deleteBoard(state, action) {},
    // addColumn(state, action) {},
    // deleteColumn(state, action) {},
    // addTask(state, action) {},
    // deleteTask(state, action) {},
    // setTaskCounter(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(createBoard.pending, (state) => {
      state.boardLoading = 'pending';
    });
    builder.addCase(createBoard.fulfilled, (state, { payload }) => {
      state.userBoards.push(payload);
      state.boardLoading = 'fulfilled';
    });
    builder.addCase(getBoards.fulfilled, (state, { payload }) => {
      state.userBoards = payload;
    });
    builder.addCase(deleteBoard.pending, (state) => {
      state.boardLoading = 'pending';
    });
    builder.addCase(deleteBoard.fulfilled, (state) => {
      state.boardLoading = 'fulfilled';
    });
    builder.addCase(getColumns.fulfilled, (state, { payload }) => {
      state.userColumns = payload;
    });
    builder.addCase(createColumn.fulfilled, (state, { payload }) => {
      state.userColumns.push(payload);
      // state.ColumnLoading = 'fulfilled';
    });
    builder.addCase(deleteColumn.fulfilled, (state, { payload }) => {
      state.userColumns = state.userColumns.filter((column) => column._id !== payload._id);
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.userTasks.push(payload);
      console.log(payload);
    });
    // builder.addCase(getTasks.fulfilled, (state, { payload }) => {
    //   state.userTasks = payload;
    // });
    builder.addCase(getTasksSet.fulfilled, (state, { payload }) => {
      state.userTasks = payload;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.userTasks = state.userTasks.filter((task) => task._id !== payload._id);
    });
    // builder.addCase(getActiveBoard.pending, (state) => {
    //   state.boardLoading = 'pending';
    // });
    // builder.addCase(getActiveBoard.fulfilled, (state, { payload }) => {
    //   state.activeBoard = payload;
    //   console.log(state.activeBoard);
    //   state.boardLoading = 'fulfilled';
    // });
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
  // deleteBoard,
  // addColumn,
  // deleteColumn,
  // addTask,
  // deleteTask,
  // setTaskCounter,
} = boardsSlice.actions;
