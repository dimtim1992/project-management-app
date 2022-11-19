import { createSlice } from '@reduxjs/toolkit';
import { createBoard, getBoards } from 'services/api';
import { BoardsState, IBoard } from 'types/types';

const initialState: BoardsState = {
  userBoards: [] as IBoard[],
  userColumns: [],
  newBoardName: '',
  newBoardDescription: '',
  openAddBoardModal: false,
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
    builder.addCase(createBoard.pending, () => {
      console.log('pending');
    });
    builder.addCase(createBoard.fulfilled, () => {
      console.log('fulfilled');
    });
    builder.addCase(getBoards.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.userBoards = payload;
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
