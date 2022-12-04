/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectLang } from 'pages/langPage/langPage';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBoards, getColumns, getTasksSet, patchColumn } from 'services/api';
import {
  setColumnOrder,
  setColumnToBeDeleted,
  setDeleteToggle,
  setTasks,
  setTasks2,
  setTaskToBeDeleted,
  toggleAddColumnModal,
  toggleAddTaskModal,
} from 'store/boardsSlice';
import * as selectors from 'store/selectors';
import { IColumn, useAppDispatch } from 'types/types';
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
  const saveTitle = localStorage.getItem('activeBoardTitle');
  const columns = useSelector(selectors.columnsSelector);
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
    const f = async () => {
      dispatch(getBoards);
      await dispatch(getColumns(saveId()));
      await dispatch(getTasksSet(saveId()));
    };
    f();
    return function cleanup() {
      // dispatch(cleanUserColumn());
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

  const openModal = () => {
    dispatch(toggleAddColumnModal(true));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    if (type === 'column') {
      const items = Object.entries(columns).map(([columnId, column], index) => column);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      const columnOrders = [] as { _id: string; order: number }[];
      items.map((column: IColumn, index: number) => {
        columnOrders.push({ _id: column._id, order: index });
      });
      dispatch(setColumnOrder(items));
      dispatch(patchColumn(columnOrders));
    }
    if (type !== 'column') {
      if (source.droppableId !== destination.droppableId) {
        dispatch(setTasks({ source: source, destination: destination }));
        // const sourceColumn = columns[source.droppableId];
        // const destColumn = columns[destination.droppableId];
        // const sourceItems = sourceColumn.items;
        // const destItems = destColumn.items;
        // const removed = sourceItems[source.index];
        // const newOrderedItem = {
        //   _id: removed._id,
        //   title: removed.title,
        //   order: destination.index,
        //   boardId: removed.boardId,
        //   columnId: destination.droppableId,
        //   description: removed.description,
        //   userId: removed.userId,
        //   users: removed.users,
        // };
        // dispatch(putTask({ newColumnId: destination.droppableId, task: newOrderedItem }));
        // patchTask(reordered);
      } else {
        dispatch(setTasks2({ source: source, destination: destination }));
      }
    }
  };

  console.log(columns);

  return (
    <div className={style.boardContainer}>
      <h2>{saveTitle ? saveTitle.split('&')[0] : activeBoard.title.split('&')[0]}</h2>
      <p>{saveTitle ? saveTitle.split('&')[1] : activeBoard.title.split('&')[1]}</p>
      <button onClick={openModal}>{lang.board.addColumnButton}</button>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId="droppable" direction="horizontal" type="column">
          {(provided: DroppableProvided) => (
            <div
              className={style.boardWrapper}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Draggable key={columnId} draggableId={columnId} index={index}>
                    {(provided: DraggableProvided) => (
                      <div
                        className={style.column}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div>{column.title}</div>
                        <button onClick={() => openTaskModal(column._id)}>
                          {lang.board.addTaskButton}
                        </button>
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={style.droppable}
                              >
                                {column.items &&
                                  column.items.map((item, index) => {
                                    return (
                                      <Draggable
                                        key={item._id}
                                        draggableId={item._id}
                                        index={index}
                                      >
                                        {(provided) => {
                                          return (
                                            <div
                                              className={style.task}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <div>{item.title}</div>
                                              <div>{item.description}</div>
                                              <button
                                                onClick={() =>
                                                  onDeleteTaskInit(column._id, item._id)
                                                }
                                              >
                                                {lang.board.deleteTaskButton}
                                              </button>
                                            </div>
                                          );
                                        }}
                                      </Draggable>
                                    );
                                  })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
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
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Board;
