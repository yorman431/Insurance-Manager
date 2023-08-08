import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private authService: AuthService){}

  onLogIn() {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.getRawValue())
      this.userForm.reset()
    }
  }
}

