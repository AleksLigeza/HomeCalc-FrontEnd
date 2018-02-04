import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Operation } from '../models/operation';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: Operation[];
  count: number;

  get records() {
    return this.history.length;
  }

  constructor(
    private accountService: AccountService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.history = [];
    this.count = -1;
    this.getHistory();
  }

  getHistory() {
    this.accountService.getHistory(this.records).subscribe(
      res => {
        this.history = this.history.concat(res);

        if (this.count !== -1) {
          if (this.records !== this.count) {
            this.alert.info('Nowe operacje załadowane!');
          } else {
            this.alert.warn('Brak kolejnych operacji!');
          }
        }
      },
      err => {
        this.alert.error('Błąd ładowania operacji');
      }
    );
  }

  loadMore() {
    this.count = this.records;
    this.getHistory();
  }
}
