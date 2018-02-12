import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/src/router';
import { AccountService } from '../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  password: string;
  passwordRepeat: string;
  email: string;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private location: Location,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  changePassword(): void {
    this.accountService.changePassword(this.password).subscribe(
      res => {
        this.alertService.info('Hasło zmienione');
        this.goBack();
      },
      err => {
        this.alertService.error('Błąd zmiany hasła');
      });
  }

  changeEmail(): void {
    this.accountService.changeEmail(this.email).subscribe(
      res => {
        this.alertService.info('Email zmieniony');
        this.goBack();
      },
      err => {
        this.alertService.error('Błąd zmiany adresu email');
      });
  }

}
