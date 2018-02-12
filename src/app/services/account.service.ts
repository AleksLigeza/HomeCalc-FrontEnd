import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { filter } from 'Rxjs/operators/filter';

@Injectable()
export class AccountService {

  constructor( private http: HttpClient,
    private alertService: AlertService
  ) { }

  path = 'http://localhost:3000/';

  changeEmail(email: string) {
    const temp = {
      email: email,
    };

    return this.http.post(this.path + 'account/changeEmail', temp);
  }

  changePassword(password: string) {
    const temp = {
      password: password,
    };

    return this.http.post(this.path + 'account/changePassword', temp);
  }
}
