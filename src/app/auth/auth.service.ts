import { Injectable } from '@angular/core';
import {NotificationService} from '../shared/service/notification.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Login, User} from './user';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _$authUser = new BehaviorSubject<User | null>(null);
  $authUser = this._$authUser.asObservable();

  constructor(private notify: NotificationService,
              private router: Router,
              private httpClient: HttpClient
  ) { }

  login(user: Login){
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        email: user.email || '',
        password: user.password || ''
      }
    }).subscribe({
      next: (data) => {
        if (data.length) {
          const authUser = data[0];
          this._$authUser.next(authUser);
          this.router.navigate(['/dashboard']);
          sessionStorage.setItem('token', authUser.token);

        } else {
          this. notify.error('User Or Password Incorrect')
        }
      },
      error: () => this.notify.error('Error with the server, please contact the admin')
    })
  }
  userVerification(): Observable<boolean> {
    return this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        token: sessionStorage.getItem('token') || ''
      }
    }).pipe(
      map(user => !!user.length)
    )
  }
}
