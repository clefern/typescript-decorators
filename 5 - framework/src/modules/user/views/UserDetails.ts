import { HtmlRenderer } from '../../../core/views/HtmlRenderer';
import { UserProps } from '../interfaces/UserProps';
import { User } from '../User';

export class UserDetails extends HtmlRenderer<User, UserProps> {
  template(): string {
    const { name, age } = this.model.getAllData();
    return `
      <div>
        <h3>User Details</h3>
        <div>Age: ${age}</div>
        <div>Name: ${name}</div>
      </div>
    `;
  }
}
