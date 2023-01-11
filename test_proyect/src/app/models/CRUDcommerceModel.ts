export interface CommerceCompleteData {
  "id": string,
  "idComercio": number,
  "merchantId": string,
  "codigoNIT": string,
  "digitoChequeo": string,
  "razonSocial": string,
  "flagEstado": boolean,
  "servicios": string[],
  "tipoComercio": string,
  "esAgencia"?: boolean,
  "codigoUnico": CodigoUnicoData[],
  "auditoria": AuditoriaData
};

export interface CommerceData {
  "id": string,
  "idComercio": number,
  "merchantId": string,
  "codigoNIT": string,
  "digitoChequeo": string,
  "razonSocial": string,
  "flagEstado": boolean,
  "servicios": string[],
  "tipoComercio": string,
  "esAgencia"?: boolean,
};

export interface CodigoUnicoData {
  "id"?: string,
  "codigoUnico": string,
  "nombreComercio": string,
  "alias": string,
  "ciudad": string,
  "direccion": string,
  "viaPrincipal": string,
  "anexo1": string,
  "anexo2": string,
  "viaSecundaria": string,
  "anexo2ViaSecundaria": string,
  "viaComplementaria": string,
  "anexo3": string,
  "detalleDireccion": string,
  "codigoPSE": string,
  "estadoCodigoUnico": boolean,
  "terminales": TerminalData[],
}

export interface TerminalData {
  "ide": string,
  "codigoUnico": string,
  "terminal": string,
  "estadoTerminal": boolean
}

export interface ContactData {
  "servicios": string[],
  "tipoComercio": string,
  "esAgencia"?: string,
}

export interface UserData {
  id: string,
  rol: string,
  administradorComercios: string,
  primerNombre: string,
  segundoNombre: string,
  primerApellido: string,
  segundoApellido: string,
  tipoDocumento: string,
  nroDocumento: string,
  correo: string,
  celular: string,
  ciudad: string,
  estado: number,
  direccion: string,
  viaPrincipal: string,
  anexo1: string,
  anexo2ViaPrincipal: string,
  viaSecundaria: string,
  anexo2ViaSecundaria: string,
  viaComplementaria: string,
  anexo3: string,
  detalleDireccion: string,
  terminos: boolean,
  comercios: ComerciosInUserData[],
  auditoria: AuditoriaData,
}

export interface ComerciosInUserData {
  "merchantId": string,
  "codigoNIT": string,
  "codigoUnico": string,
  "razonSocial": string,
}

export interface AuditoriaData {
  "fechaCreacion": string,
  "fechaActualizacion"?: string,
  "usuarioCreacion"?: string,
  "usuarioActualizacion"?: string,
}
