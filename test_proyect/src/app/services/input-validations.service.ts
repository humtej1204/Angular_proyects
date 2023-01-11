import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationsService {

  constructor() { }

  public validateFormat(event: any, type: "Numeric"|"Alphanumeric"|"Text"|"Text and Numbers") {
    let key;

    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }

    const types = {
      "Numeric": /^([0-9]+)$/,
      "Alphanumeric": /^([A-Za-z0-9]+)$/,
      "Text": /^([a-zA-z .]+)$/,
      "Text and Numbers": /^([a-zA-z .0-9]+)$/,
    }
    const regex = types[type]


    if (!regex.test(key)) {
      event.returnValue = false;

      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }
}
