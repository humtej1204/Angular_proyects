import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommerceService } from 'src/app/services/commerce.service';
import { DialogService } from 'src/app/services/dialog.service';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public commerceService: CommerceService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.setElement();
  }

  element = "";

  setElement() {
    if (this.data.element === "nit") this.element = 'NIT'
    else if (this.data.element === "uniqueCode") this.element = 'Código Único'
    else if (this.data.element === "terminal") this.element = 'Terminal'
  }

  deleteElement() {
    this.dialogService.openLoadingWindow('Carganding ...');

    if (this.data.element === "nit") this.deleteCommerece();
    else if (this.data.element === "uniqueCode") this.deleteUniqueCode();
    else if (this.data.element === "terminal") this.deleteTerminal();
  }

  deleteCommerece() {
    const commerceId = this.data.dataDelete.commerceId;

    this.commerceService.deleteCommerce(commerceId)
    .subscribe((data: any) => {
      this.dialogRef.close();
      this.dialogService.closeDialog();

      if (data.estado !== 0) {
        this.dialogService.openDialogError(data.mensaje);
        return;
      }

      this.openSuccessDialog();
    });
  }

  deleteUniqueCode() {
    const commerceId = this.data.dataDelete.commerceId;
    const uniqueCode = this.data.dataDelete.uniqueCode;

    console.log(commerceId, 'unicode' ,uniqueCode)
    this.commerceService.deleteUniqueCode(commerceId, uniqueCode)
    .subscribe((data: any) => {
      this.dialogRef.close();
      this.dialogService.closeDialog();

      if (data.estado !== 0) {
        this.dialogService.openDialogError(data.mensaje);
        return;
      }

      this.openSuccessDialog();
    });
  }

  deleteTerminal() {
    const commerceId = this.data.dataDelete.commerceId;
    const terminal = this.data.dataDelete.terminal;

    console.log(commerceId, terminal)

    this.commerceService.deleteTerminal(commerceId, terminal)
    .subscribe((data: any) => {
      this.dialogRef.close();
      this.dialogService.closeDialog();

      if (data.estado !== 0) {
        this.dialogService.openDialogError(data.mensaje);
        return;
      }

      this.openSuccessDialog();
    });
  }

  openSuccessDialog() {
    this.dialog.open(DialogSuccessComponent, {
      width: '400px',
      data: {
        'next': '',
        'tittle': this.element + " eliminado exitosamente",
        'subtittle': "",
      }
    });
  }

}

export interface DialogData {
  element: string,
  dataDelete: {
    commerceId: string,
    uniqueCode: string,
    terminal: string,
  },
}
