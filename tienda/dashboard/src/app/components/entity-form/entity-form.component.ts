import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EntityService } from '../../services/entity.service';

// Para que funcione el .js de la función "initSelect" 
declare var $: any;

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css'
})
export class EntityFormComponent implements OnInit {

  @Input() entityNames: Array<any> = []
  @Input() dataId: any;

  form: any;
  categorias: any;

  constructor(private fb: FormBuilder, private entityService:EntityService) { }
  
  ngOnInit(): void {

    // ANOTAR AQUÍ LOS CAMPOS QUE NO QUERAMOS QUE NOS MUESTRE en la web:
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
      /* Poniendo esto también funcionaría: 
      return nombre !== 'created_at' && nombre !== 'updated_at'; */
    })


    // Para traer categorías
    this.entityService.getDatas('categorias').subscribe({
      next: (data: any) => {
        const { isSuccess, results } = data;
        if (isSuccess && results) {
          this.categorias = results;
        console.log('Nuestra categoria que traemos de data', this.categorias)
        }
        // console.log('Nuestra data que traemos de categorias', data)
      },
      error: (error: any) => {
        console.log(error)
      }
    })

    // Inicializar el formulario creado. Para que al inicializar también coja la función de "initForm()" hecha abajo.
    this.initForm()
    // Inicializar la función de seleccionar las categorías
    this.initSelect()
  }


  // Función del formulario (para recolectar los datos y editarlos)
  initForm() {
    let formObject = {}; // Que nos traiga los datos (del -form action=""- de entity-form.component.html )
    // El recorrido de entityNames con el forEach nos va a dar un valor que lo hemos llamado "nombre"
    this.entityNames.forEach((nombre: any) => {
      // Declaramos el valor(nombrado "value") que nos tragia la dataId y enviamos al "nombre"(para que ya me traiga consigo todo el recorrido que está haciendo)
      let value = this.dataId[nombre]
      /* Para formObject, que me traiga consigo todo lo que encontró en "nombre"
      Y conéctate a .fb(declararlo en el constructor e importarlo) y tráeme un ".control" con los valores(value) del Validators(del formulario)
      Todos los que vienen en el campo "nombre", deben ser captados */
      formObject = {...formObject, [nombre]: this.fb.control(value, [Validators.required])}
    })
    /* [clg + tab y nos crea el console.log automáticamente]
    Creado para ver qué nos está trayendo */
    console.log(formObject)
    // Nuestro form(arriba declarado) va a ser igual a lo que fb nos traiga agrupado del formObject.
    this.form = this.fb.group(formObject)
  }

  /* Función para arrancar el código del select2 https://select2.org/getting-started/basic-usage copiar lo de "In your Javascript"
  declarar el $ arriba */
  initSelect() {
    $(document).ready(function () {
      // $('.js-example-basic-multiple').select2();
      $('.select-category').select2();
    });
  }

  // Función manejo de envíos (Para el botón de "Actualizar")
  handleSubmit() {
    // Esto es para ver si me coje los datos y me los guarda(no en la BD) cuando los edito (Dándole al botón de "Actualizar")
    console.log(this.form.value)
  }



}
