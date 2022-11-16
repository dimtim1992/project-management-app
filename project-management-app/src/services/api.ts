import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const basicUrl = 'https://final-task-backend-production-2b03.up.railway.app/';

const signUpUrl = 'auth/signup';
const signInUrl = 'auth/signin';
const usersUrl = 'users';
// const boardsUrl = 'boards';

export const signUp = createAsyncThunk(
  'boards/signUp',
  async (info: { name: string; login: string; password: string }) => {
    return axios
      .post(`${basicUrl}${signUpUrl}`, info)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
);

export const signIn = createAsyncThunk(
  'boards/signIn',
  async (info: { login: string; password: string }) => {
    return axios
      .post(`${basicUrl}${signInUrl}`, info)
      .then(function (response) {
        localStorage.setItem('userToken', response.data.token);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
);

export const getUsers = createAsyncThunk('boards/getUsers', async () => {
  return axios
    .get(`${basicUrl}${usersUrl}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

export const userDelete = createAsyncThunk('boards/getUsers', async (id: string) => {
  return axios
    .delete(`${basicUrl}${usersUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});
