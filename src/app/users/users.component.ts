import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  list: User[];
  details: User;

  constructor(private accountService: AccountService,
    private alert: AlertService) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.list = [];
    this.details = null;
    this.getAllUsers();
  }

  showUserDetails(id: number) {
    this.details = User.copy(this.list.filter( user => user.user_id === id )[0]);
  }

  deleteUser(id: number) {
    this.accountService.deleteUser(id).subscribe(
      res => {
        this.initialize();
        this.alert.success('Pozycja usunięta');
      },
      err => {
        this.alert.error('Błąd ładowania operacji');
      }
    );
  }

  getAllUsers() {
    this.accountService.getAllUsers().subscribe(
      res => {
        this.list = res;
      },
      err => {
        this.alert.error('Błąd ładowania listy');
      }
    );
  }

  updateUser() {
    this.accountService.updateUser(this.details).subscribe(
      res => {
        this.initialize();
        this.alert.success('Dane zaktualizowane');
      },
      err => {
        this.alert.error('Błąd ładowania operacji');
      }
    );
  }
}
