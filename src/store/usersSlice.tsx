import { createSlice } from '@reduxjs/toolkit';
import { getUsers, signIn, userDelete } from 'services/api';
import { IUser } from 'types/types';

const initialState = {
  signInLogin: '',
  users: [] as IUser[],
  user: {} as IUser,
  isAuthorized: !!localStorage.getItem('userId'),
  userLoading: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setSignInLogin(state, action) {
      state.signInLogin = action.payload;
    },
    logOut(state) {
      state.isAuthorized = false;
      state.user = {} as IUser;
      // localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, () => {
      console.log('pending');
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      localStorage.setItem('userToken', payload);
      console.log(localStorage.getItem('userToken'));
      localStorage.setItem('userId', state.user._id);
      console.log(localStorage.getItem('userId'));
      state.isAuthorized = true;
      console.log('fulfilled');
    });
    builder.addCase(getUsers.pending, () => {
      console.log('pending');
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      console.log(state.users);
      state.user = state.users.filter((user) => user.login === state.signInLogin)[0];
      console.log(state.user);
    });
    builder.addCase(userDelete.pending, (state) => {
      state.userLoading = 'pending';
    });
    builder.addCase(userDelete.fulfilled, (state, { payload }) => {
      state.userLoading = 'fulfilled';
      if ((payload._id = localStorage.getItem('userId'))) {
        state.isAuthorized = false;
        state.user = {} as IUser;
        localStorage.removeItem('userId');
      }
    });
  },
});

export default usersSlice.reducer;
export const { setUser, setSignInLogin, logOut } = usersSlice.actions;
