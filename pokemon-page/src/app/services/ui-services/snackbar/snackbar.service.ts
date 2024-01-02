import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private defaultConfig: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 100 * 1000,
  }

  private defaultDataByType = {
    error: {
      panelClass: 'error_snackbar',
      icon: 'error'
    },
    info: {
      panelClass: 'info_snackbar',
      icon: 'info'
    },
    success: {
      panelClass: 'success_snackbar',
      icon: 'check_circle'
    },
  }

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  openSnackbar(msg: string, type: SnackbarTypes) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      ...this.defaultConfig,
      data: {
        msg,
        icon: this.defaultDataByType[type].icon
      },
      panelClass: ['default_snackbar', this.defaultDataByType[type].panelClass]
    })
  }
}

type SnackbarTypes = "error" | "info" | "success"