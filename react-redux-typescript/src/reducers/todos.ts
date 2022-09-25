import { Todo, ActionTypes, ToDoActions } from '../actions';

export const todosReducer = (
  state: Todo[] = [],
  action: ToDoActions
): Todo[] => {
  switch (action.type) {
    case ActionTypes.fetchToDosSuccess:
      return action.payload;
    case ActionTypes.deleteToDo:
      return state.filter((todo: Todo) => todo.id !== action.payload);
    default:
      return state;
  }
};
