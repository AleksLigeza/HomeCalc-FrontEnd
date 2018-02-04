import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Operation } from '../models/operation';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-cycle-menu',
  templateUrl: './cycle-menu.component.html',
  styleUrls: ['./cycle-menu.component.css']
})
export class CycleMenuComponent implements OnInit {

  cycles: Operation[];
  count: number;

  get records() {
    return this.cycles.length;
  }

  constructor(
    private accountService: AccountService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.count = -1;
    this.cycles = [];
    this.getCycles();
  }

  getCycles() {
    this.accountService.getCycles(this.records).subscribe(
      res => {
        this.cycles = this.cycles.concat(res);
        this.enableCycleProperty();

        if (this.count !== -1) {
          if (this.records !== this.count) {
            this.alert.info('Nowe operacje załadowane!');
          } else {
            this.alert.warn('Brak kolejnych operacji!');
          }
        }
      },
      err => {
        this.alert.error('Błąd ładowania operacji zdefiniowanych');
      }
    );
  }

  loadMore() {
    this.count = this.records;
    this.getCycles();
  }

  enableCycleProperty() {
    this.cycles.forEach(element => {
      element.cyclic = true;
    });
  }
}
