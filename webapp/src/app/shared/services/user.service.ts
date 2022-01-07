import { Injectable } from '@angular/core';
import { User } from '../interfaces/Models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080/api/customer';
  urlInserir = this.url + '/register';
  urlUpdate = this.url + '/update';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    })
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.url + '/' + id);
  }

  postUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.urlInserir, JSON.stringify(user), this.httpOptions)
  }

  putUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.urlUpdate + '/' + user.username, JSON.stringify(user), this.httpOptions)
  }

}
