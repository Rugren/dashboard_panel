import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getEntityProperties } from '../helpers/helpers';
import { EntityService } from '../services/entity.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent implements OnInit {

  pagePath: string ='';
  datas: any;

  // entityNames está en container.component.html
  entityNames: Array<any> = [];

  // entityNamesAll: Para seleccionar todos los campos
  entityNamesAll: Array<any> = [];
  
  searchTag: any;

  // Este es el filtro para las búsquedas por nombre
  filtrarTabla: any = '';

  // Extraído de https://github.com/michaelbromley/ngx-pagination
  // p: number = 1; Renombrado a page;
  page: number = 1;
  // Número de líneas que queremos que muestre
  noOfRows: number = 10;



  constructor(private route: ActivatedRoute, private entityService: EntityService, private router: Router) { }

  ngOnInit(): void {
    this.initComponent();
    // console.log(this.route);

    // Coge las Datas (datos de la BD) de entity.service.ts
    this.entityService.getDatas(this.pagePath).subscribe({
      next: (data: any) => {
        const { isSuccess, results } = data;
        if (isSuccess && results) {
          this.datas = results;

          console.log("Todos mis objetos (datos): ", this.datas);
          /* Así es como lo tenía, que iba bien, (pero puesto el "this.datas.forEach" de abajo para localizar el error del _id, 
          que no lo encuentro, para comprobar si me detecta el id) */
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    /*
          // Verifica si los datos contienen el _id esperado
          this.datas.forEach((data: any) => {
            if (!data._id) {
              console.warn('El objeto data no tiene un _id:', data);
            }
          });
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });*/

  }

  initComponent() {
    this.pagePath = this.route.snapshot.url[0]?.path || 'productos';
    console.log("Estamos en la página de:", this.pagePath); // nos mostrará por consola si estamos en productos, categorias o usuarios. Si hay un error, manda a productos.

    /* Importado del archivo creado helpers.ts 
    this.pagePath : para que nos traiga la ruta de la página
    this.entityNames = getEntityProperties(this.pagePath) */

    this.entityNamesAll = getEntityProperties(this.pagePath);
    /* [this.entityNamesAll[0] es "Nombre" - El [1] = es "Descripcion" (Por si queremos que nos muestre ciertos campos SIEMPRE y no todos)
    this.entityNames = [this.entityNamesAll[0], this.entityNamesAll[1]] 
    Pero solo queremos que nos muestre SIEMPRE el campo de nombre:
    */
    /* this.entityNames = [this.entityNamesAll[0]] // reemplazado por: getDataLS de 2-3 líneas más abajo */
    console.log("entityNames hace esto:", this.entityNames);
    console.log("entityNamesAll hace esto:", this.entityNamesAll);
    const getDataLS = this.getDataLocalStorage(this.pagePath);
    this.entityNames = getDataLS ? getDataLS.entityNames : [this.entityNamesAll[0]];
  }

  getValue(data: any, nombre: any) {
    const index: any = nombre;
    // si esta data existe hará
    if (data) {
      this.searchTag = data.value;
      //console.log("hola0", data);
    }

    return data[index]
  }

  /* Función que nos refleja en la página dónde estamos la continuación de nº de productos por ejemplo, 
  que ponga productos 6-10, en lugar de que cuente de nuevo 1-5. (en la páginación) */
  /* 
  // 1.1 Este método es para empezar la paginación (Así es como se hizo en el tutorial)
  getStartIndex(currentPage: number, lastPage: number) {
    let firstIndex = 1;
    if((currentPage !== lastPage) || (currentPage > 0 && lastPage > 0)) {
      firstIndex = (Number(this.noOfRows) * (Number(currentPage) -1 ) + 1 )
      // Este -1 y +1 es para que no aparezca más allá de la 1ª pág y última.
    }
    return firstIndex.toString();
  }

  // ASÍ NO FUNCIONA cuando es la última página.
  // 1.2 (no funciona) Este método es para terminar la paginación (Así es como se hizo en el tutorial)
  getLastIndex(currentPage: number, lastPage: number) {
    let lastIndex = this.datas ? this.datas.lenght : null;
    if((currentPage !== lastPage)) {
      lastIndex = (Number(this.noOfRows) * (Number(currentPage)))
    }
    return lastIndex.toString();
  } 
  
  // 1.2+- (funciona a medias, suma en la última página) Este método es para terminar la paginación
  getLastIndex(currentPage: number, lastPage: number) {
  let lastIndex = null;
  if (currentPage === lastPage) {
    lastIndex = (Number(this.noOfRows) * (Number(currentPage) - 1)) + (this.datas ? this.datas.length : 0);
  } else if (currentPage < lastPage) {
    lastIndex = (Number(this.noOfRows) * Number(currentPage));
  }
  return lastIndex.toString();
  }
  */

  // ASÍ ES OTRA MANERA, SÍ FUNCIONAN AMBOS:
  // 2.1 Este método es para empezar la paginación
  getStartIndex(currentPage: number, lastPage: number) {
    let firstIndex = 1;
    if (currentPage > 0 && currentPage <= lastPage) {
      firstIndex = (this.noOfRows * (currentPage - 1)) + 1;
      // Este -1 y +1 es para que no aparezca más allá de la 1ª pág y última.
    }
    return firstIndex.toString();
  }

  // 2.2 Este método es para terminar la paginación
  getLastIndex(currentPage: number, lastPage: number) {
    let lastIndex = null;
    if (currentPage > 0 && currentPage < lastPage) {
      lastIndex = Math.min(this.noOfRows * currentPage, this.datas ? this.datas.length : 0);
    } else if (currentPage === lastPage) {
      lastIndex = this.datas ? this.datas.length : null;
    }
    return lastIndex.toString();
  }


  // Función que me da los valores para el Filtro (Me pone las columnas con los filtros que queramos añadir)
  setEntityNames(event: any, objeto: any) {
    // Que si está marcado (checked) no se nos deseleccione (event.target)
    const { checked } = event.target;

    /* FILTROS CAMPOS #1. 
    PARA poder poner FILTROS EN ORDEN QUE DEMOS (NO BORRAR, explicación) * /
    // 1.0 Si dimos click o marcamos algo 
    if(checked) { 
      // 1.1 ¿Ya dimos clic? Si, y además que nos devuelve lo que venga en entityNames
      if(!this.entityNames.includes(objeto)){
        / * 1.2 Y así nos devuelve el objeto (con .push). 
        Es decir, se nos ve reflejado los campos del filtro seleccionado. * /
        this.entityNames.push(objeto)
      }
    } else {
      this.entityNames = this.entityNames.filter((entityName: any) => entityName !== objeto)
    }
  } */

    /* FILTROS CAMPOS #2. 
    PARA poder poner FILTROS EN ORDEN PREDEFINIDO, según el orden que tengamos estipulado saldrán en las columnas (Mejorando el anterior)
    (estamos dentro de la función setEntityNames) */
    if (checked) {
      if (!this.entityNames.includes(objeto)) {
        // oldValue serán nuestras columnas por defecto como las teníamos, los datos del objeto viejo.
        const oldValue = this.entityNames;
        oldValue.push(objeto);

        this.entityNames = [];
        this.entityNames = this.entityNamesAll.filter(objeto => oldValue.includes(objeto));
      }

      /* Por si todavía no ha sido checkeado, hemos creamos un filtro 
      que filtre (.filter) y entre paréntesis para nombrar nuestra respuesta: (entityName: any)
      y que nos lance la respuesta: => entityName !== objeto, es decir, que sea diferente al objeto que estamos esperando. 
      */
    } else {
      this.entityNames = this.entityNames.filter((entityName: any) => entityName !== objeto);
    }

    // Esto hecho para el setDataLocalStorage y getDataLocalStorage :
    const index: any = this.pagePath;
    let data: any = { 'entityNames': this.entityNames };
    this.setDataLocalStorage(index, data);
  }


  
  // Valores de los filtros guardados (para evitar pérdidas al refrescar la página y que se mantengan valores para el Filtro)
  setDataLocalStorage(key: any, value: string) {
    // Si existe información en window.localStorage enviamos los datos
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }
  getDataLocalStorage(key: any) {
    if (window.localStorage) {
      const value: any = window.localStorage.getItem(key);
      return JSON.parse(value);
    }
  }



  // Método entityItem llamado en el container.component.html
  entityItem(id: any, action: any) {
    // El parámetro "id" que es "any" [que puede ser de cualquier tipo (string, number, object, etc.) no lo coge ]

    /*
    - .pagePath (Válido para cualquier página; Productos, Categorias, o Usuarios) 
    - id (es data._id llamado en el .html)
    - action (es para los botones Ver, Editar y Cerrar)
    */
    /* Con con comillas simples no funciona (deben ser comillas invertidas)
    this.router.navigate(['${this.pagePath}/${id}/${action}']); // Así no va */
    /* OK (este es el que funciona, pero no coge en la URL el id): 
    this.router.navigate([`${this.pagePath}/${id}/${action}`]); */

    // Para comprobar que funcionan "pagePath", "id" y "action" correctamente
    console.log('Muestra la ruta pagePath:', this.pagePath);
    console.log('Muestra la id:', id); // Aquí hay que verificar si "id" no es undefined (es lo que no funciona, me aparece undefined)
    console.log('El botón pulsado de action:', action);
    
    
    // Si no funciona id no manda a la ruta y nos muestra el mensaje de error por consola
    if (this.pagePath && id && action) {
      this.router.navigate([`${this.pagePath}/${id}/${action}`]);
   // this.router.navigate([`${this.pagePath}/${id}/${action.toLowerCase()}`]);
    } else {
      console.error('Tenemos un error: pagePath, id, or action is undefined (no están definidos correctamente)');
    }
    

  }





}
