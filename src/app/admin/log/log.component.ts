import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { ChargeLog } from 'src/app/Core/models/ChargeLog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UiService } from 'src/app/Common/ui.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  displayedColumns: string[] = ['ChargeLogId', 'Amount', 'VehicleId', 'PlazaId'];
  chargeLog = new Subject<ChargeLog[]>();
  dataSource = new MatTableDataSource<ChargeLog>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private uiService: UiService, private adminService: AdminService) {

  }
  ngOnInit() {
    this.getDataSource();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDataSource() {
    this.adminService.getLogs().subscribe(
      res => this.chargeLog.next(res),
      err => this.uiService.showToast('unable to retrieve data at the moment')
    );
    this.chargeLog.subscribe(
      _ => this.dataSource = new MatTableDataSource<ChargeLog>(_)
    );
  }

}
