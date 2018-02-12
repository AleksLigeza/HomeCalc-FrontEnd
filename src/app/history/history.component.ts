import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { Operation } from '../models/operation';
import { AlertService } from '../services/alert.service';
import { HistoryFilters } from '../models/historyFilters';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  filtersVisible: boolean;
  filtersApplied: boolean;
  history: Operation[];
  count: number;

  filters: HistoryFilters;

  get records() {
    return this.history.length;
  }

  constructor(
    private operationsService: OperationsService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.resetHistory();
    this.clearFilters();
    this.getHistory();
  }

  getHistory() {
    this.operationsService.getHistory(this.records).subscribe(
      res => {
        this.addHistoryElements(res);
      },
      err => {
        this.alert.error('Błąd ładowania operacji');
      }
    );
  }

  getHistoryWithFilters() {
    this.filtersApplied = true;
    let tempFilters: HistoryFilters;
    tempFilters = Object.create(this.filters);

    tempFilters.removeNulls();

    this.operationsService.getHistoryWithFilters(this.records, tempFilters).subscribe(
      res => {
        this.addHistoryElements(res);
      },
      err => {
        this.alert.error('Błąd ładowania operacji');
      }
    );
  }

  addHistoryElements(res: Operation[]) {
    this.history = this.history.concat(res);

    if (this.count !== -1) {
      if (this.records !== this.count) {
        this.alert.info('Nowe operacje załadowane!');
      } else {
        this.alert.warn('Brak kolejnych operacji!');
      }
    }
  }

  loadMore() {
    this.count = this.records;
    if (!this.filtersApplied) {
      this.getHistory();
    } else {
      this.getHistoryWithFilters();
    }
  }

  showHideFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  clearFilters() {
    this.filters = new HistoryFilters();
    this.filters.nullAllParameters();
    this.filtersApplied = false;
  }

  resetHistory() {
    this.history = [];
    this.count = -1;
  }

  changeType(type: number) {
    this.filters.type = type;
  }
}
