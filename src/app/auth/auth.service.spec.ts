import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MockProvider} from 'ng-mocks';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {User} from './user';
import {environment} from '../../environment/environment';
import {NotificationService} from '../shared/service/notification.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  const user: User = {
    id:1,
    name: 'test',
    email: 'test@test.com',
    token: 'klasdjfkljf',
    role: 'admin',
    password: '1234'
  }
  const mockUser: User[] = [user];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [MockProvider(Router)]
    })

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('$authUser should have the user if the login complete successfully', () => {
    service.login({email: user.email, password: user.password});

    httpController.expectOne({
      method: 'GET',
      url: `${environment.baseApiUrl}/users?email=${user.email}&password=${user.password}`
    }).flush(mockUser);

    service.$authUser.subscribe({
      next: authUser => {
        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(user);
      }
    });
  })

  it ('notification errors should be called if the token doesnt exist to an user', () => {
    const notification = TestBed.inject(NotificationService);
    const spyError = spyOn(notification, 'error');
    service.login({email: user.email, password: 'badPass'});

    httpController.expectOne({
      method: 'GET',
      url: `${environment.baseApiUrl}/users?email=${user.email}&password=badPass`
    }).flush('');

    expect(spyError).toHaveBeenCalled();
  })

  it ('userVerification function should return true if the token exist to an user', () => {
    service.userVerification().subscribe({
      next: v => {
        expect(v).toBeTrue();
      }
    })

    httpController.expectOne({
      method: 'GET',
      url: `${environment.baseApiUrl}/users?token=${user.token}`
    }).flush(mockUser);
  })
});
