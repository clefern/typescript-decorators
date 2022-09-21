import { UserProps } from '../../modules/user/interfaces/UserProps';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    fetch(this.rootUrl)
      .then((response) => response.json())
      .then((json) => {
        json.forEach((value: K) => {
          const instance = this.deserialize(value);
          this.models.push(instance);
        });
        this.trigger('change');
      });
  }
}
