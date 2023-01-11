import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommerceService } from 'src/app/services/commerce.service';
import { InputValidationsService } from 'src/app/services/input-validations.service';
import { TipoVia, Anexo1, Anexo2, Anexo3 } from '../../parametersOptions';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';
import {
  CodigoUnicoData,
} from 'src/app/models/CRUDcommerceModel';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarCodigoUnicoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConsultarCodigoUnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public commerceService: CommerceService,
    public inputValidationsService: InputValidationsService,
    public dialogService: DialogService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.buildForm();
    this.setMode();
    this.setTittle();
  }

  tipoViaOptions = TipoVia;
  anexo1Options = Anexo1;
  anexo2Options = Anexo2;
  anexo3Options = Anexo3;
  readonly = false;
  canEdit = false;
  tittleMode = '';
  hasCodigoPSE = false;
  codigoUnicoMsgError = ''

  codigoUnicoForm!: FormGroup;

  private buildForm() {
    this.codigoUnicoForm = this.formBuilder.group({
      codigoUnico: ['', Validators.required],
      nombreComercio: ['', Validators.required],
      alias: [''],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      viaPrincipal: ['', Validators.required],
      anexo1: [''],
      anexo2: [''],
      viaSecundaria: ['', Validators.required],
      anexo2ViaSenduaria: [''],
      viaComplementaria: ['', Validators.required],
      anexo3: [''],
      detalleDireccion: [''],
      codigoPSE: [''],
      estadoCodigoUnico: [false],
    });
  }

  public validateFormat(event: any, type: "Numeric"|"Alphanumeric") {
    this.inputValidationsService.validateFormat(event, type)
  }

  validateDirectionValidators(value: string) {
    if (value === 'Otros') {
      this.codigoUnicoForm.get('viaPrincipal')?.clearValidators();
      this.codigoUnicoForm.get('viaSecundaria')?.clearValidators();
      this.codigoUnicoForm.get('viaComplementaria')?.clearValidators();
    } else {
      this.codigoUnicoForm.get('viaPrincipal')?.setValidators([Validators.required]);
      this.codigoUnicoForm.get('viaSecundaria')?.setValidators([Validators.required]);
      this.codigoUnicoForm.get('viaComplementaria')?.setValidators([Validators.required]);
    }

    this.codigoUnicoForm.get('viaPrincipal')?.updateValueAndValidity();
    this.codigoUnicoForm.get('viaSecundaria')?.updateValueAndValidity();
    this.codigoUnicoForm.get('viaComplementaria')?.updateValueAndValidity();
  }

  validatePSEValidators(value: string) {
    if (!value) {
      this.codigoUnicoForm.get('codigoPSE')?.clearValidators();
    } else {
      this.codigoUnicoForm.get('codigoPSE')?.setValidators([Validators.required]);
    }

    this.codigoUnicoForm.get('codigoPSE')?.updateValueAndValidity();
  }

  private setTittle() {
    if (this.data.mode === "CREATE") this.tittleMode = 'Vincular Nuevo'
    if (this.data.mode === "READ") this.tittleMode = 'Consultar'
    if (this.data.mode === "EDIT") this.tittleMode = 'Editar'
  }

  private setMode() {
    if (this.data.mode !== "CREATE") {
      this.setDataInForm();
      this.readonly = true;
    }

    if (this.data.mode === "EDIT")
      this.canEdit = true;
  }

  private setDataInForm() {
    this.codigoUnicoForm.get('codigoUnico')?.setValue(this.data.codigoUnicoData.codigoUnico);
    this.codigoUnicoForm.get('nombreComercio')?.setValue(this.data.codigoUnicoData.nombreComercio);
    this.codigoUnicoForm.get('alias')?.setValue(this.data.codigoUnicoData.alias);
    this.codigoUnicoForm.get('ciudad')?.setValue(this.data.codigoUnicoData.ciudad);
    this.codigoUnicoForm.get('direccion')?.setValue(this.data.codigoUnicoData.direccion);
    this.codigoUnicoForm.get('viaPrincipal')?.setValue(this.data.codigoUnicoData.viaPrincipal);
    this.codigoUnicoForm.get('anexo1')?.setValue(this.data.codigoUnicoData.anexo1);
    this.codigoUnicoForm.get('anexo2')?.setValue(this.data.codigoUnicoData.anexo2ViaSecundaria);
    this.codigoUnicoForm.get('viaSecundaria')?.setValue(this.data.codigoUnicoData.viaSecundaria);
    this.codigoUnicoForm.get('anexo2ViaSenduaria')?.setValue(this.data.codigoUnicoData.anexo2ViaSecundaria);
    this.codigoUnicoForm.get('viaComplementaria')?.setValue(this.data.codigoUnicoData.viaComplementaria);
    this.codigoUnicoForm.get('anexo3')?.setValue(this.data.codigoUnicoData.anexo3);
    this.codigoUnicoForm.get('detalleDireccion')?.setValue(this.data.codigoUnicoData.detalleDireccion);
    this.codigoUnicoForm.get('estadoCodigoUnico')?.setValue(this.data.codigoUnicoData.estadoCodigoUnico);
    this.codigoUnicoForm.get('codigoPSE')?.setValue(this.data.codigoUnicoData.codigoPSE);

    this.setTogleCodigoPse();
  }

  private setTogleCodigoPse() {
    if ((typeof this.data.codigoUnicoData.codigoPSE) === 'string')
      this.hasCodigoPSE = true;
  }

  validateUniqueCode() {
    const data = {
      nit: '',
      codeUnique: this.codigoUnicoForm.get('codigoUnico')?.value,
      terminal: ''
    }

    this.commerceService.getCommerceByFilter(data)
    .subscribe(data => {
      const condition = data.some((elem: any) => {
        elem.codigoUnico === this.codigoUnicoForm.get('codigoUnico')?.value;
      });

      if (data.length === 0 || condition === false) {
        this.crearCodigoUnico();
        return;
      }

      this.setCodUniqueErrorMsg(data[0].codigoNIT);
    })
  }

  setCodUniqueErrorMsg(nit: string) {
    this.codigoUnicoForm.controls['codigoUnico']?.setErrors({'incorrect': true});

    if (this.data.nit === nit)
      this.codigoUnicoMsgError = "El código único ya está asociado al comercio.";

    this.codigoUnicoMsgError = "El código único ya está asociado al NIT " + nit;
  }

  crearCodigoUnico() {
    const datasend = this.codigoUnicoForm.value;
    datasend['terminales'] = [];

    this.validateData();

    this.dialogService.openLoadingWindow('Carganding ...');

    this.commerceService.createUniqueCode(datasend, this.data.commerceId)
    .subscribe((data: any) => {
      this.dialogRef.close();
      this.dialogService.closeDialog();

      if (data.estado !== 0) {
        this.dialogService.openDialogError(data.mensaje);
        return;
      }

      this.dialog.open(DialogSuccessComponent, {
        width: '400px',
        data: {
          'next': 'terminal',
          'tittle': "Código Único creado exitosamente",
          'subtittle': "¿Desea vincular una Terminal?",
          nit: this.data.nit,
          digitoChequeo: this.data.digitoChequeo,
          uniqueCode: this.codigoUnicoForm.get('codigoUnico')?.value,
        }
      });
    });
  }

  saveChanges() {
    console.log(this.codigoUnicoForm.value);

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

  validateData() {
    if (this.codigoUnicoForm.get('direccion')?.value === 'Otros') {
      this.codigoUnicoForm.get('viaPrincipal')?.setValue('');
      this.codigoUnicoForm.get('viaSecundaria')?.setValue('');
      this.codigoUnicoForm.get('viaComplementaria')?.setValue('');
    }
    if (!this.hasCodigoPSE)
      this.codigoUnicoForm.get('codigoPSE')?.setValue('');
  }
}

export interface DialogData {
  codigoUnicoData: CodigoUnicoData,
  nit: string,
  digitoChequeo: string,
  commerceId: string,
  mode: "READ" | "CREATE" | "EDIT",
}
