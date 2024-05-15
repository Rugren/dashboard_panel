import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarNombre'
})
export class FiltrarNombrePipe implements PipeTransform {

  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
  */

  transform(value: any, ...args: any): any {
    
    const resultadoBusqueda = []

    /* Filtro que haga recorrido si pongo una letra y continúo con la palabra
    que nos detecte si empieza por minúscula o mayúscula */
    for ( const nombre of value) {
      if (nombre.nombre.toLowerCase().indexOf(args) > -1 || 
      nombre.nombre.toUpperCase().indexOf(args) > -1 || 
      nombre.nombre.indexOf(args) > -1
    ) {
      resultadoBusqueda.push(nombre)
    }
  }
    
    return resultadoBusqueda;
  }

}
