import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  showLoading(title?: string, bodyText?: string) {
    const dialogId = 'loading';
    this.closeDialog(dialogId);
    this.dialog.open(LoadingComponent, {
      id: dialogId,
      data: {
        title,
        bodyText: bodyText ?? 'Cargando datos...'
      },
      disableClose: true,
      width: '100vw',
      height: '100vh',
      panelClass: 'loadingPanelClass',
      backdropClass: 'loadingBackdropClass'
    });
  }

  closeDialog(dialogId: LoadingTypes = 'loading') {
    const dialog = this.dialog.getDialogById(dialogId);
    if (!dialog) return;
    dialog?.close();
  }

  closeAllDialogs() {
    this.dialog.closeAll();
  }
}

type LoadingTypes = 'loading'