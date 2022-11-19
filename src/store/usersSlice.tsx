import { createSlice } from '@reduxjs/toolkit';
import { getUsers, signIn } from 'services/api';
import { IUser } from 'types/types';

const initialState = {
  signInLogin: '', //Логин который используется при авторизации
  users: [] as IUser[], //Все юзеры которые зарегистрированы
  user: {}, //Активный юзер здесь можно брать логин и id
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
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, () => {
      console.log('pending');
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      localStorage.setItem('userToken', payload);
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
  },
});

export default usersSlice.reducer;
export const { setUser, setSignInLogin } = usersSlice.actions;
