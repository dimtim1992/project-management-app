import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const basicUrl = 'https://final-task-backend-production-2b03.up.railway.app/';

const signUpUrl = 'auth/signup';
const signInUrl = 'auth/signin';
const usersUrl = 'users/';
const boardsUrl = 'boards/';

export const signUp = createAsyncThunk(
  'users/signUp',
  async (info: { name: string; login: string; password: string }) => {
    return axios.post(`${basicUrl}${signUpUrl}`, info);
  }
);

export const signIn = createAsyncThunk(
  'users/signIn',
  async (info: { login: string; password: string }) => {
    return axios.post(`${basicUrl}${signInUrl}`, info).then((res) => res.data.token);
  }
);

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  return axios
    .get(`${basicUrl}${usersUrl}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.response.data);
    });
});

export const userDelete = createAsyncThunk('users/deleteUsers', async (id: string) => {
  return axios
    .delete(`${basicUrl}${usersUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .catch((error) => {
      console.log(error.response.data);
    });
});

export const getBoards = createAsyncThunk('boards/getBoards', async () => {
  return axios
    .get(`${basicUrl}${boardsUrl}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
});

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (info: { title: string; owner: string | null; users: string[] }) => {
    return axios
      .post(`${basicUrl}${boardsUrl}`, info, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  }
);

export const deleteBoard = createAsyncThunk('boards/createBoard', async (id: string) => {
  return axios
    .delete(`${basicUrl}${boardsUrl}${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
});
