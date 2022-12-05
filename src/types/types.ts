import { useDispatch } from 'react-redux';
import { store } from 'store/store';

export type State = {
  users: UsersState;
  boards: BoardsState;
};

export type UsersState = {
  signInLogin: string;
  signInPassword: string;
  users: IUser[];
  user: IUser;
  isAuthorized: boolean;
  userLoading: string;
  lang: string;
  isLoading: boolean;
  userProfile: {
    name: string;
    login: string;
    password: string;
  };
};

export type BoardsState = {
  userBoards: IBoard[];
  userColumns: w;
  userTasks: ITask[];
  newBoardTitle: string;
  newBoardDescription: string;
  newColumnTitle: string;
  newTaskTitle: string;
  newTaskDescription: string;
  openAddBoardModal: boolean;
  openAddColumnModal: boolean;
  openAddTaskModal: boolean;
  openEditTaskModal: boolean;
  boardLoading: string;
  activeBoard: IBoard;
  isLoading: boolean;
  deleteToggle: boolean;
  taskToBeDeleted: {
    boardId: string;
    columnId: string;
    taskId: string;
  } | null;
  columnToBeDeleted: {
    boardId: string;
    columnId: string;
  } | null;
  boardToBeDeleted: string | null;
  patchedTasks: IPatchTask[];
  editedColumnTitle: string;
  editTask: ITask;
};

export interface IPatchTask {
  _id: string;
  order: number;
  columnId: string;
}

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

export interface ISignUp {
  name: string;
  login: string;
  password: string;
}

export interface ISignIn {
  login: string;
  password: string;
}

export type myData = {
  data?: {
    token: string;
  };
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export interface w {
  [u: string]: newColumn;
}

export interface newColumn extends IColumn {
  items: ITask[];
}
