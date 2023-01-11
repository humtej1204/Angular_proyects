import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommerceService } from 'src/app/services/commerce.service';
import { InputValidationsService } from 'src/app/services/input-validations.service';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';
import { TerminalData } from 'src/app/models/CRUDcommerceModel';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-crear-terminal',
  templateUrl: './crear-terminal.component.html',
  styleUrls: ['./crear-terminal.component.scss']
})
export class CrearTerminalComponent implements OnInit {
  terminalForm!: FormGroup;
  tittleMode = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CrearTerminalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public formBuilder: FormBuilder,
    public inputValidationsService: InputValidationsService,
    public commerceService: CommerceService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.buildTerminalForm();
    this.setTittle();
    this.setMode();
  }

  private setTittle() {
    if (this.data.mode === "CREATE") this.tittleMode = 'Crear'
    else if (this.data.mode === "EDIT") this.tittleMode = 'Editar'
  }

  buildTerminalForm() {
    this.terminalForm = this.formBuilder.group({
      "terminal": ['', Validators.required],
			"estadoTerminal": [false],
    })
  }

  private setMode() {
    if (this.data.mode === "EDIT") {
      this.setDataInForm();
    }
  }

  private setDataInForm() {
    this.terminalForm.get('terminal')?.setValue(this.data.terminalData.terminal);
    this.terminalForm.get('estadoTerminal')?.setValue(this.data.terminalData.estadoTerminal);
  }

  public validateFormat(event: any, type: "Numeric"|"Alphanumeric") {
    this.inputValidationsService.validateFormat(event, type)
  }

  validateCommerceType() {
    const data = {
      nit: this.data.nit,
      codeUnique: '',
      terminal: ''
    }

    this.commerceService.getCommerceByFilter(data)
    .subscribe(data => {
      this.crearTerminal(data[0].tipoComercio);
    })
  }

  crearTerminal(commerceType: string) {
    const datasend = this.terminalForm.value;
    datasend.terminal = datasend.terminal.toUpperCase();
    datasend['codigoUnico'] = this.data.uniqueCode;

    this.dialogService.openLoadingWindow('Carganding ...');

    this.commerceService.createTerminal(datasend, this.data.uniqueCode)
    .subscribe((data: any) => {
      this.dialogRef.close();
      this.dialogService.closeDialog();

      if (data.estado !== 0) {
        this.dialogService.openDialogError(data.mensaje);
        return;
      }

      const dataInfo = {
        next: 'terminal',
        tittle: "Terminal creado exitosamente",
        subtittle: "",
        nit: this.data.nit,
        digitoChequeo: this.data.digitoChequeo,
        uniqueCode: this.data.uniqueCode,
      }

      if (commerceType === 'MONO') {
        dataInfo.next = '';

        this.dialog.open(DialogSuccessComponent, {
          width: '400px',
          data: dataInfo
        });

        this.dialogRef.close();

        return;
      }

      dataInfo.subtittle = "¿Desea vincular otra Terminal?";

      this.dialog.open(DialogSuccessComponent, {
        width: '400px',
        data: dataInfo
      });
    });
  }

  saveChanges() {
    console.log(this.terminalForm.value);

    // this.commerceService.updateCommerce(datasend)
    // .subscribe((data: any) => {
    //   this.dialogRef.close();
    //   this.dialogService.closeDialog();

    //   if (data.estado !== 0) {
    //     this.dialogService.openDialogError(data.mensaje);
    //     return;
    //   }

    //   this.dialogService.openSuccessDialog("Cambios guardados exitosamente");
    // })
  }

}

export interface DialogData {
  terminalData: TerminalData,
  nit: string,
  digitoChequeo: string,
  uniqueCode: string,
  mode: "CREATE" | "EDIT",
}
