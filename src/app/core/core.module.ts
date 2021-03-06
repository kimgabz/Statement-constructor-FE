import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { TokenInterceptorService } from './services/token-Interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NoAuthGuardService } from './services/no-auth-guard.service';

@NgModule({
  declarations: [],
  imports: [CommonModule /*, HttpClientModule*/],
  providers: [
    AuthService,
    JwtService,
    TokenInterceptorService,
    AuthGuardService,
    NoAuthGuardService,
  ],
})
export class CoreModule {}
