export enum ActionTypes {
  fetchToDos = 'FETCH_TODOS',
  fetchToDosSuccess = 'FETCH_TODOS_SUCCESS',
  deleteToDo = 'DELETE_TODO',
}

export type ToDoActions = FetchToDosAction | DeleteToDoAction;

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface FetchToDosAction {
  type: ActionTypes.fetchToDosSuccess;
  payload: Todo[];
}

export interface DeleteToDoAction {
  type: ActionTypes.deleteToDo;
  payload: number;
}
