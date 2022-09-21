import { UserProps } from './interfaces/UserProps';
import { Attributes } from '../../core/models/Attributes';
import { Collection } from '../../core/models/Collection';
import { Eventing } from '../../core/models/Eventing';
import { Model } from '../../core/models/Model';
import { Sync } from '../../core/models/Sync';

const API = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new Sync<UserProps>(API)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(API, User.buildUser);
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
    this.trigger('change');
  }
}
