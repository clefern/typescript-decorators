import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

export class Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then((response: { data: Todo }) => {
  const todo = response.data;
  console.log({ ...todo });
});
