import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarNombre'
})
export class FiltrarNombrePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
