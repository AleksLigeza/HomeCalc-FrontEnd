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
  records: number;
  shouldResetHistory: boolean;
  
  filters: HistoryFilters;

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
        this.addHistoryElements(Operation.createArray(res));
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

    tempFilters.description = tempFilters.description.replace(/ę/ig, 'e');
    tempFilters.description = tempFilters.description.replace(/ż/ig, 'z');
    tempFilters.description = tempFilters.description.replace(/ó/ig, 'o');
    tempFilters.description = tempFilters.description.replace(/ł/ig, 'l');
    tempFilters.description = tempFilters.description.replace(/ć/ig, 'c');
    tempFilters.description = tempFilters.description.replace(/ś/ig, 's');
    tempFilters.description = tempFilters.description.replace(/ź/ig, 'z');
    tempFilters.description = tempFilters.description.replace(/ń/ig, 'n');
    tempFilters.description = tempFilters.description.replace(/ą/ig, 'a');

    this.operationsService.getHistoryWithFilters(this.records, tempFilters).subscribe(
      res => {
        this.addHistoryElements(Operation.createArray(res));
      },
      err => {
        this.alert.error('Błąd ładowania operacji');
      }
    );
  }

  addHistoryElements(res: Operation[]) {
    if (this.shouldResetHistory) {
      this.resetHistory();
    }

    this.history = this.history.concat(res);
    this.records = this.history.length;

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
    this.records = 0;
    this.count = -1;
    this.shouldResetHistory = false;
  }

  changeType(type: number) {
    this.filters.type = type;
  }

  allowResetHistory() {
    this.shouldResetHistory = true;
    this.records = 0;
    this.count = -1;
  }
}
