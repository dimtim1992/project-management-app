import { createSlice } from '@reduxjs/toolkit';
import { createBoard, deleteBoard, getBoards, getColumns } from 'services/api';
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
      localStorage.setItem('activeBoardTitle', action.payload);
    },
    resetActiveBoard(state) {
      state.activeBoard = {} as IBoard;
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
    builder.addCase(createBoard.fulfilled, (state) => {
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
  // deleteBoard,
  // addColumn,
  // deleteColumn,
  // addTask,
  // deleteTask,
  // setTaskCounter,
} = boardsSlice.actions;
