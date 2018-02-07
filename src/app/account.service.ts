import { Injectable } from '@angular/core';
import { AccountSummary } from './models/accountSummary';
import { Operation } from './models/operation';
import { LoginData, RegisterData } from './models/login';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';

@Injectable()
export class AccountService {

  constructor( private http: HttpClient,
    private alertService: AlertService
  ) { }

  path = 'http://localhost:3000/';

  getSummary() {
    return this.http.get<any>(this.path + 'operations/summary');
  }

  getHistory(records: Number) {
      return this.http.get<any>(this.path + 'operations/history/' + records);
  }

  getDetails(id: string) {
    return this.http.get<any>(this.path + 'operations/details/' + id);
  }

  getCycleOperations(id: string) {
    return this.http.get<any>(this.path + 'operations/cycle/' + id);
  }

  getCycles(records: Number) {
    return this.http.get<any>(this.path + 'operations/cycles/' + records);
  }

  createUpdateOperation(operation: Operation) {
    if (operation._id === '-1' || operation._id === '0') {
      return this.createOperation(operation);
    } else {
      return this.updateOperation(operation);
    }
  }

  createOperation(operation: Operation) {
    const tempOperation = {
      id: 0,
      date: operation.date,
      income: operation.income,
      amount: operation.amount,
      description: operation.description,
      cycleId: operation._id,
    };

    return this.http.post(this.path + 'operations/create', tempOperation);
  }

  updateOperation(operation: Operation) {
    const tempOperation = {
      id: operation._id,
      date: operation.date,
      income: operation.income,
      amount: operation.amount,
      description: operation.description
    };

    return this.http.put(this.path + 'operations/update', tempOperation);
  }

  deleteOperation(id: string) {
    return this.http.delete<any>(this.path + 'operations/delete/' + id);
  }

  changeEmail(email: string) {
    const temp = {
      email: email,
    };

    return this.http.post(this.path + 'operations/changeEmail', temp);
  }

  changePassword(password: string) {
    const temp = {
      password: password,
    };

    return this.http.post(this.path + 'operations/changePassword', temp);
  }
}