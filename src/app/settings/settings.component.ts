import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/src/router';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  passwordOne: string;
  passwordSecond: string;
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
    this.accountService.changePassword(this.passwordOne).subscribe(
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
