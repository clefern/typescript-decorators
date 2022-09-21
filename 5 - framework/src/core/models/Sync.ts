import axios, { AxiosPromise } from 'axios';
import { UserProps } from '../../modules/user/interfaces/UserProps';

const API = 'http://localhost:3000/users';

export interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise<UserProps> {
    if (!id) {
      throw new Error('id not found');
    }
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise<UserProps> {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${data.id}`, data);
    }
    return axios.post(this.rootUrl, data);
  }
}
