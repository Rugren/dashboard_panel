/* const routes: Routes = [
    { path: 'productos', component: ContainerComponent },
    { path: 'categorias', component: ContainerComponent },
    { path: 'usuarios', component: ContainerComponent },
    { path: '**', redirectTo: 'productos', pathMatch: 'full' },
]; */

export const routes = [
    { path: '/productos', name: 'Productos' },
    { path: '/categorias', name: 'Categorias' },
    { path: '/usuarios', name: 'Usuarios' },
];

