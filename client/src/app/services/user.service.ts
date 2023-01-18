import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'http://localhost:8000/user';

  constructor (private http: HttpClient) { }

  getUsers () {
    return this.http.get<User[]>(`${this.endpoint}/get`);
  }

  getUserById (id: number) {
    return this.http.get<User>(`${this.endpoint}/${id}/get`)
  }

  createUser (user: User) {
    return this.http.post(`${this.endpoint}/create`, user)
  }

  updateUser (user: User) {
    return this.http.put(`${this.endpoint}/${user.id}/update`, user)
  }

  deleteUser (id: number) {
    return this.http.delete(`${this.endpoint}/${id}/delete`)
  }

}
