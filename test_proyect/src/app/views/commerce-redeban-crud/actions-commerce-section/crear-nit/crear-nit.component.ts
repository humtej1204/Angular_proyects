import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommerceService } from 'src/app/services/commerce.service';
import { InputValidationsService } from 'src/app/services/input-validations.service';
import { ServicesOptions, CommerceType } from '../../parametersOptions';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';
import { CommerceData } from 'src/app/models/CRUDcommerceModel';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-crear-nit',
  templateUrl: './crear-nit.component.html',
  styleUrls: ['./crear-nit.component.scss']
})
export class CrearNitComponent implements OnInit {
  nitForm!: FormGroup;
  servicesForm!: FormGroup;
  commerceTypeForm!: FormGroup;

  constructor(
    public dialog: MatDialog,
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    public commerceService: CommerceService,
    public inputValidationsService: InputValidationsService,
    public dialogRef: MatDialogRef<CrearNitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.formsBuilder();
    this.setTittle();
    this.setMode();
  }

  servicesOptions = ServicesOptions;
  commerceType = CommerceType;
  nitMsgError = '';
  tittleMode = '';
  readonly = false;

  private formsBuilder() {
    this.nitForm = this.formBuilder.group({
      "codigoNIT": ['', Validators.required],
      "digitoChequeo": ['', Validators.required],
      "razonSocial": ['', Validators.required],
      "flagEstado": [false],
      "servicios": [''],
      "tipoComercio": ['', Validators.required],
      "esAgencia": [false],
      "usuarioCreacion": [''],
    })

    this.servicesForm = this.formBuilder.group({
      "DATAFONO": [false],
      "LINK_PAGO": [false],
      "BOTON_PAGO": [false],
    })
  }

  private setMode() {
    if (this.data.mode === "EDIT") {
      this.setDataInForm();
      this.readonly = true;
    }
  }

  private setDataInForm() {
    this.nitForm.get('codigoNIT')?.setValue(this.data.commerceData.codigoNIT);
    this.nitForm.get('digitoChequeo')?.setValue(this.data.commerceData.digitoChequeo);
    this.nitForm.get('razonSocial')?.setValue(this.data.commerceData.razonSocial);
    this.nitForm.get('flagEstado')?.setValue(this.data.commerceData.flagEstado);

    this.setContactData();
  }

  private setContactData() {
    const services = this.data.commerceData.servicios;
    const datafono = services.some((elem: any) => elem === "DATAFONO");
    const link_pago = services.some((elem: any) => elem === "LINK_PAGO");
    const databtn_pago = services.some((elem: any) => elem === "BOTON_PAGO");

    this.servicesForm.get('DATAFONO')?.setValue(datafono);
    this.servicesForm.get('LINK_PAGO')?.setValue(link_pago);
    this.servicesForm.get('BOTON_PAGO')?.setValue(databtn_pago);

    this.nitForm.get('tipoComercio')
    ?.setValue(
      (this.data.commerceData.esAgencia === null || this.data.commerceData.esAgencia === false) ?
      (this.data.commerceData.tipoComercio) : ("AGENCIA")
    )
  }

  private setTittle() {
    if (this.data.mode === "CREATE") this.tittleMode = 'Crear'
    else if (this.data.mode === "EDIT") this.tittleMode = 'Editar'
  }

  public validateFormat(event: any, type: "Numeric"|"Alphanumeric") {
    this.inputValidationsService.validateFormat(event, type)
  }

  validateForms() {
    const c1 = Object.values(this.servicesForm.value)
      .some(elem => elem === true);

    const c2 = this.nitForm.valid;

    return c1 && c2;
  }

  validarNit() {
    const data = {
      nit: this.nitForm.get('codigoNIT')?.value,
      codeUnique: '',
      terminal: ''
    }

    this.commerceService.getCommerceByFilter(data)
    .subscribe(data => {
      const condition = data.some((elem: any) => {
        elem.codigoNIT === this.nitForm.get('codigoNIT')?.value;
      });

      if (data.length === 0 || condition === false) {
        this.crearNit();
        return;
      }

      this.setNitErrorMsg();
    })
  }

  private setNitErrorMsg() {
    this.nitForm.get('codigoNIT')?.setErrors({'invalid': true});
    this.nitMsgError = "El NIT ya figura registrado en la aplicación.";
  }

  crearNit() {
    this.setServicesInNitForm();
    this.setCommerceTypesInNitForm();

    this.dialogService.openLoadingWindow('Carganding ...');

    this.commerceService.createCommerce(this.nitForm.value)
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
          'next': 'uniqueCode',
          'tittle': "NIT creado exitosamente",
          'subtittle': "¿Desea vincular un Código Único?",
          commerceId: data.resultado.id,
          nit: data.resultado.codigoNIT,
          digitoChequeo: data.resultado.digitoChequeo,
        }
      });
    });
  }

  saveChanges() {
    const datasend = this.setDataToChange();

    // this.dialogService.openLoadingWindow('Carganding ...');

    console.log(datasend);

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

  setDataToChange() {
    let datasend: any = {};
    this.setServicesInNitForm();
    this.setCommerceTypesInNitForm();

    datasend = this.nitForm.value;
    // datasend.id = this.data.commerceData.id;
    // delete datasend.codigoNIT;

    return datasend;
  }

  private setServicesInNitForm() {
    const services = [];

    if (this.servicesForm.get("DATAFONO")?.value === true)
      services.push("DATAFONO");

    if (this.servicesForm.get("LINK_PAGO")?.value === true)
      services.push("LINK_PAGO");

    if (this.servicesForm.get("BOTON_PAGO")?.value === true)
      services.push("BOTON_PAGO");

    this.nitForm.get("servicios")?.setValue(services)
  }

  private setCommerceTypesInNitForm() {
    if (this.nitForm.get("tipoComercio")?.value === "AGENCIA") {
      this.nitForm.get("esAgencia")?.setValue(true);
      this.nitForm.get("tipoComercio")?.setValue("MULTI");
    }
  }
}

export interface DialogData {
  commerceData: CommerceData,
  mode: "READ" | "CREATE" | "EDIT",
}
