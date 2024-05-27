import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../helpers/routes';
import { actions } from '../../helpers/actions';
import { formatToCamelCase } from '../../helpers/utils';
import { getEntityProperties } from '../../helpers/helpers';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'app-data-admin',
  templateUrl: './data-admin.component.html',
  styleUrl: './data-admin.component.css'
})
export class DataAdminComponent implements OnInit {

  entity: any;
  entityId: any;
  action: any;

  // actions es igual a actions de la carpeta /helpers/actions (importar)
  actions: Array<any> = actions;
  routes: Array<any> = routes;

  pageName: any;
  entityNameAll: any;

  dataId: any;

  constructor(private route: ActivatedRoute, private router: Router, private entityService: EntityService) {
    /* 1.0 Hacer click en alguna acción (ver, editar o cerrar) y en la consola del navegador ver ActivatedRoute, 
    abrir, click en la url y ver "_value", que nos mostrará los 3 path, los 3 parámetros que hemos pasado (la ruta pagePath, la id, la action;
    por ejemplo /productos/64cd45541d350d132060a192/Ver ) */
    console.log("Nuestro ActivatedRoute:", route)
  }

  ngOnInit(): void {
    const urls = this.route.snapshot.url

    // tengo que rescatar las 3 posiciones que le hemos pasado (la 0 = pagePath, 1 = id, 2 = action) (se ve en la consola, lo anotado en el comentario anterior "1.0")
    this.entity = urls[0]?.path
    this.entityId = urls[1]?.path
    this.action = urls[2]?.path
    // Es decir, si ponemos this.action traemos la acción de "ver" o "editar"
    
    console.log("Mostrando las urls path de los parámetros", this.entity, this.entityId, this.action)

    const entityExist = routes.filter((route: any) => route.path === '/'+this.entity)
    // Muestra nuestro name y el path slash: "/productos"
    console.log("Muestra name y path", entityExist)

    // Si no existe (!entityExist) o no existe la posición 0 que pertenece a productos o entity
    if(!entityExist || !entityExist[0]) {
      // Que nos navegue a "/productos" en caso de que no exista.
      this.router.navigate(['/productos'])
    }
    /* Si actions trae consigo o no trae consigo a "action" (que es la posición 2; "this.action = urls[2]")
    que me incluya ver o editar */
    if(!this.actions.includes(this.action)) {
      // Que nos navegue a "/productos" en caso de que no exista. (Igual que en el anterior if)
      this.router.navigate(['/productos']);
    }

    const routeObject = this.routes.filter((route: any) => route.path === '/'+this.entity)
    // Traemos la lista
    console.log("Muestra nuestros name y path", routeObject)

    /* Si encontraste algo en routeObject en la posición 0, refléjame a this.pageName 
    y tráeme lo que econtraste en "name"(es lo comentado, pero debajo mejorado; llamado "single" en vez de name, ver en routes.ts) */
    if(routeObject[0]) {
      // this.pageName = routeObject[0]?.name;

      // Muestra la acción(ya en formato camelCase) + la página, por ejemplo; ver Productos, editar Categorias
      this.pageName = formatToCamelCase(this.action) + " " + routeObject[0]?.single;
      console.log("Nombre de la página dentro de dónde nos encontramos:", this.pageName)
    }

      this.entityNameAll = getEntityProperties(this.entity);
      console.log("El entityNameAll muestra todos los campos que tenemos en la Base de datos:", this.entityNameAll)
      this.getDataId()
  }


  getDataId() {
    this.entityService.getDataID(this.entity, this.entityId).subscribe({
      next: (value: any) => {
        // en el tutorial puso .data, nombrado .dataId por mi para hacerlo más descriptivo.
        this.dataId = value.results; // Para que nos dé directamente los resultados (se ve por consola, si se quita results nos aparecen más cosas como "isSuccess: true" y "ok: true")
        console.log("El dataId (todos los datos de un id producto) es:", this.dataId);
      },
      error: (err: any) => {
        // console.log("Error en el dataId", err);
        console.error("Error en el dataId", err);
      }
    })
  }

  getValue(nombre: any) {
    return this.dataId[nombre];
  }
  

}

