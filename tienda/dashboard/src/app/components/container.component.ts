import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from '../services/entity.service';
import { getEntityProperties } from '../helpers/helpers';

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
  searchTag: any;

  // Este es el filtro para las búsquedas por nombre
  filtrarTabla: any = '';

  // Extraído de https://github.com/michaelbromley/ngx-pagination
  // p: number = 1; Renombrado a page;
  page: number = 1;
  // Número de líneas que queremos que muestre
  noOfRows: number = 10;
  


  constructor(private route: ActivatedRoute, private entityService: EntityService) {}

  ngOnInit(): void {
    this.initComponent();
    // console.log(this.route);

    // Coge las Datas (datos de la BD) de entity.service.ts
    this.entityService.getDatas(this.pagePath).subscribe({
      next: (data: any) => {
        const { isSuccess, results } = data;
        if (isSuccess && results ) {
          this.datas = results;
          
          console.log(this.datas);
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    });

  }

  initComponent (){
    this.pagePath = this.route.snapshot.url[0]?.path || 'productos';
    console.log(this.pagePath); // nos mostrará por consola si estamos en productos, categorias o usuarios. Si hay un error, manda a productos.
  
    /* Importado del archivo creado helpers.ts 
    this.pagePath : para que nos traiga la ruta de la página
    */
    this.entityNames = getEntityProperties(this.pagePath)
    console.log(this.entityNames);
  }

  getValue(data: any, nombre: any){
    const index: any = nombre;
    // si esta data existe hará
    if(data) {
      this.searchTag = data.value
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




}
