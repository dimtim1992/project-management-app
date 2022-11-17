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
  name: 'boards',
  initialState,
  reducers: {
    addBoard(state, action) {
      state.userBoards.push(action.payload);
    },
    deleteBoard(state, action) {},
    addColumn(state, action) {},
    deleteColumn(state, action) {},
    addTask(state, action) {},
    deleteTask(state, action) {},
    setTaskCounter(state, action) {},
  },
});

export default boardsSlice.reducer;
export const { addBoard } = boardsSlice.actions;
