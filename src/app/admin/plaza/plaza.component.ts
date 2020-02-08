import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Plaza } from 'src/app/Core/models/Plaza';
import { UiService } from 'src/app/Common/ui.service';
import { AdminService } from '../admin.service';
import { ChargeLog } from 'src/app/Core/models/ChargeLog';
import { Subject } from 'rxjs';
import { AddPlazaDialogComponent } from './add-plaza-dialog/add-plaza-dialog.component';

@Component({
  selector: 'app-plaza',
  templateUrl: './plaza.component.html',
  styleUrls: ['./plaza.component.css']
})
export class PlazaComponent implements OnInit {

  displayedColumns: string[] = ['option', 'PlazaId', 'PlazaName', 'Amount'];
  plaza = new Subject<Plaza[]>();
  dataSource = new MatTableDataSource<Plaza>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private uiService: UiService,
    private adminService: AdminService,
    public dialog: MatDialog
  ) {

    this.getPlazas();

    this.plaza.subscribe(plz => {
      this.dataSource = new MatTableDataSource<Plaza>(plz);
    });

    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
  }

  deletePlaza(row) {
    this.adminService.delPlaza(row.plazaId).subscribe(
      res => {
        this.uiService.showToast(`${row.plazaName} deleted successfully`);
        this.getPlazas();
      },
      err => this.uiService.showToast(`unable to delete ${row.plazaName}`)
    );
    this.getPlazas();
  }
  getPlazas() {
    this.adminService.getPlazas().subscribe(
      res => this.plaza.next(res),
      err => this.uiService.showToast('unable to retrieve data at the moment')
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlazaDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPlazas();
    });
  }
}
