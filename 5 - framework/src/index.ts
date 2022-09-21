import { User } from './modules/user/User';
import axios from 'axios';
import { Collection } from './core/models/Collection';
import { UserProps } from './modules/user/interfaces/UserProps';
import { UserForm } from './modules/user/views/UserForm';
import { UserDetails } from './modules/user/views/UserDetails';
import { UserView } from './modules/user/views/UserView';
import { UserList } from './modules/user/views/UserList';

const user = User.buildUser({ name: 'Amanda', age: 40 });

user.on('save', () => {
  console.log('save #1', user);
});

user.on('change', () => {
  console.log('change #1', user);
});

// console.log(user);

// console.log(user.getAllData());

// database json server
// user.save();
// setTimeout(() => {
//   user.fetch();
// }, 4000);

// const collection = User.buildUserCollection();
// collection.on('change', () => {
//   console.log('change #1', collection);
// });

// collection.fetch();
// console.log('user', { ...user });
const parent = document.getElementById('root')!;
// const userDetails = new UserDetails(parent, user);
// userDetails.render();

// const userForm = new UserForm(parent, user);
// userForm.render();

// const userView = new UserView(parent, user);
// userView.render();

// console.log(userView);

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);
users.on('change', () => {
  const root = document.getElementById('root');
  if (root) {
    new UserList(root, users).render();
  }
});
users.fetch();
