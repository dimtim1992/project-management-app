import { State } from 'types/types';

export const isAuthorizedSelector = (state: State) => state.users.isAuthorized;
export const idSelector = (state: State) => state.users.user._id;
export const nameSelector = (state: State) => state.users.user.name;
export const loginSelector = (state: State) => state.users.user.login;
export const signInLoginSelector = (state: State) => state.users.signInLogin;
export const langSelector = (state: State) => state.users.lang;

export const activeBoardSelector = (state: State) => state.boards.activeBoard;
export const boardsSelector = (state: State) => state.boards.userBoards;
export const newBoardTitleSelector = (state: State) => state.boards.newBoardTitle;
export const newBoardDescriptionSelector = (state: State) => state.boards.newBoardDescription;
export const newColumnTitleSelector = (state: State) => state.boards.newColumnTitle;
export const newTaskTitleSelector = (state: State) => state.boards.newTaskTitle;
export const newTaskDescriptionSelector = (state: State) => state.boards.newTaskDescription;
export const columnsSelector = (state: State) => state.boards.userColumns;
export const tasksSelector = (state: State) => state.boards.userTasks;
export const addBoardsModalSelector = (state: State) => state.boards.openAddBoardModal;
export const addColumnsModalSelector = (state: State) => state.boards.openAddColumnModal;
export const addTaskModalSelector = (state: State) => state.boards.openAddTaskModal;
export const loadingSelector = (state: State) => state.boards.isLoading;
export const deleteToggleSelector = (state: State) => state.boards.deleteToggle;
export const taskToBeDeletedSelector = (state: State) => state.boards.taskToBeDeleted;
export const columnToBeDeletedSelector = (state: State) => state.boards.columnToBeDeleted;
export const boardToBeDeletedSelector = (state: State) => state.boards.boardToBeDeleted;
