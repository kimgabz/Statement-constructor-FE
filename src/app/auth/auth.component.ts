import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';
import { User } from '../core/models/user/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  title = '';
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }

  googleAuthHandler() {
    this.authService.googleAuth().subscribe(
      (data) => {
        console.log(data);
      },
      (err) => this.errorHandler(err, 'Opps, something went wrong')
    );
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: '',
    });
  }

  forgotPassHandler() {
    this.router.navigate(['/forgot-password']);
  }

  onSubmit() {
    //if title is Signup
    //we need to send the request for Signup
    if (this.title === 'Signup') {
      this.isLoading = true;
      this.authService.signup(this.authForm.value).subscribe(
        (data) => {
          // console.log(data);
          // this.router.navigate(['/dashboard', 'statements']);
          this.snackBar.open('Signup successful', 'Success', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        (error) => this.errorHandler(error, 'Opps, something went wrong'),
        () => (this.isLoading = false)
      );
    } else {
      this.isLoading = true;
      let { email, password } = this.authForm.value;
      let user: User = { email, password };
      this.authService.login(user).subscribe(
        (data) => {
          this.jwtService.seToken(data.token);
          this.router.navigate(['/dashboard', 'statements']);
        },
        (err) => this.errorHandler(err, 'Opps, something went wrong'),
        () => (this.isLoading = false)
      );
    }
  }

  private errorHandler(error, message) {
    this.isLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
