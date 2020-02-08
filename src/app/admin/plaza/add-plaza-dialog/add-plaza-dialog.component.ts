import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Plaza } from 'src/app/Core/models/Plaza';
import { AdminService } from '../../admin.service';
import { UiService } from 'src/app/Common/ui.service';

@Component({
  selector: 'app-add-plaza-dialog',
  template: `
      <h1 mat-dialog-title>Add Plaza</h1>
<div mat-dialog-content>
<form #plazaForm="ngForm" id="plazaForm" (ngSubmit)="addPlaza()">
  <p>Plaza Name</p>
  <mat-form-field>
    <input required matInput name="PlazaName" [(ngModel)]="plaza.PlazaName" >
  </mat-form-field>
  <p>Plaza Price</p>
  <mat-form-field>
    <input required matInput name="Amount" [(ngModel)]="plaza.Amount" >
  </mat-form-field>
  </form>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancel</button>
  <button mat-raised-button color="accent" form='plazaForm' [disabled]='!plazaForm.valid'  >Add</button>
</div>
  `,
  styles: []
})
export class AddPlazaDialogComponent implements OnInit {
  plaza: Plaza;

  constructor(
    private adminService: AdminService,
    private uiService: UiService,
    public dialogRef: MatDialogRef<AddPlazaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
      this.plaza = {} as Plaza;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addPlaza() {
    console.log(this.plaza);
    this.adminService.addPlaza(this.plaza).subscribe(
      res =>{
        this.uiService.showToast('plaza added successfully');
        this.dialogRef.close();
    },
    err => this.uiService.showToast('an error occured unable to add plaza')
    );
  }
}
