import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {MatDialog} from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { CommerceService } from 'src/app/services/commerce.service';
import { InputValidationsService } from 'src/app/services/input-validations.service';
import { ConsultarCodigoUnicoComponent } from './actions-commerce-section/consultar-codigo-unico/consultar-codigo-unico.component';
import { ConsultarUserComponent } from './actions-commerce-section/consultar-usuario/consultar-usuario.component';
import { CrearNitComponent } from './actions-commerce-section/crear-nit/crear-nit.component';
import { CrearTerminalComponent } from './actions-commerce-section/crear-terminal/crear-terminal.component';
import { DialogConfirmComponent } from './actions-commerce-section/dialog-confirm/dialog-confirm.component';
import { VincularUsuarioComponent } from './actions-commerce-section/vincular-usuario/vincular-usuario.component';

import { ServicesOptions, CommerceType } from './parametersOptions';
import {
  CommerceCompleteData,
  CommerceData,
  CodigoUnicoData,
  TerminalData,
  UserData,
} from 'src/app/models/CRUDcommerceModel';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-commerce-redeban-crud',
  templateUrl: './commerce-redeban-crud.component.html',
  styleUrls: ['./commerce-redeban-crud.component.scss']
})
export class CommerceRedebanCrudComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogService: DialogService,
    public commerceService: CommerceService,
    private formBuilder: FormBuilder,
    public inputValidationsService: InputValidationsService,
  ) { }

  ngOnInit(): void {
    this.obtenerAllComercios();
    this.buildSearchForm();
  }

  selectionCommerceRow = new SelectionModel<CommerceCompleteData>(false, []);
  selectionUniqueCodeRow = new SelectionModel<CodigoUnicoData>(false, []);
  displayedColumns: string[] = ['info', 'check', 'actions'];
  searchForm!: FormGroup;

  //Data Variables
  commerceData: CommerceCompleteData[] = [];
  selectedData: CommerceCompleteData = {} as CommerceCompleteData;
  selectedContactData: any = {
    "DATAFONO": false,
    "LINK_PAGO": false,
    "BOTON_PAGO": false,
    "tipoComercio": '',
  };
  selectedUniqueCodeData: CodigoUnicoData[] = [];
  selectedUniqueCode: CodigoUnicoData = {} as CodigoUnicoData;
  selectedTerminals: TerminalData[] = [];
  selectedUsersData: UserData[] = [];

  //Parameters Variables
  servicesOptions = ServicesOptions;
  commerceType = CommerceType;

  //Variables Actions
  setSelectedContactData(data: CommerceCompleteData) {
      this.selectedContactData = {
        "DATAFONO": data.servicios.some(elem => elem === "DATAFONO"),
        "LINK_PAGO": data.servicios.some(elem => elem === "LINK_PAGO"),
        "BOTON_PAGO": data.servicios.some(elem => elem === "BOTON_PAGO"),
        "tipoComercio": ((data.esAgencia === null || data.esAgencia === false) ? (data.tipoComercio) : ("AGENCIA")),
      };
  }

  buildSearchForm() {
    this.searchForm = this.formBuilder.group({
      nit: [''],
      codeUnique: [''],
      terminal: [''],
    });
  }

  //HTML Actions
  onClickRowComerce(row: any) {
    this.selectionCommerceRow.toggle(row);

    this.selectedData = row;
    this.setSelectedContactData(row);
    this.selectedUniqueCodeData = row.codigoUnico;
    this.selectedUniqueCode = row.codigoUnico[0];
    this.selectionUniqueCodeRow.select(this.selectedUniqueCode);
    this.selectedTerminals = this.selectedUniqueCodeData[0].terminales;

    this.commerceService.getUsersByMerchantId(this.selectedData.merchantId)
    .subscribe((data: any) => {
      if (data.estado !== 0) {
        console.log('Error al traer datos de usuarios');
        return;
      }

      this.selectedUsersData = data.resultado;
    })
  }

  onClickRowUniqueCode(row: any) {
    this.selectionUniqueCodeRow.toggle(row);
    this.selectedUniqueCode = row;
    this.selectedTerminals = row.terminales;
  }

  commerceCRUDactions(mode: "CREATE"|"EDIT", data?: CommerceData) {
    this.dialog.open(CrearNitComponent, {
      width: '800px',
      data: {
        commerceData: data,
        mode: mode,
      },
    });
  }

  codigoUnicoCRUDactions(mode: "CREATE"|"READ"|"EDIT", data?: CodigoUnicoData) {
    this.dialog.open(ConsultarCodigoUnicoComponent, {
      width: '800px',
      data: {
        codigoUnicoData: data,
        commerceId: this.selectedData.id,
        nit: this.selectedData.codigoNIT,
        digitoChequeo: this.selectedData.digitoChequeo,
        mode: mode,
      },
    });
  }

  terminalCRUDactions(mode: "CREATE"|"EDIT", data?: TerminalData) {
    this.dialog.open(CrearTerminalComponent, {
      width: '800px',
      data: {
        terminalData: data,
        nit: this.selectedData.codigoNIT,
        digitoChequeo: this.selectedData.digitoChequeo,
        uniqueCode: this.selectedUniqueCode.codigoUnico,
        mode: mode,
      },
    });
  }

  deleteElement(element: "nit"|"uniqueCode"|"terminal", data: any) {
    const datasend = {
      commerceId: this.selectedData.id,
      uniqueCode: (data.codigoUnico) ? (data.codigoUnico) : (''),
      terminal: (data.terminal) ? (data.ide) : (''),
    }

    if (element === "nit" && data.codigoUnico && data.codigoUnico.length > 0) {
      console.log("No se puede eliminar el NIT ya que tiene códigos únicos asociados.")
      return;
    }
    else if (element === "uniqueCode" && data.terminales && data.terminales.length > 0) {
      console.log("No se puede eliminar el Código único ya que tiene terminales asociadas.")
      return;
    }

    this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {
        element: element,
        dataDelete: datasend,
      },
    });
  }

  consultarUsuario(data: any) {
    this.dialog.open(ConsultarUserComponent, {
      width: '800px',
      data: {
        userData: data,
        nit: this.selectedData.codigoNIT,
        digitoChequeo: this.selectedData.digitoChequeo,
      },
    });
  }

  asociarUsuario() {
    this.dialog.open(VincularUsuarioComponent, {
      width: '800px',
      data: {
        "merchantId" : this.selectedData.merchantId,
        "codigoNIT" : this.selectedData.codigoNIT,
        "codigoUnico" : this.selectedUniqueCode.codigoUnico,
        "razonSocial" : this.selectedData.razonSocial,
      }
    });
  }

  filtrarData() {
    if (!Object.values(this.searchForm.value).some(elem => elem !== '') ||
    !Object.values(this.searchForm.value).some((elem: any) => elem.length >= 3))
      return;

    this.openLoadingWindow();

    this.commerceService.getCommerceByFilter(this.searchForm.value)
    .pipe(
      finalize(() => {
        this.commerceService.getUsersByMerchantId(this.selectedData.merchantId)
        .subscribe((data: any) => {
          if (data.estado !== 0) {
            console.log('Error al traer datos de usuarios');
            return;
          }

          this.selectedUsersData = data.resultado;
        })
      })
    )
    .subscribe((data: any) => {
      this.dialogService.closeDialog();

      if (data.length === 0) {
        console.log('error');
        return;
      }

      this.commerceData = data;
      this.selectedData = data[0];
      this.selectionCommerceRow.select(this.selectedData);

      this.setSelectedContactData(this.selectedData);
      this.selectedUniqueCodeData = this.selectedData.codigoUnico;
      this.selectionUniqueCodeRow.select(this.selectedUniqueCodeData[0]);
      this.selectedTerminals = this.selectedUniqueCodeData[0].terminales;
    });
  }

  getUserFechaCreacion(date: string) {
    const dateCreation = new Date(date);
    let day = dateCreation.getDate();
    let month = dateCreation.getMonth() + 1;
    const year = dateCreation.getFullYear();

    return (`${day}/${month}/${year}`);
  }

  public validateFormat(event: any, type: "Numeric"|"Alphanumeric") {
    this.inputValidationsService.validateFormat(event, type)
  }

  obtenerAllComercios() {
    this.openLoadingWindow();

    this.commerceService.getAllCommerce()
    .pipe(
      finalize(() => {
        this.commerceService.getUsersByMerchantId(this.selectedData.merchantId)
        .subscribe((data: any) => {
          if (data.estado !== 0) {
            console.log('Error al traer datos de usuarios');
            return;
          }

          this.selectedUsersData = data.resultado;
        })
      })
    )
    .subscribe((data: any) => {
      this.dialogService.closeDialog();

      if (data.estado !== 0) {
        this.dialogService.openDialogError(data.mensaje);
        return;
      }

      this.commerceData = data.resultado;
      this.selectedData = this.commerceData[0];
      this.selectionCommerceRow.select(this.selectedData);

      this.setSelectedContactData(this.selectedData);
      this.selectedUniqueCodeData = this.selectedData.codigoUnico;
      this.selectionUniqueCodeRow.select(this.selectedUniqueCodeData[0]);
      this.selectedTerminals = this.selectedUniqueCodeData[0].terminales;
    });
  }

  openDialogError() {
    const errorMsg = "No pudimos obtener los datos debido a un error inesperado. Porfavor refresque la pagina o intentelo nuevamente en unos minutos";
    this.dialogService.openDialogError(errorMsg);
  }

  openLoadingWindow() {
    const msg = 'Espere un momento mientras obtenemos los datos...';
    this.dialogService.openLoadingWindow(msg);
  }
}
