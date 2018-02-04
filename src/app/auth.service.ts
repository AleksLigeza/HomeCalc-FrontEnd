import { Injectable } from '@angular/core';
import { AccountSummary } from './models/accountSummary';
import { Operation } from './models/operation';
import { LoginData, RegisterData } from './models/login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
    public router: Router,
    private alertService: AlertService) { }

  path = 'http://localhost:3000/auth';
  TOKEN_KEY = 'token';

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logIn(loginData: LoginData) {
    this.http.post(this.path + '/login',
      {
        email: loginData.email,
        password: loginData.password
      }).subscribe(
      res => {
        this.saveToken(res['token']);
        this.router.navigate(['/dashboard']);
      },
      err => {
        if (err.status === 401) {
          this.alertService.error('Błędny email lub hasło!');
        }
      });
  }

  register(registerData: RegisterData) {
    return this.http.post(this.path + '/register',
      {
        email: registerData.email,
        password: registerData.password
      }).subscribe(res => {
        this.saveToken(res['token']);
        this.router.navigate(['/dashboard']);
      },
      err => {
        if (err.status === 500) {
          this.alertService.error('Błędne dane!');
        }
      });
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
