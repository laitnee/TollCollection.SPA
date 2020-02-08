import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { UiService } from 'src/app/Common/ui.service';
import { AdminService } from '../admin.service';
import { Vehicle } from 'src/app/Core/models/Vehicle';
import { AddVehicleDialogComponent } from './add-vehicle-dialog/add-vehicle-dialog.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  displayedColumns: string[] = ['option', 'VehicleId', 'PlateNumber', 'TagNumber', 'VehicleName', 'VehicleType'];
  $vehicle = new Subject<Vehicle[]>();
  dataSource = new MatTableDataSource<Vehicle>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private uiService: UiService,
    private adminService: AdminService,
    public dialog: MatDialog
  ) {

    this.adminService.getVehiclses().subscribe(
      res => this.$vehicle.next(res),
      err => this.uiService.showToast('unable to retrieve data at the moment')
    );

    this.$vehicle.subscribe(vhc => {
      this.dataSource = new MatTableDataSource<Vehicle>(vhc);
    });

    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
  }

  deleteVehicle(row) {
    console.log(row);
    this.adminService.delVehicle(row.vehicleId).subscribe(
      res => {
      this.uiService.showToast(`${row.vehicleName} deleted successfully`);
      this.getVehicles();
    },
      err => this.uiService.showToast(`unable to delete ${row.vehicleName}`)
    );

  }
  getVehicles() {
    this.adminService.getVehiclses().subscribe(
      res => this.$vehicle.next(res),
      err => this.uiService.showToast('unable to retrieve data at the moment')
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddVehicleDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getVehicles();
    });
  }

}
