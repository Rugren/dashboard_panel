import { Component } from '@angular/core';
import { routes } from './helpers/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
  
  routes: Array<any> = routes;

}
