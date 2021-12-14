import { Injectable } from '@angular/core';
import { Person } from '../interfaces/Models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  addUser(p: Person) {
    this.set(p.username, p);
  }

  getUser(user: string) {
    return this.get(user);
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      let element = this.storage.getItem(key);
      if (element)
        return JSON.parse(element);
      else
        return null;
    }
    return null;
  }
}
