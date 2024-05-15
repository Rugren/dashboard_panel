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

}
