import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css'
})
export class EntityFormComponent {

  @Input() entityNames: Array<any> = []
  @Input() dataId: any;

}
