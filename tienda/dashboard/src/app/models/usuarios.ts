
export class Usuarios {
    nombre: string = '';
    email: string = '';

/*  Estos campos no puestos, al menos no se ven en el panel (1h 48min 10seg.) https://www.youtube.com/watch?v=FuY9f5-Qx20&list=PLRfcnifbUdc2wkM2go6al7ZnJjOWY6cvW&index=42
    roles: string = '';
    tags: string = '';
    online: boolean = false; // Se supone que es un booleano que indica si el usuario está en línea o no
    isVerified: boolean = false; // Se asume que es un booleano que indica si el usuario ha verificado su cuenta
    receivePromoMessage: boolean = false; // Booleano que indica si el usuario desea recibir mensajes o correos promocionales
*/

    /* created_at: string = ''; // Debería ser una cadena que represente la fecha y hora de creación del usuario 
    (pero puesto como en productos.ts) */
    created_at: Date|null = null;
}

/*
{
    "nombre": "string",
    "email": "string",
    "roles": "string",
    "tags": "string",
    "online": "string",
    "isVerified": "string",
    "receivePromoMessage": "string",
    "created_at": "string"
}

{
    "email": "alicesmith@example.com",
    "roles": [],
    "tags": [],
    "online": false,
    "isVerified": false,
    "receivePromoMessage": false,
    "created_at": "2023-07-26T04:09:59.122Z",
    "nombre": "Alice Smith",
    "uid": "64c09c996827cf2a46cb6788"
}
*/
