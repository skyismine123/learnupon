import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserDto} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Page} from '../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = '/api';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<Page<UserDto[]>>(`${this.apiUrl}/v1/users`)
      .pipe(
        map(page => page.user.map(el => new User(el)))
      );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<Page<UserDto>>(`${this.apiUrl}/v1/users`, {
      User: user
    })
      .pipe(
        map(data => new User(data.user))
      );
  }
}
