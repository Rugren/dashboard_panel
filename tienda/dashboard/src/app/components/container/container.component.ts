import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent implements OnInit {

  pagePath: string ='';
  datas: any;

  constructor(private route: ActivatedRoute, private entityService: EntityService) {}

  ngOnInit(): void {
    this.initComponent();
    // console.log(this.route);

    this.entityService.getDatas(this.pagePath).subscribe({
      next: (data: any) => {
        const { isSuccess, results } = data;
        if (isSuccess && results ) {
          this.datas = results;
          
          console.log(this.datas);
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    });

  }

  initComponent (){
    this.pagePath = this.route.snapshot.url[0]?.path || 'productos';
    console.log(this.pagePath); // nos mostrará por consola si estamos en productos, categorias o usuarios. Si hay un error, manda a productos.
  }

}
