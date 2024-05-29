import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css'
})
export class EntityFormComponent implements OnInit {

  @Input() entityNames: Array<any> = []
  @Input() dataId: any;

  constructor() { }
  
  ngOnInit(): void {

    // ANOTAR AQUÍ LOS CAMPOS QUE NO QUERAMOS QUE NOS MUESTRE:
    this.entityNames = this.entityNames.filter((nombre: string) => {
      // Si contiene el campo 'created_at', que no nos lo muestre.
      if (nombre === 'created_at') {
        return false;
      }
      // Si contiene el campo 'updated_at', que no nos lo muestre.
      if (nombre === 'updated_at') {
        return false;
      }

      return true;
    })
    
  }

}
