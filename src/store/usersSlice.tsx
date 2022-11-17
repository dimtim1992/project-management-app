import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    login: '',
    password: '',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setUser } = usersSlice.actions;
