import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../views/commerce-redeban-crud/actions-commerce-section/dialog-error/dialog-error.component';
import { DialogSuccessComponent } from '../views/commerce-redeban-crud/actions-commerce-section/dialog-success/dialog-success.component';
import { LoadingWindowComponent } from '../views/commerce-redeban-crud/actions-commerce-section/loading-window/loading-window.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog,
  ) { }

  openDialogError(errorMsg: string) {
    this.dialog.open(DialogErrorComponent, {
      width: '400px',
      data: {
        errorMsg: errorMsg,
      },
    });
  }

  openLoadingWindow(msg: string) {
    this.dialog.open(LoadingWindowComponent, {
      id: 'loadingWindow',
      width: '100vw',
      height: '100vh',
      disableClose: true,
      data: {
        msg: msg,
      },
    });
  }

  closeDialog() {
    this.dialog.getDialogById('loadingWindow')?.close();
  }

  openSuccessDialog(msj: string) {
    this.dialog.open(DialogSuccessComponent, {
      width: '400px',
      data: {
        next: '',
        tittle: msj,
        subtittle: "",
      }
    });
  }
}
