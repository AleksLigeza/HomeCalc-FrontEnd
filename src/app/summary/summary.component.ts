import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AccountSummary } from '../models/accountSummary';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summary: AccountSummary;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.summary = new AccountSummary();
    this.getSummary();
  }

  getSummary(): void {
    this.accountService.getSummary().subscribe(
      res => {
        this.summary = res;
      },
      err => {
        if (err.status === 500) {
          this.alertService.error('Błędne dane!');
        }
      }
    );
  }
}
