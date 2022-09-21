import { AxiosResponse } from 'axios';
import { Events } from '../interfaces/Events';
import { ModelAttributes } from '../interfaces/ModelsAttributes';
import { HasId, Sync } from './Sync';

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get.bind(this.attributes);
  getAllData = this.attributes.getAllData.bind(this.attributes);

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    console.log(id);

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data);
    });
  }

  save(): void {
    const data = this.attributes.getAllData();
    this.sync
      .save(data)
      .then((response: AxiosResponse) => {
        this.set(response.data);
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
