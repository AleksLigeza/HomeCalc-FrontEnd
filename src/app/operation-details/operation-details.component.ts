import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { AccountService } from '../account.service';
import { Operation } from '../models/operation';
import { AlertService } from '../alert.service';
import { operators } from 'Rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-details',
  templateUrl: './operation-details.component.html',
  styleUrls: ['./operation-details.component.css']
})
export class OperationDetailsComponent implements OnInit {
  @Input() operation: Operation;
  selectedType: boolean;
  connectedOperations: Operation[];

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private location: Location,
    private alertService: AlertService,
    private router: Router
  ) {

    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.connectedOperations = [];
    this.getDetails();
  }

  ngOnInit() {
    this.initialiseInvites();
  }

  getDetails() {
    const id: string = this.route.snapshot.paramMap.get('id');

    if (id === 'new' || id === 'newCycle') { // create new operation
      this.operation = new Operation(id);

      if (id === 'newCycle') { // for cyclic operation set parameter
        this.operation.cyclic = true;
        this.operation._id = '0';
      } else {
        this.operation._id = '-1';
      }
    } else { // load existing operation from database
      this.accountService.getDetails(id).subscribe(res => {
        this.operation = res;
        if (res['cycleId'] === '0') {
          this.operation.cyclic = true;
          this.getCycleOperations(this.operation._id);
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

  save(): void {
    this.accountService.createUpdateOperation(this.operation)
      .subscribe(res => {
        this.goBack();
        this.alertService.info('Operacja zapisana');
      },
      err => {
        if (err.status === 500) {
          this.alertService.error('Błędne dane!');
        }
      });
  }

  delete(): void {
    this.accountService.deleteOperation(this.operation._id)
      .subscribe(
      res => {
        this.goBack();
        this.alertService.info('Operacja usunięta');
      },
      err => {
        this.alertService.error('Błąd usuwania operacji!');
      });
  }

  onSelectType(type: boolean): void {
    this.operation.income = type;
  }

  getCycleOperations(id: string) {
    this.accountService.getCycleOperations(this.operation._id).subscribe(
      res => {
        this.connectedOperations = res;
      },
      err => {
        this.alertService.error('Błąd ładowania operacji');
      }
    );
  }
}
