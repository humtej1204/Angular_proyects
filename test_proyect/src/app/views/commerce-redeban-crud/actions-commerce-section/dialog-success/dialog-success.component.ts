import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultarCodigoUnicoComponent } from '../consultar-codigo-unico/consultar-codigo-unico.component';
import { CrearTerminalComponent } from '../crear-terminal/crear-terminal.component';
import { CodigoUnicoData } from 'src/app/models/CRUDcommerceModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-success',
  templateUrl: './dialog-success.component.html',
  styleUrls: ['./dialog-success.component.scss']
})
export class DialogSuccessComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  vincular() {
    if (this.data.next === 'uniqueCode') {
      this.vincularCodigoUnico();
    }
    else if (this.data.next === 'terminal'){
      this.vincularTerminal();
    }

    return;
  }

  vincularCodigoUnico() {
    this.dialog.open(ConsultarCodigoUnicoComponent, {
      width: '800px',
      data: {
        codigoUnicoData: {} as CodigoUnicoData,
        commerceId: this.data.commerceId,
        nit: this.data.nit,
        digitoChequeo: this.data.digitoChequeo,
        mode: 'CREATE'
      },
    });
  }

  vincularTerminal() {
    this.dialog.open(CrearTerminalComponent, {
      width: '800px',
      data: {
        nit: this.data.nit,
        digitoChequeo: this.data.digitoChequeo,
        uniqueCode: this.data.uniqueCode,
        mode: 'CREATE'
      },
    });
  }

  reloadPage() {
    window.location.reload();
  }
}

export interface DialogData {
  next: string,
  tittle: string,
  subtittle: string,
  commerceId: string,
  nit: string,
  digitoChequeo: string,
  uniqueCode: string,
}
