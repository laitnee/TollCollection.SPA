import { Component, OnInit, Inject } from '@angular/core';
import { Vehicle } from 'src/app/Core/models/Vehicle';
import { AdminService } from '../../admin.service';
import { UiService } from 'src/app/Common/ui.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-vehicle-dialog',
  templateUrl: './add-vehicle-dialog.component.html',
  styleUrls: ['./add-vehicle-dialog.component.css']
})
export class AddVehicleDialogComponent implements OnInit {

  vehicle: Vehicle;

  constructor(
    private adminService: AdminService,
    private uiService: UiService,
    public dialogRef: MatDialogRef<AddVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
      this.vehicle = {} as Vehicle;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addVehicle() {
    this.adminService.addVehicle(this.vehicle).subscribe(
      res =>{
        this.uiService.showToast('vehicle added successfully');
        this.dialogRef.close();
    },
    err => this.uiService.showToast('an error occured unable to add vehicle')
    );
  }

}
