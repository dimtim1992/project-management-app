import { createSlice } from '@reduxjs/toolkit';
import { createBoard, deleteBoard, getBoards } from 'services/api';
import { BoardsState, IBoard } from 'types/types';

const initialState: BoardsState = {
  userBoards: [] as IBoard[],
  userColumns: [],
  newBoardName: '',
  newBoardDescription: '',
  openAddBoardModal: false,
  boardLoading: '',
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    toggleAddBoardModal(state, action) {
      state.openAddBoardModal = action.payload;
    },
    addBoard(state, action) {
      state.userBoards.push(action.payload);
    },
    setNewBoardName(state, action) {
      state.newBoardName = action.payload;
    },
    setNewBoardDescription(state, action) {
      state.newBoardDescription = action.payload;
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
      console.log(payload);
      state.userBoards = payload;
    });
    builder.addCase(deleteBoard.pending, (state) => {
      state.boardLoading = 'pending';
    });
    builder.addCase(deleteBoard.fulfilled, (state) => {
      state.boardLoading = 'fulfilled';
    });
  },
});

export default boardsSlice.reducer;
export const {
  toggleAddBoardModal,
  addBoard,
  setNewBoardName,
  setNewBoardDescription,
  // deleteBoard,
  // addColumn,
  // deleteColumn,
  // addTask,
  // deleteTask,
  // setTaskCounter,
} = boardsSlice.actions;
