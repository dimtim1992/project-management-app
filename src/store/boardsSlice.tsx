import { createSlice } from '@reduxjs/toolkit';
import { createBoard, createColumn, deleteBoard, getBoards, getColumns } from 'services/api';
import { BoardsState, IBoard, IColumn } from 'types/types';

const initialState: BoardsState = {
  userBoards: [] as IBoard[],
  userColumns: [] as IColumn[],
  newBoardTitle: '',
  newBoardDescription: '',
  newColumnTitle: '',
  openAddBoardModal: false,
  openAddColumnModal: false,
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
  addBoard,
  setNewBoardTitle,
  setNewBoardDescription,
  setNewColumnTitle,
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
