import { createSlice, current } from '@reduxjs/toolkit';
import {
  createBoard,
  createColumn,
  createTask,
  deleteBoard,
  deleteColumn,
  deleteTask,
  getBoards,
  getColumns,
  getTasksSet,
  patchColumn,
  patchTask,
  putColumns,
  putTask,
} from 'services/api';
import { BoardsState, IBoard, IColumn, IPatchTask, ITask, w } from 'types/types';

const initialState: BoardsState = {
  userBoards: [] as IBoard[],
  userColumns: {} as w,
  userTasks: [] as ITask[],
  newBoardTitle: '',
  newBoardDescription: '',
  newColumnTitle: '',
  newTaskTitle: '',
  newTaskDescription: ' ',
  openAddBoardModal: false,
  openAddColumnModal: false,
  openAddTaskModal: false,
  openEditTaskModal: false,
  boardLoading: '',
  activeBoard: {} as IBoard,
  isLoading: false,
  deleteToggle: false,
  taskToBeDeleted: null,
  columnToBeDeleted: null,
  boardToBeDeleted: null,
  patchedTasks: [] as IPatchTask[],
  editedColumnTitle: '',
  editTask: {} as ITask,
  isError: false,
  searchResults: [] as ITask[],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    toggleAddBoardModal(state, action) {
      state.openAddBoardModal = action.payload;
    },
    toggleAddColumnModal(state, action) {
      state.openAddColumnModal = action.payload;
    },
    toggleAddTaskModal(state, action) {
      state.openAddTaskModal = action.payload;
    },
    toggleEditTaskModal(state, action) {
      state.openEditTaskModal = action.payload;
    },
    addBoard(state, action) {
      state.userBoards.push(action.payload);
    },
    setNewBoardTitle(state, action) {
      state.newBoardTitle = action.payload;
    },
    setNewBoardDescription(state, action) {
      state.newBoardDescription = action.payload;
    },
    setNewColumnTitle(state, action) {
      state.newColumnTitle = action.payload;
    },
    setNewTaskTitle(state, action) {
      state.newTaskTitle = action.payload;
    },
    setNewTaskDescription(state, action) {
      state.newTaskDescription = action.payload;
    },
    setActiveBoard(state, action) {
      state.activeBoard = state.userBoards.filter((board) => board._id === action.payload)[0];
      localStorage.setItem('activeBoardId', action.payload);
      localStorage.setItem('activeBoardTitle', state.activeBoard.title);
    },
    resetActiveBoard(state) {
      state.activeBoard = {} as IBoard;
    },
    cleanUserColumn(state) {
      state.userColumns = {} as w;
    },
    setDeleteToggle(state, action) {
      state.deleteToggle = action.payload;
    },
    setTaskToBeDeleted(state, action) {
      state.taskToBeDeleted = action.payload;
    },
    setColumnToBeDeleted(state, action) {
      state.columnToBeDeleted = action.payload;
    },
    setBoardToBeDeleted(state, action) {
      state.boardToBeDeleted = action.payload;
    },
    setColumnOrder(state, action) {
      state.userColumns = action.payload;
    },
    setTaskOrder(state, action) {
      state.userTasks = action.payload;
    },
    setNewColumnIdForTask(state, action) {
      state.userTasks.map((task) => {
        if (task._id === action.payload.taskId) {
          task.columnId = action.payload.newColumnId;
        }
      });
    },
    setTasks(state, { payload }) {
      const sourceColumn = state.userColumns[payload.source.droppableId];
      const destColumn = state.userColumns[payload.destination.droppableId];
      const sourceItems = sourceColumn.items;
      const destItems = destColumn.items;
      const [removed] = sourceItems.splice(payload.source.index, 1);
      removed.columnId = payload.destination.droppableId;
      destItems.splice(payload.destination.index, 0, removed);
      state.userColumns = {
        ...state.userColumns,
        [payload.source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [payload.destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };

      const taskSourceOrders = [] as { _id: string; order: number; columnId: string }[];
      const taskDestOrders = [] as { _id: string; order: number; columnId: string }[];
      sourceItems.map((task: ITask, index: number) => {
        taskSourceOrders.push({
          _id: task._id,
          order: index,
          columnId: payload.source.droppableId,
        });
      });
      destItems.map((task: ITask, index: number) => {
        taskDestOrders.push({
          _id: task._id,
          order: index,
          columnId: payload.destination.droppableId,
        });
      });
      state.patchedTasks = [...taskSourceOrders, ...taskDestOrders];
    },
    setTasks2(state, { payload }) {
      const column = current(state.userColumns)[payload.source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(payload.source.index, 1);
      copiedItems.splice(payload.destination.index, 0, removed);
      state.userColumns = {
        ...current(state.userColumns),
        [payload.source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
      const taskOrders = [] as { _id: string; order: number; columnId: string }[];
      copiedItems.map((task: ITask, index: number) => {
        taskOrders.push({ _id: task._id, order: index, columnId: task.columnId });
      });
      state.patchedTasks = taskOrders;
    },
    editColumnTitle(state, { payload }) {
      state.editedColumnTitle = payload;
    },
    setEditTask(state, action) {
      state.editTask = action.payload;
    },
    setEditTaskTitle(state, action) {
      state.editTask.title = action.payload;
    },
    setEditTaskDescription(state, action) {
      state.editTask.description = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBoard.fulfilled, (state, { payload }) => {
      state.userBoards.push(payload);
      state.isLoading = false;
    });
    builder.addCase(createBoard.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(getBoards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBoards.fulfilled, (state, { payload }) => {
      state.userBoards = payload;
      state.isLoading = false;
    });
    builder.addCase(getBoards.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(deleteBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBoard.fulfilled, (state, { payload }) => {
      state.userBoards = state.userBoards.filter((item) => item._id !== payload._id);
      state.isLoading = false;
    });
    builder.addCase(deleteBoard.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(getColumns.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getColumns.fulfilled, (state, { payload }) => {
      payload.sort((a: IColumn, b: IColumn) => a.order - b.order);

      state.userColumns = Object.assign(
        {},
        ...payload.map((column: { _id: string }) => ({
          [column._id]: { ...column, items: [] as ITask[] },
        }))
      );
      state.isLoading = false;
    });
    builder.addCase(getColumns.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(createColumn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createColumn.fulfilled, (state, { payload }) => {
      state.userColumns[payload._id] = payload;
      state.isLoading = false;
    });
    builder.addCase(createColumn.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(patchColumn.pending, () => {
      // state.isLoading = true;
    });
    builder.addCase(patchColumn.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(patchColumn.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(deleteColumn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteColumn.fulfilled, (state, { payload }) => {
      delete state.userColumns[payload._id];
      state.isLoading = false;
    });
    builder.addCase(deleteColumn.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      if (state.userColumns[payload.columnId].items) {
        state.userColumns[payload.columnId].items.push(payload);
      } else {
        state.userColumns[payload.columnId].items = [payload];
      }
      state.isLoading = false;
    });
    builder.addCase(createTask.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(patchTask.pending, () => {
      // state.isLoading = true;
    });
    builder.addCase(patchTask.fulfilled, (state) => {
      state.patchedTasks = [] as IPatchTask[];
      state.isLoading = false;
    });
    builder.addCase(patchTask.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(getTasksSet.pending, () => {});
    builder.addCase(getTasksSet.fulfilled, (state, { payload }) => {
      payload.sort((a: ITask, b: ITask) => a.order - b.order);

      payload.map((item: ITask) => state.userColumns[item.columnId].items.push(item));
      state.isLoading = false;
    });
    builder.addCase(getTasksSet.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(deleteTask.pending, () => {});
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      if (state.userColumns[payload.columnId]) {
        state.userColumns[payload.columnId].items = state.userColumns[
          payload.columnId
        ].items.filter((task) => task._id !== payload._id);
      } else {
        return;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(putTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(putTask.fulfilled, (state, { payload }) => {
      state.userColumns[payload.columnId].items[payload.order] = payload;
      state.userColumns[payload.columnId].items = [
        ...state.userColumns[payload.columnId].items.filter((item) => {
          item._id !== payload.id;
        }),
        payload,
      ];
      state.isLoading = false;
    });
    builder.addCase(putTask.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(putColumns.fulfilled, (state, { payload }) => {
      state.userColumns[payload._id].title = payload.title;
      state.editedColumnTitle = '';
    });
    builder.addCase(putColumns.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default boardsSlice.reducer;
export const {
  toggleAddBoardModal,
  toggleAddColumnModal,
  toggleAddTaskModal,
  toggleEditTaskModal,
  addBoard,
  setNewBoardTitle,
  setNewBoardDescription,
  setNewColumnTitle,
  setNewTaskTitle,
  setNewTaskDescription,
  setActiveBoard,
  resetActiveBoard,
  cleanUserColumn,
  setDeleteToggle,
  setTaskToBeDeleted,
  setColumnToBeDeleted,
  setBoardToBeDeleted,
  setColumnOrder,
  setTaskOrder,
  setNewColumnIdForTask,
  setTasks,
  setTasks2,
  editColumnTitle,
  setEditTask,
  setEditTaskTitle,
  setEditTaskDescription,
  setSearchResults,
} = boardsSlice.actions;
