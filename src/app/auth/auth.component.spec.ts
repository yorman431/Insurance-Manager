import {TestBed} from '@angular/core/testing';
import {AuthComponent} from './auth.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from './auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatCardModule
      ]
    })
    component = TestBed.createComponent(AuthComponent).componentInstance;
  })

  it ('The form should be valid if a email and password are given', () => {
    component.userForm.get('email')?.setValue('test@test.com');
    component.userForm.get('password')?.setValue('1234');
    expect(component.userForm.valid).toBeTrue();
  })

  it ('The form should be invalid if a email and password are not given', () => {
    component.userForm.get('email')?.setValue('');
    component.userForm.get('password')?.setValue('');
    expect(component.userForm.valid).toBeFalse();
  })

  it ('AuthService login function should be called if form is valid', () => {
    const authService = TestBed.inject(AuthService);
    const spyLogin = spyOn(authService, 'login')

    component.userForm.get('email')?.setValue('test@test.com');
    component.userForm.get('password')?.setValue('1234');
    expect(component.userForm.valid).toBeTrue();
    component.onLogIn();
    expect(spyLogin).toHaveBeenCalled();
  })
})
