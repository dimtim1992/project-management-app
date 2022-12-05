/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectLang } from 'pages/langPage/langPage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getBoards,
  getColumns,
  getTasksSet,
  patchColumn,
  patchTask,
  putColumns,
} from 'services/api';
import {
  setColumnOrder,
  setColumnToBeDeleted,
  setDeleteToggle,
  setTasks,
  setTasks2,
  setTaskToBeDeleted,
  toggleAddColumnModal,
  toggleAddTaskModal,
  editColumnTitle,
  toggleEditTaskModal,
  setEditTask,
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
import Button from 'components/button';

export const Board = () => {
  const activeBoard = useSelector(selectors.activeBoardSelector);
  const saveTitle = localStorage.getItem('activeBoardTitle');
  const columns = useSelector(selectors.columnsSelector);
  const langKey = useSelector(selectors.langSelector);
  const patchedTasks = useSelector(selectors.patchedTasksSelector);
  const editedColumnTitle = useSelector(selectors.editColumnTitleSelector);
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
      if (patchedTasks.length > 0) {
        dispatch(patchTask(patchedTasks));
      }
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
      const items = Object.entries(columns).map((columns) => columns[1]);
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
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = sourceColumn.items;
        const newSourceItems = sourceColumn.items.filter((item, index) => index !== source.index);
        const destItems = destColumn.items;
        const removed = sourceItems[source.index];
        const newDestItems = [...destItems, removed];
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
        const taskSourceOrders = [] as { _id: string; order: number; columnId: string }[];
        const taskDestOrders = [] as { _id: string; order: number; columnId: string }[];
        newSourceItems.map((task: ITask, index: number) => {
          taskSourceOrders.push({ _id: task._id, order: index, columnId: sourceColumn._id });
        });
        newDestItems.map((task: ITask, index: number) => {
          taskDestOrders.push({ _id: task._id, order: index, columnId: destColumn._id });
        });
        // dispatch(putTask({ newColumnId: destination.droppableId, task: newOrderedItem }));
        dispatch(patchTask([...taskSourceOrders, ...taskDestOrders]));
      } else {
        dispatch(setTasks2({ source: source, destination: destination }));
      }
    }
  };

  const [newTitle, setNewTitle] = useState('');

  return (
    <div className={style.boardContainer}>
      <div className={style.header}>
        <div className={style.title}>
          <div>
            <h2>{saveTitle ? saveTitle.split('&')[0] : activeBoard.title.split('&')[0]}</h2>
          </div>
          <div>
            <h3>{saveTitle ? saveTitle.split('&')[1] : activeBoard.title.split('&')[1]}</h3>
          </div>
        </div>
        <Button event={openModal} name={lang.board.addColumnButton} />
      </div>
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
                        <div
                          onClick={() => {
                            dispatch(editColumnTitle(columnId));
                            setNewTitle(column.title);
                          }}
                          className={style.columnTitle}
                        >
                          {editedColumnTitle === column._id ? (
                            <div>
                              <input
                                defaultValue={column.title}
                                onChange={(e) => setNewTitle(e.target.value)}
                                autoFocus
                                className={style.columnTitleInput}
                              ></input>
                              <span
                                className={style.editButtons}
                                onClick={() => {
                                  dispatch(putColumns({ column: column, title: newTitle }));
                                }}
                              >
                                ok
                              </span>
                              <span
                                className={style.editButtons}
                                onClick={() => {
                                  dispatch(putColumns({ column: column, title: newTitle }));
                                }}
                              >
                                x
                              </span>
                            </div>
                          ) : (
                            column.title
                          )}
                        </div>
                        <Button
                          event={() => openTaskModal(column._id)}
                          name={lang.board.addTaskButton}
                        />
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
                                              onClick={() => {
                                                dispatch(toggleEditTaskModal(true));
                                                dispatch(setEditTask(item));
                                              }}
                                            >
                                              <div>{item.title}</div>
                                              <div>{item.description}</div>
                                              <Button
                                                event={(e) => {
                                                  e.stopPropagation();
                                                  onDeleteTaskInit(column._id, item._id);
                                                }}
                                                name={lang.board.deleteTaskButton}
                                              />
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
                        <Button
                          event={() => onDeleteColumnInit(column._id)}
                          name={lang.board.deleteColumnButton}
                        />
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
