import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes, DeleteToDoAction, FetchToDosAction, Todo } from './types';

const URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchToDos = () => {
  return async (dispatch: Dispatch) => {
    // dispatch<{ type: ActionTypes.fetchToDos }>({
    //   type: ActionTypes.fetchToDos,
    // });

    const response = await axios.get<Todo[]>(URL);
    console.log({
      response,
    });

    dispatch<FetchToDosAction>({
      type: ActionTypes.fetchToDosSuccess,
      payload: response.data,
    });
  };
};

export const deleteToDo = (id: number): DeleteToDoAction => {
  return {
    type: ActionTypes.deleteToDo,
    payload: id,
  };
};
