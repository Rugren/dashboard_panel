import { Productos } from "../models/productos";

// Método que nos de las propiedades del objeto
export const getEntityProperties = (entity: string): Array<any> => {

    /*  Queremos coger "results: productos," o "results: categorias," 
    de la carpeta dashboard_panel\server\controllers (que ahí estará nuestra BD). En base a los resultados */
    let results: any = [];

    let entityClass: any;

    if(entity=="productos"){
        // Productos lo recogerá de nuestros modelos: carpeta models/productos
        entityClass = new Productos()
    }

    if(entityClass){
        // Esto trae mi objeto y no mis propiedades
        results = Object.keys(entityClass)
    }

    return results
}