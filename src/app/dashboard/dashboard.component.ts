import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Operation } from '../models/operation';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private accountService: AccountService,
  private alert: AlertService) { }

  historyShortcut: Operation[];

  ngOnInit() {
    this.historyShortcut = [];
    this.loadHistoryShortcut();
  }

  loadHistoryShortcut() {
  this.accountService.getHistory(0).subscribe(
      res => {
        this.historyShortcut = res;
      },
      err => {
        this.alert.error('Błąd ładowania operacji');
      }
    );
  }
}
