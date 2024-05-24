/* const routes: Routes = [
    { path: 'productos', component: ContainerComponent },
    { path: 'categorias', component: ContainerComponent },
    { path: 'usuarios', component: ContainerComponent },
    { path: '**', redirectTo: 'productos', pathMatch: 'full' },
]; */

export const routes = [
    // El single es otro objeto, que para no modificar "name" en el camelCase, hemos creado "single"
    { path: '/productos', name: 'Productos', single: 'Productos' },
    { path: '/categorias', name: 'Categorias', single: 'Categorias' },
    { path: '/usuarios', name: 'Usuarios', single: 'Usuarios' },
];

