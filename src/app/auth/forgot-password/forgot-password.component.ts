import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  isResultsLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isResultsLoading = true;
    this.authService.forgotPassword(this.form.value).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open(data.message, 'Success', {
          duration: 3000,
        });
      },
      (err) => {
        this.errorHandler(err, 'Something went wrong');
      },
      () => (this.isResultsLoading = false)
    );
  }

  private errorHandler(error, message) {
    this.isResultsLoading = false;
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
