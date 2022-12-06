import { createSlice } from '@reduxjs/toolkit';
import { getUsers, signIn, userDelete, userUpdate } from 'services/api';
import { IUser } from 'types/types';

const initialState = {
  signInLogin: '',
  signInPassword: '',
  users: [] as IUser[],
  user: {} as IUser,
  isAuthorized: !!localStorage.getItem('userId'),
  userLoading: '',
  lang: 'eng',
  isLoading: false,
  userProfile: {
    name: '',
    login: '',
    password: '',
  },
  isError: false,
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
    setSignInPassword(state, action) {
      state.signInPassword = action.payload;
    },
    logOut(state) {
      state.isAuthorized = false;
      state.user = {} as IUser;
      state.userProfile = {
        name: '',
        login: '',
        password: '',
      };
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userLogin');
      localStorage.removeItem('userPassword');
      localStorage.removeItem('activeBoardTitle');
      localStorage.removeItem('activeColumn');
      localStorage.removeItem('activeBoardId');
    },
    setLang(state, action) {
      state.lang = action.payload;
    },
    setUserName(state, action) {
      state.userProfile.name = action.payload;
    },
    setUserLogin(state, action) {
      state.userProfile.login = action.payload;
    },
    setUserPassword(state, action) {
      state.userProfile.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      localStorage.setItem('userToken', payload);
      state.isAuthorized = true;
      state.isLoading = false;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.user = payload.filter((user: IUser) => user.login === state.signInLogin)[0];
      localStorage.setItem('userId', state.user._id);
      state.userProfile.name = state.user.name;
      state.userProfile.login = state.user.login;
      state.userProfile.password = state.signInPassword;
      localStorage.setItem('userName', state.userProfile.name);
      localStorage.setItem('userLogin', state.userProfile.login);
      localStorage.setItem('userPassword', state.userProfile.password);
      state.signInLogin = '';
      state.signInPassword = '';
      state.isLoading = false;
    });
    builder.addCase(userDelete.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userDelete.fulfilled, (state, { payload }) => {
      state.userLoading = 'fulfilled';
      if ((payload._id = localStorage.getItem('userId'))) {
        state.isAuthorized = false;
        state.user = {} as IUser;
        state.signInLogin = '';
        state.users = state.users.filter((user) => user._id !== payload._id);
        localStorage.removeItem('userId');
        state.isLoading = false;
      }
    });
    builder.addCase(userUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userUpdate.fulfilled, (state, { payload }) => {
      state.userProfile.name = payload.name;
      state.userProfile.login = payload.login;
      localStorage.setItem('userName', state.userProfile.name);
      localStorage.setItem('userLogin', state.userProfile.login);
      localStorage.setItem('userPassword', state.userProfile.password);
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
export const {
  setUser,
  setSignInLogin,
  setSignInPassword,
  logOut,
  setLang,
  setUserName,
  setUserLogin,
  setUserPassword,
} = usersSlice.actions;
