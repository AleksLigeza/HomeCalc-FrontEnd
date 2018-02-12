import { Component, OnInit } from '@angular/core';
import { RegisterData, LoginData } from '../models/login';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  registerData: RegisterData;
  loginData: LoginData;

  constructor(private authService: AuthService,
    private alertService: AlertService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }

    this.registerData = new RegisterData();
    this.loginData = new LoginData();
  }

  logIn() {
    this.authService.logIn(this.loginData);
  }

  register() {
    this.authService.register(this.registerData);
  }
}
