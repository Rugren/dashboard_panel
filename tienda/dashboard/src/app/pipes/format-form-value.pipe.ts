import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFormValue'
})
export class FormatFormValuePipe implements PipeTransform {

  transform(nombre: any, dataId: any): any {
    // retornamos los valores que encuentre en nombre
    return dataId[nombre];
  }

}



