import { selectLang } from 'pages/langPage/langPage';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBoards, getColumns, getTasksSet, patchColumn } from 'services/api';
import {
  cleanUserColumn,
  setColumnOrder,
  setColumnToBeDeleted,
  setDeleteToggle,
  setTaskToBeDeleted,
  toggleAddColumnModal,
  toggleAddTaskModal,
} from 'store/boardsSlice';
import * as selectors from 'store/selectors';
import { IColumn, ITask, useAppDispatch } from 'types/types';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import style from './Board.module.css';

export const Board = () => {
  const activeBoard = useSelector(selectors.activeBoardSelector);
  const columns = useSelector(selectors.columnsSelector);
  const tasks = useSelector(selectors.tasksSelector);
  const saveTitle = localStorage.getItem('activeBoardTitle');
  const langKey = useSelector(selectors.langSelector);
  const lang = selectLang(langKey);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const saveId = () => {
      if (localStorage.getItem('activeBoardId')) {
        return localStorage.getItem('activeBoardId');
      }
      return activeBoard._id;
    };
    dispatch(getBoards);
    dispatch(getColumns(saveId()));
    dispatch(getTasksSet(saveId()));

    return function cleanup() {
      dispatch(cleanUserColumn());
    };
  }, [activeBoard._id, dispatch]);

  const onDeleteTaskInit = (columnId: string, taskId: string) => {
    dispatch(setDeleteToggle(true));
    dispatch(
      setTaskToBeDeleted({
        boardId: activeBoard._id,
        columnId: columnId,
        taskId: taskId,
      })
    );
  };

  const RenderColumn = (column: IColumn, index: number) => {
    const RenderTask = (task: ITask) => {
      if (task.columnId === column._id) {
        return (
          <div className={style.task} key={task._id}>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <button onClick={() => onDeleteTaskInit(column._id, task._id)}>
              {lang.board.deleteTaskButton}
            </button>
          </div>
        );
      }
    };

    const onDeleteColumnInit = (columnId: string) => {
      dispatch(setDeleteToggle(true));
      dispatch(
        setColumnToBeDeleted({
          boardId: activeBoard._id,
          columnId: columnId,
        })
      );
    };

    const openTaskModal = (id: string) => {
      dispatch(toggleAddTaskModal(true));
      localStorage.setItem('activeColumn', id);
    };

    return (
      <Draggable key={column._id} draggableId={column._id} index={index}>
        {(provided: DraggableProvided) => (
          <div
            className={style.column}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div>{column.title}</div>
            <button onClick={() => openTaskModal(column._id)}>{lang.board.addTaskButton}</button>
            <div className={style.taskWrapper}>{tasks.map(RenderTask)}</div>
            <button
              onClick={() => {
                onDeleteColumnInit(column._id);
              }}
            >
              {lang.board.deleteColumnButton}
            </button>
          </div>
        )}
      </Draggable>
    );
  };

  const openModal = () => {
    dispatch(toggleAddColumnModal(true));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(columns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const columnOrders = [] as { _id: string; order: number }[];
    items.map((column: IColumn, index: number) => {
      columnOrders.push({ _id: column._id, order: index });
    });
    dispatch(setColumnOrder(items));
    dispatch(patchColumn(columnOrders));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={style.boardContainer}>
        <h2>{saveTitle ? saveTitle.split('&')[0] : activeBoard.title.split('&')[0]}</h2>
        <p>{saveTitle ? saveTitle.split('&')[1] : activeBoard.title.split('&')[1]}</p>
        <button onClick={openModal}>{lang.board.addColumnButton}</button>

        <Droppable droppableId="droppable" direction="horizontal" type="column">
          {(provided: DroppableProvided) => (
            <div
              className={style.boardWrapper}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map(RenderColumn)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;
