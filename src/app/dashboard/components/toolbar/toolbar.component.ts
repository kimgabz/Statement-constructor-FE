import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logOut().subscribe(
      (data) => {
        console.log(data);
      },
      (err) => this.errorHandler(err, 'Something went wrong'),
      () => {
        this.jwtService.destroyToken();
        this.router.navigate(['/login']);
      }
    );
  }
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
