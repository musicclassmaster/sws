import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { JWT_CONFIG_TOKEN, JWT_CONFIG } from './configs/jwt.config';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule
  ],
  declarations: [LoginComponent, SignupComponent],
  providers: [AuthService, TokenService],
  exports: [LoginComponent, SignupComponent],
  entryComponents: [LoginComponent, SignupComponent]
})
export class AccountSharedAuthModule {
  static forRoot(options?: {}): ModuleWithProviders {
    return {
      ngModule: AccountSharedAuthModule,
      providers: [
        {
          provide: JWT_CONFIG_TOKEN,
          useValue: { ...JWT_CONFIG }
        },
        AuthService,
        TokenService,
        TokenInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: TokenInterceptor,
          multi: true
        }
      ]
    };
  }
}
