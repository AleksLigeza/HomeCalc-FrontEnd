import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { Operation } from '../models/operation';
import { AlertService } from '../services/alert.service';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  summaryInstance: SummaryComponent;
  instance: DashboardComponent;

  constructor(private operationsService: OperationsService,
    private alert: AlertService) { }

  historyShortcut: Operation[];

  ngOnInit() {
    this.instance = this;
    this.historyShortcut = [];
    this.loadHistoryShortcut();
  }

  loadHistoryShortcut() {
    this.operationsService.getHistory(0).subscribe(
      res => {
        this.historyShortcut = Operation.createArray(res);
      },
      err => {
        this.alert.error('Błąd ładowania operacji');
      }
    );
  }
}
