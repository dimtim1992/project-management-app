import { State } from 'types/types';

export const boardsSelector = (state: State) => state.boards.userBoards;
