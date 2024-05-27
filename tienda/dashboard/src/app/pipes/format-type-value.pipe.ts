import { Pipe, PipeTransform } from '@angular/core';

enum Type {
  INPUT = "INPUT",
  SELECT = "SELECT",
  TEXT = "TEXT",
  IMG = "IMG"
}

@Pipe({
  name: 'formatTypeValue'
})
export class FormatTypeValuePipe implements PipeTransform {

  transform(nombre: any, dataId: any): any {
    let type = Type.INPUT

    // Agregame todo lo que encuentres en mi select
    let selectDatas = [
      // Tienen que ser todos nuestros datos object que tengan true o false
      "availability",
      "isBestSeller",
      "isFeatured",
      "isNewArrival",
      "isSpecialOffer",
      "status",

    ]

    /* Lo que yo esté trayendo en mi nombre si es exactamente igual a imageUrls 
    que me traiga un typado que le pertenece a Type.IMG */
    if(nombre === 'imageUrls'){
      type = Type.IMG
    }

    if(selectDatas.includes(nombre)){
      type = Type.SELECT
    }


    return type;
  }

}
