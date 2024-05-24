import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../helpers/routes';
import { actions } from '../../helpers/actions';

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

  constructor(private route: ActivatedRoute, private router: Router) {
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
  }

}



/* por si lo necesitamos para poner algo similar en el tutorial más adelante
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-admin',
  templateUrl: './data-admin.component.html',
  styleUrl: './data-admin.component.css'
})
export class DataAdminComponent implements OnInit {
  entity: string | undefined;
  id: string | undefined;
  action: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entity = params['entity'];
      this.id = params['id'];
      this.action = params['action'];
      console.log(`Entity: ${this.entity}, ID: ${this.id}, Action: ${this.action}`);
    });
  }
}*/