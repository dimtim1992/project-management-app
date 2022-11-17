import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import boardsReducer from './boardsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    boards: boardsReducer,
  },
});
