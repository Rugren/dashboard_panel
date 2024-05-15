import { Categorias } from "../models/categorias";
import { Productos } from "../models/productos";
import { Usuarios } from "../models/usuarios";

// Método que nos de las propiedades del objeto
export const getEntityProperties = (entity: string): Array<any> => {

    /*  Queremos coger "results: productos," o "results: categorias," 
    de la carpeta dashboard_panel\server\controllers (que ahí estará nuestra BD). En base a los resultados */
    let results: any = [];

    let entityClass: any;

    if(entity=="productos"){
        /* Productos lo recogerá de nuestros modelos: carpeta models/productos 
        (instanciamos a nuestros modelos, en este caso Productos) */
        entityClass = new Productos()
    }

    if(entity=="categorias"){
        entityClass = new Categorias()
    }

    if(entity=="usuarios"){
        entityClass = new Usuarios()
    }

    if(entityClass){
        // Esto trae mi objeto y no mis propiedades
        results = Object.keys(entityClass)
    }

    return results
}
