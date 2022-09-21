import { HtmlRenderer } from '../../../core/views/HtmlRenderer';
import { UserProps } from '../interfaces/UserProps';
import { User } from '../User';

export class UserForm extends HtmlRenderer<User, UserProps> {
  template(): string {
    const { name, age } = this.model.getAllData();

    return `
      <div>
        <h3>User Form</h3>
        <input placeholder="${name}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
      console.log(this.model.getAllData());
      console.log(this.model.get('name'));
      this.model.trigger('change');
    }
  };

  onSaveClick = (): void => {
    this.model.save();
  };
}
