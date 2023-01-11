import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoVia, Anexo1, Anexo2, Anexo3, TipoUsuario } from '../../parametersOptions';
import { UserData } from 'src/app/models/CRUDcommerceModel';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConsultarUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.buildForm();
    this.setDataInForm();
  }

  ngOnInit(): void {
  }

  tipoViaOptions = TipoVia;
  anexo1Options = Anexo1;
  anexo2Options = Anexo2;
  anexo3Options = Anexo3;
  tipoUsuarioOptions = TipoUsuario;

  userForm!: FormGroup;

  private buildForm() {
    this.userForm = this.formBuilder.group({
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      tipoDocumento: [''],
      nroDocumento: [''],
      correo: [''],
      celular: [''],
      ciudad: [''],
      estado: [''],
      direccion: [''],
      viaPrincipal: [''],
      anexo1: [''],
      anexo2ViaPrincipal: [''],
      viaSecundaria: [''],
      anexo2ViaSecundaria: [''],
      viaComplementaria: [''],
      anexo3: [''],
      detalleDireccion: [''],
      terminos: [''],
    });
  }

  setDataInForm() {
    this.userForm.get('primerNombre')?.setValue(this.data.userData.primerNombre);
    this.userForm.get('segundoNombre')?.setValue(this.data.userData.segundoNombre);
    this.userForm.get('primerApellido')?.setValue(this.data.userData.primerApellido);
    this.userForm.get('segundoApellido')?.setValue(this.data.userData.segundoApellido);
    this.userForm.get('tipoDocumento')?.setValue(this.data.userData.tipoDocumento);
    this.userForm.get('nroDocumento')?.setValue(this.data.userData.nroDocumento);
    this.userForm.get('correo')?.setValue(this.data.userData.correo);
    this.userForm.get('celular')?.setValue(this.data.userData.celular);
    this.userForm.get('ciudad')?.setValue(this.data.userData.ciudad);
    this.userForm.get('estado')?.setValue(this.data.userData.estado);
    this.userForm.get('direccion')?.setValue(this.data.userData.direccion);
    this.userForm.get('viaPrincipal')?.setValue(this.data.userData.viaPrincipal);
    this.userForm.get('anexo1')?.setValue(this.data.userData.anexo1);
    this.userForm.get('anexo2ViaPrincipal')?.setValue(this.data.userData.anexo2ViaPrincipal);
    this.userForm.get('viaSecundaria')?.setValue(this.data.userData.viaSecundaria);
    this.userForm.get('anexo2ViaSecundaria')?.setValue(this.data.userData.anexo2ViaSecundaria);
    this.userForm.get('viaComplementaria')?.setValue(this.data.userData.viaComplementaria);
    this.userForm.get('anexo3')?.setValue(this.data.userData.anexo3);
    this.userForm.get('detalleDireccion')?.setValue(this.data.userData.detalleDireccion);
    this.userForm.get('terminos')?.setValue(this.data.userData.terminos);
  }

  getEstadoUsuario(state: number) {
    const estados = ['ELIMINADO', 'PENDIENTE', 'DESACTIVADO', 'BLOQUEADO', 'ACTIVO']
    return (estados[state]);
  }
}

export interface DialogData {
  userData: UserData,
  nit: string,
}
