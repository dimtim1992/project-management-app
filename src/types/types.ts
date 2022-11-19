import { useDispatch } from 'react-redux';
import { store } from 'store/store';

export type State = {
  users: UsersState;
  boards: BoardsState;
};

export type UsersState = {
  signInLogin: string;
  users: IUser[];
  user: IUser;
  isAuthorized: boolean;
};

export type BoardsState = {
  userBoards: IBoard[];
  userColumns: IColumn[];
  newBoardName: string;
  newBoardDescription: string;
  openAddBoardModal: boolean;
};

export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface IFile {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface IPoint {
  _id: string;
  title: string;
  taskId: number;
  boardId: string;
  done: boolean;
}

export type myData = {
  data?: {
    token: string;
  };
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
