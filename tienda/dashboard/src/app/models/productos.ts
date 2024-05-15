
export class Productos {
    nombre: string = '';
    descripcion: string = '';
    more_description: string = '';
    stock: number = 0;
    // categoria: string[] = []; // (Así si fuera una cadena de texto simple que se guardase)
    categoria: Array<any> = [];
    imageUrls: Array<any> = [];
    precio_venta: number = 0;
    precio_regular: number = 0;
    slug: string = '';
    brand: string = '';
    currency: string = 'USD';
    status: boolean = false;
    availability: boolean = false;
    // options: string = ''; // Este campo sale en la BD, pero no en el vídeo https://www.youtube.com/watch?v=FuY9f5-Qx20&list=PLRfcnifbUdc2wkM2go6al7ZnJjOWY6cvW&index=42 1h 43min 58seg.
    isBestSeller: boolean = false;
    isNewArrival: boolean = false;
    isFeatured: boolean = false;
    isSpecialOffer: boolean = false;
    // updated_at: string = '';
    updated_at: Date|null = null;
    created_at: Date|null = null;

}
