import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userBoards: [{}],
  userColumns: [{}],
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
    // deleteBoard(state, action) {},
    // addColumn(state, action) {},
    // deleteColumn(state, action) {},
    // addTask(state, action) {},
    // deleteTask(state, action) {},
    // setTaskCounter(state, action) {},
  },
});

export default boardsSlice.reducer;
export const {
  toggleAddBoardModal,
  addBoard,
  // deleteBoard,
  // addColumn,
  // deleteColumn,
  // addTask,
  // deleteTask,
  // setTaskCounter,
} = boardsSlice.actions;
