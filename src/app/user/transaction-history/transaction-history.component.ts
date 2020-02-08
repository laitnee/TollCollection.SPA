import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ChargeLog } from 'src/app/Core/models/ChargeLog';
import { UiService } from 'src/app/Common/ui.service';
import { UserService } from '../user.service';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/Core/Auth/auth.service';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  displayedColumns: string[] = ['ChargeLogId', 'Amount', 'VehicleId', 'PlazaId'];
  chargeLog = new Subject<ChargeLog[]>();
  dataSource = new MatTableDataSource<ChargeLog>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private uiService: UiService, private userService: UserService, private authService: AuthService) {
    this.getDataSource();
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
  }
  getDataSource() {
    this.userService.getTransactionHistory(+this.authService.authStatus.value.userId).subscribe(
      res => this.chargeLog.next(res),
      err => this.uiService.showToast('unable to retrieve data at the moment')
    );
    this.chargeLog.subscribe(
      _ => this.dataSource = new MatTableDataSource<ChargeLog>(_)
    );
  }
  getPlazaName(){
    // let plazaName: string;
    // this.userService.
  }
  getVehicleName(){

  }

}
