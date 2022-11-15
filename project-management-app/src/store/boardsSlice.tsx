import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userBoards: [
    {
      title: 'test',
      owner: 'test',
      users: ['test'],
    },
    {
      title: 'test2',
      owner: 'test2',
      users: ['test2'],
    },
  ],
  column: [{}],
};

const boardsSlice = createSlice({
  name: 'appBoards',
  initialState,
  reducers: {
    setBoard(state, action) {
      state.userBoards.push(action.payload);
    },
  },
});

export default boardsSlice.reducer;
export const { setBoard } = boardsSlice.actions;
