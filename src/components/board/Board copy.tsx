// import { selectLang } from 'pages/langPage/langPage';
// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { getBoards, getColumns, getTasksSet, patchColumn, patchTask, putTask } from 'services/api';
// import {
//   cleanUserColumn,
//   setColumnOrder,
//   setColumnToBeDeleted,
//   setDeleteToggle,
//   setTaskOrder,
//   setTaskToBeDeleted,
//   toggleAddColumnModal,
//   toggleAddTaskModal,
// } from 'store/boardsSlice';
// import * as selectors from 'store/selectors';
// import { IColumn, ITask, useAppDispatch } from 'types/types';
// import {
//   DragDropContext,
//   Draggable,
//   DraggableProvided,
//   Droppable,
//   DroppableProvided,
//   DropResult,
// } from 'react-beautiful-dnd';
// import style from './Board.module.css';

// export const Board = () => {
//   const activeBoard = useSelector(selectors.activeBoardSelector);
//   const columns = useSelector(selectors.columnsSelector);
//   const tasks = useSelector(selectors.tasksSelector);
//   const saveTitle = localStorage.getItem('activeBoardTitle');
//   const langKey = useSelector(selectors.langSelector);
//   const lang = selectLang(langKey);

//   const dispatch = useAppDispatch();

//   // useEffect(() => {
//   //   const saveId = () => {
//   //     if (localStorage.getItem('activeBoardId')) {
//   //       return localStorage.getItem('activeBoardId');
//   //     }
//   //     return activeBoard._id;
//   //   };
//   //   dispatch(getBoards);
//   //   dispatch(getColumns(saveId()));
//   //   dispatch(getTasksSet(saveId()));

//   //   return function cleanup() {
//   //     dispatch(cleanUserColumn());
//   //   };
//   // }, [activeBoard._id, dispatch]);

//   const onDeleteTaskInit = (columnId: string, taskId: string) => {
//     dispatch(setDeleteToggle(true));
//     dispatch(
//       setTaskToBeDeleted({
//         boardId: activeBoard._id,
//         columnId: columnId,
//         taskId: taskId,
//       })
//     );
//   };

//   const onDeleteColumnInit = (columnId: string) => {
//     dispatch(setDeleteToggle(true));
//     dispatch(
//       setColumnToBeDeleted({
//         boardId: activeBoard._id,
//         columnId: columnId,
//       })
//     );
//   };

//   const openTaskModal = (id: string) => {
//     dispatch(toggleAddTaskModal(true));
//     localStorage.setItem('activeColumn', id);
//   };

//   const openModal = () => {
//     dispatch(toggleAddColumnModal(true));
//   };

//   const onDragEnd = async (result: DropResult) => {
//     if (!result.destination) return;
//     const { source, destination, type } = result;
//     if (type === 'column') {
//       const items = Array.from(columns);
//       const [reorderedItem] = items.splice(source.index, 1);
//       items.splice(destination.index, 0, reorderedItem);

//       const columnOrders = [] as { _id: string; order: number }[];
//       items.map((column: IColumn, index: number) => {
//         columnOrders.push({ _id: column._id, order: index });
//       });
//       dispatch(setColumnOrder(items));
//       dispatch(patchColumn(columnOrders));
//     }
//     if (source.droppableId !== destination.droppableId) {
//       console.log(result);
//       const items = Array.from(tasks);
//       const [reorderedItem] = items.splice(source.index, 1);
//       console.log('reorderedItem', reorderedItem);
//       const newOrderedItem = {
//         _id: reorderedItem._id,
//         title: reorderedItem.title,
//         order: destination.index,
//         boardId: reorderedItem.boardId,
//         columnId: destination.droppableId,
//         description: reorderedItem.description,
//         userId: reorderedItem.userId,
//         users: reorderedItem.users,
//       };

//   //     items.splice(destination.index, 0, newOrderedItem);
//   //     const taskOrders = [] as { _id: string; order: number; columnId: string }[];
//   //     items.map((task: ITask, index: number) => {
//   //       taskOrders.push({ _id: task._id, order: index + 1, columnId: task.columnId });
//   //     });
//   //     console.log(items);
//   //     console.log(taskOrders);
//   //     // dispatch(setTaskOrder(items));
//   //     await dispatch(putTask({ newColumnId: destination.droppableId, task: newOrderedItem }));
//   //     await dispatch(patchTask(taskOrders));
//   //   } else {
//   //     const items = Array.from(tasks);
//   //     const [reorderedItem] = items.splice(source.index, 1);
//   //     items.splice(destination.index, 0, reorderedItem);
//   //     const taskOrders = [] as { _id: string; order: number; columnId: string }[];
//   //     items.map((task: ITask, index: number) => {
//   //       taskOrders.push({ _id: task._id, order: task.order, columnId: task.columnId });
//   //     });
//   //     dispatch(setTaskOrder(items));
//   //     dispatch(patchTask(taskOrders));
//   //   }
//   // };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className={style.boardContainer}>
//         <h2>{saveTitle ? saveTitle.split('&')[0] : activeBoard.title.split('&')[0]}</h2>
//         <p>{saveTitle ? saveTitle.split('&')[1] : activeBoard.title.split('&')[1]}</p>
//         <button onClick={openModal}>{lang.board.addColumnButton}</button>
//         <Droppable droppableId="droppable" direction="horizontal" type="column">
//           {(provided: DroppableProvided) => (
//             <div
//               className={style.boardWrapper}
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {columns.map((column: IColumn, index: number) => {
//                 return (
//                   <Draggable key={columnId} draggableId={columnId} index={index}>
//                     {(provided: DraggableProvided) => (
//                       <div
//                         className={style.column}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         ref={provided.innerRef}
//                       >
//                         <div>{column.title}</div>
//                         <button onClick={() => openTaskModal(column._id)}>
//                           {lang.board.addTaskButton}
//                         </button>
//                         <Droppable droppableId={column._id} type="task">
//                           {(provided: DroppableProvided) => (
//                             <div
//                               className={style.taskWrapper}
//                               {...provided.droppableProps}
//                               ref={provided.innerRef}
//                             >
//                               {tasks.map((task: ITask, index: number) => {
//                                 if (task.columnId === column._id) {
//                                   return (
//                                     <Draggable key={task._id} draggableId={task._id} index={index}>
//                                       {(provided: DraggableProvided) => (
//                                         <div
//                                           className={style.task}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}
//                                           ref={provided.innerRef}
//                                         >
//                                           <div>{task.title}</div>
//                                           <div>{task.description}</div>
//                                           <button
//                                             onClick={() => onDeleteTaskInit(column._id, task._id)}
//                                           >
//                                             {lang.board.deleteTaskButton}
//                                           </button>
//                                         </div>
//                                       )}
//                                     </Draggable>
//                                   );
//                                 }
//                               })}
//                               {provided.placeholder}
//                             </div>
//                           )}
//                         </Droppable>
//                         <button
//                           onClick={() => {
//                             onDeleteColumnInit(column._id);
//                           }}
//                         >
//                           {lang.board.deleteColumnButton}
//                         </button>
//                       </div>
//                     )}
//                   </Draggable>
//                 );
//               })}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </div>
//     </DragDropContext>
//   );
// };

// export default Board;
