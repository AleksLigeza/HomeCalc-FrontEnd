import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { AccountSummary, AccountSummaryDiffrence } from '../models/accountSummary';
import { AlertService } from '../services/alert.service';
import { isNgContainer } from '@angular/compiler';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summary: AccountSummary;
  diffrence: AccountSummaryDiffrence;

  constructor(
    private operationsService: OperationsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.summary = new AccountSummary();
    this.diffrence = new AccountSummaryDiffrence(this.summary);
    this.getSummary();
  }

  getSummary(): void {
    this.operationsService.getSummary().subscribe(
      res => {
        this.summary = res;
        this.diffrence = new AccountSummaryDiffrence(res);
      },
      err => {
        if (err.status === 500) {
          this.alertService.error('Błędne dane!');
        }
      }
    );
  }
}
