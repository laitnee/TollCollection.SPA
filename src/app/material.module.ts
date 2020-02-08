import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatIconModule,
  MatFormFieldModule, MatCardModule, MatInputModule, MatTooltipModule,
  MatSnackBarModule, MatDialogModule, MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
