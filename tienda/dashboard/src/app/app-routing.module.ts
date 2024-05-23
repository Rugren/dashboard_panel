import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container.component';
import { DataAdminComponent } from './components/data-admin/data-admin.component';

const routes: Routes = [
  { path: 'productos', component: ContainerComponent },
  { path: 'categorias', component: ContainerComponent },
  { path: 'usuarios', component: ContainerComponent },
  { path: ':entity/:id/:action', component: DataAdminComponent }, // Ruta dinámica para acciones en DataAdminComponent
  { path: '**', redirectTo: 'productos', pathMatch: 'full' }, // Redirección por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
