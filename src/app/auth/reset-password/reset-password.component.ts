import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  private token = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.token = this.route.snapshot.params['token'];
  }

  private initForm() {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    let { password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.snackBar.open('Both password should match', 'warning', {
        duration: 3000,
      });
      return;
    }
    this.isLoading = true;
    this.authService.resetPassword({ token: this.token, password }).subscribe(
      (data) => {
        this.snackBar.open('Password updated successfully', 'Success', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      (err) => this.errorHandler(err, 'Something went wrong'),
      () => (this.isLoading = false)
    );
  }

  private errorHandler(error, message) {
    this.isLoading = false;
    // console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
