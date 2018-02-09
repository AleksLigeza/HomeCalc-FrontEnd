import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../models/operation';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit {

  @Input() list: Operation[];
  @Input() listTitle: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  operationDetails(id: number) {
    window.scrollTo(0, 0);
    this.router.navigate(['/details/' + id.toString()]);
  }

  deleteOperation(operation: Operation) {
    this.accountService.deleteOperation(operation._id)
    .subscribe(
    res => {
      this.alertService.info('Operacja usunięta');

      const index = this.list.indexOf(operation, 0);
      if (index > -1) {
        this.list.splice(index, 1);
      }
    },
    err => {
      this.alertService.error('Błąd usuwania operacji!');
    });
  }

  addCycleBasedOperation(operation: Operation) {
    const newOperation = new Operation(operation._id);
    newOperation.amount = operation.amount;
    newOperation.description = operation.description;
    newOperation.income = operation.income;

    this.accountService.createOperation(newOperation).subscribe(res => {
      this.router.navigate(['/dashboard']);
      this.alertService.success('Operacja zapisana');
    },
    err => {
      if (err.status === 500) {
        this.alertService.error('Błędne dane!');
      }
    });
  }
}
