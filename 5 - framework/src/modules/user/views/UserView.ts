import { HtmlRenderer } from '../../../core/views/HtmlRenderer';
import { UserProps } from '../interfaces/UserProps';
import { User } from '../User';
import { UserDetails } from './UserDetails';
import { UserForm } from './UserForm';

export class UserView extends HtmlRenderer<User, UserProps> {
  regionsToBeMapped(): { [key: string]: string } {
    return {
      userDetails: '.user-details',
      userForm: '.user-form',
    };
  }

  /**
   * This method will be called automatically by render from HtmlRenderer
   */
  onRender(): void {
    new UserDetails(this.regions.userDetails, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  template(): string {
    return `
      <div class="user-view">
        <div class="user-details"></div>
        <div class="user-form"></div>
        <div class="user-list"></div>
      </div>
    `;
  }
}
