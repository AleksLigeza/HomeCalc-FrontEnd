import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../models/operation';
import { Router } from '@angular/router';
import { OperationsService } from '../services/operations.service';
import { AlertService } from '../services/alert.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit {

  @Input() list: Operation[];
  @Input() listTitle: string;
  @Input() parent: DashboardComponent;

  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  operationDetails(id: number) {
    window.scrollTo(0, 0);
    this.router.navigate(['/details/' + id.toString()]);
  }

  deleteOperation(operation: Operation) {
    this.operationsService.deleteOperation(operation._id)
      .subscribe(
      res => {
        this.alertService.info('Operacja usunięta');

        const index = this.list.indexOf(operation, 0);
        if (index > -1) {
          this.list.splice(index, 1);
        }

        if (this.parent) {
          this.parent.summaryInstance.getSummary();
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

    this.operationsService.createOperation(newOperation).subscribe(res => {
      this.alertService.success('Operacja zapisana', true);
      this.router.navigate(['/dashboard']);

    },
      err => {
        if (err.status === 500) {
          this.alertService.error('Błędne dane!');
        }
      });
  }
}
