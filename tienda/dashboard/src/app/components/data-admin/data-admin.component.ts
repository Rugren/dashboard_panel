import { Component } from '@angular/core';

@Component({
  selector: 'app-data-admin',
  templateUrl: './data-admin.component.html',
  styleUrl: './data-admin.component.css'
})
export class DataAdminComponent {

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