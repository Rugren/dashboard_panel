import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValueImage'
})
export class FormatValueImagePipe implements PipeTransform {

  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
  */

  transform(value: any, nombre: any): any {
    let newValue = value;
    if (nombre == "imageUrls") {
      // que nos rescate la posición primera, para que no nos muestre el nombre de todas las imágenes.
      const url = value[0]
      // Hay que usar comillas invertidas (backticks) para poder interpolar variables dentro de una cadena de texto en JavaScript
      newValue = `<img src="${url}" width="50px" height="50px"/>`;
    }
    return newValue;
  }

}
