export type State = {
  users: { user: IUser };
  boards: { userBoards: IBoard[] };
};

export interface IUser {
  name: string;
  login: string;
  password: string;
}

export interface IBoard {
  title: string;
  owner: string;
  users: string[];
}
