import { CollectionView } from '../../../core/views/CollectionView';
import { UserProps } from '../interfaces/UserProps';
import { User } from '../User';
import { UserDetails } from './UserDetails';

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserDetails(itemParent, model).render();
  }
}
