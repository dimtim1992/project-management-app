import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITask, IColumn } from 'types/types';

export const basicUrl = 'https://final-task-backend-production-2b03.up.railway.app/';

const signUpUrl = 'auth/signup';
const signInUrl = 'auth/signin';
const usersUrl = 'users/';
const boardsUrl = 'boards/';
const columnsUrl = '/columns/';
const columnsSetUrl = 'columnsSet/';
const tasksUrl = '/tasks/';
const tasksSetUrl = 'tasksSet/';

export const signUp = createAsyncThunk(
  'users/signUp',
  async (info: { name: string; login: string; password: string }) => {
    return axios
      .post(`${basicUrl}${signUpUrl}`, info)
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const signIn = createAsyncThunk(
  'users/signIn',
  async (info: { login: string; password: string }) => {
    return axios.post(`${basicUrl}${signInUrl}`, info).then((res) => res.data.token);
  }
);

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  return axios
    .get(`${basicUrl}${usersUrl}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      alert(error.response.data.message);
    });
});

export const userDelete = createAsyncThunk('users/deleteUsers', async (id: string | null) => {
  return axios
    .delete(`${basicUrl}${usersUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      alert(error.response.data.message);
    });
});

export const userUpdate = createAsyncThunk(
  'users/UpdateUser',
  async (info: {
    id: string | null;
    name: string | null;
    login: string | null;
    password: string | null;
  }) => {
    return axios
      .put(
        `${basicUrl}${usersUrl}/${info.id}`,
        {
          name: info.name,
          login: info.login,
          password: info.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const getBoards = createAsyncThunk('boards/getBoards', async () => {
  return axios
    .get(`${basicUrl}${boardsUrl}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      alert(error.response.data.message);
    });
});

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (info: { title: string; owner: string | null; users: string[] }) => {
    return await axios
      .post(`${basicUrl}${boardsUrl}`, info, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id: string) => {
  return axios
    .delete(`${basicUrl}${boardsUrl}${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      alert(error.response.data.message);
    });
});

export const createColumn = createAsyncThunk(
  'boards/createColumn',
  async (info: { title: string; order: number; boardId: string | null }) => {
    return axios
      .post(
        `${basicUrl}${boardsUrl}${info.boardId}${columnsUrl}`,
        { title: info.title, order: info.order },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const patchColumn = createAsyncThunk(
  'boards/patchColumn',
  async (info: { _id: string; order: number }[]) => {
    return axios
      .patch(`${basicUrl}${columnsSetUrl}`, info, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const getColumns = createAsyncThunk('boards/getColumns', async (boardId: string | null) => {
  return axios
    .get(`${basicUrl}${boardsUrl}${boardId}${columnsUrl}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      alert(error.response.data.message);
    });
});

export const putColumns = createAsyncThunk(
  'boards/putColumns',
  async (info: { column: IColumn; title: string }) => {
    return axios
      .put(
        `${basicUrl}${boardsUrl}${info.column.boardId}${columnsUrl}${info.column._id}`,
        {
          title: info.title,
          order: info.column.order,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const deleteColumn = createAsyncThunk(
  'boards/deleteColumn',
  async (info: { boardId: string; columnId: string } | null) => {
    return axios
      .delete(`${basicUrl}${boardsUrl}${info?.boardId}${columnsUrl}${info?.columnId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const createTask = createAsyncThunk(
  'boards/createTask',
  async (info: {
    boardId: string | null;
    columnId: string | null;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    users: string[];
  }) => {
    return axios
      .post(
        `${basicUrl}${boardsUrl}${info.boardId}${columnsUrl}${info.columnId}${tasksUrl}`,
        {
          title: info.title,
          order: info.order,
          description: info.description,
          userId: info.userId,
          users: info.users,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const patchTask = createAsyncThunk(
  'boards/patchTask',
  async (info: { _id: string; order: number; columnId: string }[]) => {
    return axios
      .patch(`${basicUrl}${tasksSetUrl}`, info, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const putTask = createAsyncThunk('boards/putTask', async (task: ITask) => {
  return axios
    .put(
      `${basicUrl}${boardsUrl}${task.boardId}${columnsUrl}${task.columnId}${tasksUrl}${task._id}`,
      {
        title: task.title,
        order: task.order,
        description: task.description,
        columnId: task.columnId,
        userId: task.userId,
        users: task.users,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      alert(error.response.data.message);
    });
});

export const getTasks = createAsyncThunk(
  'boards/getTasks',
  async (info: { boardId: string | null; columnId: string }) => {
    return axios
      .get(`${basicUrl}${boardsUrl}${info.boardId}${columnsUrl}${info.columnId}${tasksUrl}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const getTasksSet = createAsyncThunk(
  'boards/getTasksSet',
  async (boardId: string | null) => {
    return axios
      .get(`${basicUrl}${tasksSetUrl}${boardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const getTasksSetSearch = async (boardId: string | null) => {
  // return axios
  //   .get(`${basicUrl}${tasksSetUrl}${boardId}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  //     },
  //   })
  //   .then((res) => res.data)
  //   .catch((error) => {
  //     console.log(error);
  //   });
  const response = await axios.get(`${basicUrl}${tasksSetUrl}${boardId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });

  return response.data;
};

export const deleteTask = createAsyncThunk(
  'boards/deleteTask',
  async (info: { boardId: string; columnId: string; taskId: string } | null) => {
    return axios
      .delete(
        `${basicUrl}${boardsUrl}${info?.boardId}${columnsUrl}${info?.columnId}${tasksUrl}${info?.taskId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const getTasksBySearch = async (searchValue: string) => {
  return axios
    .get(`${basicUrl}tasksSet?search=${searchValue}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      alert(error.response.data.message);
    });
};

export const getBoardsSearch = async () => {
  // return axios
  //   .get(`${basicUrl}${boardsUrl}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  //     },
  //   })
  //   .then((res) => res.data)
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const response = await axios.get(`${basicUrl}${boardsUrl}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });

  return response.data;
};
