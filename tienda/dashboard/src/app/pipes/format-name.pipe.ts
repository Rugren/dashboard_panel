import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName'
})
export class FormatNamePipe implements PipeTransform {

  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  } 
  */

  transform(value: string): string {
    /* Que me detecte la posición 0 de esa palabra, me la ponga en mayúscula 
    y que me corte en la palabra 1 con value.slice(1)
    es decir, que muestre solo la primera palabra en mayúscula 
    let newValue = value.charAt(0).toUpperCase()+value.slice(1)
    return newValue;
    */

    /* Para que en la web, en vez de poner imageUrls aparezca el nombre en la casilla de "Imagen" 
    y no se vean los campos tal cual nombrados en programación. */
    if(value === "imageUrls") {
      return 'Imagen'
    }

    /* // Se sobreentiende que nos va a retornar lo mismo
    if(value === "nombre") {
      return 'Nombre'
    } */

    // Para que nos ponga Descripción al menos con acento
    if(value === "descripcion") {
      return 'Descripción'
    }

    if(value === "more_description") {
      return 'Más descripción'
    }

    /* este no hace falta traducirlo 
    if(value === "stock") {
      return 'Stock'
    } */

    if(value === "isBestSeller") {
      return 'Más vendido'
    }

    if(value === "isFeatured") {
      return 'Presentado'
    }

    if(value === "isNewArrival") {
      return 'Lo nuevo'
    }

    if(value === "isSpecialOffer") {
      return 'Oferta'
    }

    if(value === "precio_venta") {
      return 'Precio Venta'
    }

    if(value === "precio_regular") {
      return 'Precio regular'
    }

    if(value === "slug") {
      return 'URL'
    }

    if(value === "brand") {
      return 'Marca'
    }

    if(value === "currency") {
      return 'Moneda'
    }

    if(value === "status") {
      return 'Estado'
    }

    if(value === "availability") {
      return 'Disponibilidad'
    }

    if(value === "updated_at") {
      return 'Actualizado a'
    }

    if(value === "created_at") {
      return 'Creado a'
    }


    // 1.0 Que si hay una barra baja (ver 1.1)
    let newValueArray: any = value.split('_')
    // .map para mapearlo 
    newValueArray = newValueArray.map( (nombre: string) => nombre.charAt(0).toUpperCase()+nombre.slice(1) )
    // 1.1 Nos la sustituya por espacios
    let newValue = newValueArray.join(' ')
    return newValue;



  } 



}
