import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackBar: MatSnackBar) { }

  showToast(message: string, action = 'close', config?: MatSnackBarConfig) {
    this.snackBar.open(
      message,
      action,
      config || {
        duration: 7000,
      }
    );
  }
}
