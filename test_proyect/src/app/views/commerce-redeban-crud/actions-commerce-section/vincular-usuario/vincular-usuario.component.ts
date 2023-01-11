import {COMMA, ENTER, TAB} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {forkJoin, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserData } from 'src/app/models/CRUDcommerceModel';
import { CommerceService } from 'src/app/services/commerce.service';
import { DialogService } from 'src/app/services/dialog.service';
import { InputValidationsService } from 'src/app/services/input-validations.service';

@Component({
  selector: 'app-vincular-usuario',
  templateUrl: './vincular-usuario.component.html',
  styleUrls: ['./vincular-usuario.component.scss'],
})
export class VincularUsuarioComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA, TAB];
  userCtrl = new FormControl('');
  filteredUsers: Observable<UserData[]>;
  users: UserData[] = [];
  allUsers: UserData[] = [];
  userInputInvalid = false;
  userInputInvalidMsg = '';

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<VincularUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public commerceService: CommerceService,
    public inputValidationsService: InputValidationsService,
    public dialogService: DialogService,
  ) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map(users => (users ? this._filter(users) : this.allUsers.slice())),
    );
  }

  usersInCommerce: UserData[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getAllUsers() {
    this.commerceService.getAllUsers().subscribe(data => {
      this.allUsers = data;
    });
  }

  getData() {
    this.dialogService.openLoadingWindow('Obteniendo Datos de los usuarios...');

    forkJoin([
      this.commerceService.getAllUsers(),
      this.commerceService.getUsersByMerchantId(this.data.merchantId),
    ]).subscribe((data: any) => {
      this.dialogService.closeDialog();

      this.allUsers = data[0];
      this.usersInCommerce = data[1].resultado;
    });
  }

  add(event: MatChipInputEvent): void {
    if (event.value) {
      const item = this._filter(event.value)
      if (this.validateUser(item[0]) === false) return

      this.userInputInvalid = false;
      this.users.push(item[0]);
    }

    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(user: UserData): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const item = this._filter(event.option.value)
    if (this.validateUser(item[0]) === false) return

    this.userInputInvalid = false;
    this.users.push(item[0]);

    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: any) {
    const filterValue = ((typeof value === 'string') ? value.toLowerCase() : value.primerNombre.toLowerCase());

    const filterData = this.allUsers.filter(user => {
      const fullName = `${user.primerNombre} ${user.segundoNombre} ${user.primerApellido} ${user.segundoApellido}`;

      return fullName.toLowerCase().includes(filterValue)
    });

    return filterData;
  }

  validateUser(data :UserData) {
    if (data.estado != 4) {
      this.userInputInvalid = true;
      this.userInputInvalidMsg = 'Usuario Inactivo, no puede ser seleccionado.';
      return false;
    }

    if (this.users.some(elem => elem.id === data.id)) {
      this.userInputInvalid = true;
      this.userInputInvalidMsg = 'Usuario ya seleccionado';
      return false;
    }

    if (this.usersInCommerce.some(elem => elem.id === data.id)) {
      this.userInputInvalid = true;
      this.userInputInvalidMsg = 'El usuario ya está asociado al comercio.';
      return false;
    }

    return true;
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

  vincularUsuario() {
    let dataSend = {
      "idUsuario": '',
      "merchantId": this.data.merchantId,
      "codigoNIT": this.data.codigoNIT,
      "codigoUnico": this.data.codigoUnico,
      "razonSocial": this.data.razonSocial,
    };

    this.dialogService.openLoadingWindow('Carganding ...');

    Promise.all(this.users.map(elem => {
      dataSend.idUsuario = elem.id;

      this.commerceService.associatedUsers(dataSend)
      .subscribe((data: any) => {
        if (data.estado !== 0) {
          this.dialogService.openDialogError(data.mensaje);
        }
      })
    }))
    .then(() => {
      this.dialogService.closeDialog();
      this.dialogService.openSuccessDialog("Usuarios Vinculados Correctamente");
    })
  }
}

export interface DialogData {
  "merchantId": string,
  "codigoNIT": string,
  "codigoUnico": string,
  "razonSocial": string,
}
