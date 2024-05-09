import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';

const routes: Routes = [
  { path: 'productos', component: ContainerComponent },
  { path: 'categorias', component: ContainerComponent },
  { path: 'usuarios', component: ContainerComponent },
  { path: '**', redirectTo: 'productos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
