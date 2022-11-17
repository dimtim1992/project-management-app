import { State } from 'types/types';

export const boardsSelector = (state: State) => state.boards.userBoards;
export const columnsSelector = (state: State) => state.boards.userColumns;
export const addBoardsModalSelector = (state: State) => state.boards.openAddBoardModal;
