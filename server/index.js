const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbCONN } = require('./database/db');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Crear nuestro servidor

const app = express();

dbCONN();   
//cors
app.use( cors() );
//Lectura de un json
app.use( express.json() )

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node JS API',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./index.js']
}

//Configuración del swagger
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/productos', require('./routes/productos'));
app.use('/categorias', require('./routes/categorias'));
app.use('/usuarios', require('./routes/usuarios'));

// *******Productos***********

/**
 * @swagger
 *  components:
 *      schemas:
 *          productos:
 *              type: object
 *              properties:
 *                  nombre:
 *                      type: string
 *                  descripcion:
 *                      type: string
 *                  more_description:
 *                      type: string
 *                  stock:
 *                      type: string
 *                  categoria:
 *                      type: string
 *                  imageUrls:
 *                      type: string
 *                  precio_venta:
 *                      type: string
 *                  precio_regular:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  brand:
 *                      type: string
 *                  currency:
 *                      type: string
 *                  status:
 *                      type: string
 *                  availability:
 *                      type: string
 *                  options:
 *                      type: string
 *                  isBestSeller:
 *                      type: string
 *                  isNewArrival:
 *                      type: string
 *                  isFeatured:
 *                      type: string
 *                  isSpecialOffer:
 *                      type: string
 *                  updated_at:
 *                      type: string
 *                  created_at:
 *                      type: string
 */

/**
 * @swagger
 * /productos/:
 *  get:
 *      summary: Este metodo GET nos muestra los productos
 *      description: Este metodo GET nos muestra los productos
 *      responses:
 *          200:
 *              description: Test al metodo GET con mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/productos'
 */

/**
 * @swagger
 * /productos/{id}:
 *  get:
 *      summary: Este metodo GET ID nos muestra un producto en especifico
 *      description: Este metodo GET ID nos muestra un producto en especifico
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: El ID es requerido
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Test al metodo GET con mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/productos'
 */

/**
 * @swagger
 * /productos/:
 *  post:
 *      summary: Este metodo POST nos agrega los productos
 *      description: Este metodo POST nos agrega los productos
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:                          
 *                      $ref: '#components/schemas/productos'
 *      responses:
 *          200:
 *              description: Agregado satisfactoriamente
 */

/**
 * @swagger
 * /productos/{id}:
 *  put:
 *      summary: Este metodo PUT nos actualiza los productos
 *      description: Este metodo PUT nos actualiza los productos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: El ID es requerido
 *          schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:                          
 *                      $ref: '#components/schemas/productos'
 *      responses:
 *          200:
 *              description: Actualizado satisfactoriamente
 *              content:
 *                  application/json:
 *                      schema:   
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/productos'
 */

/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *      summary: Este metodo DELETE nos elimina los productos
 *      description: Este metodo DELETE nos elimina los productos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: El ID es requerido
 *          schema:
 *              type: string 
 *      responses:
 *          200:
 *              description: Eliminado satisfactoriamente
 *              content:
 *                  application/json:
 *                      schema:   
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/productos'
 */

/**
 * @swagger
 * /productos/productos/filtros:
 *  get:
 *      summary: Este metodo GET nos muestra los productos
 *      description: Este metodo GET nos muestra los productos
 *      responses:
 *          200:
 *              description: Test al metodo GET con mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/productos'
 */

// *******Usuarios***********

/**
 * @swagger
 *  components:
 *      schemas:
 *          usuarios:
 *              type: object
 *              properties:
 *                  nombre:
 *                      type: string
 *                  email:
 *                      type: string
 *                  roles:
 *                      type: string
 *                  tags:
 *                      type: string
 *                  online:
 *                      type: string
 *                  isVerified:
 *                      type: string
 *                  receivePromoMessage:
 *                      type: string
 *                  created_at:
 *                      type: string
 */

/**
 * @swagger
 * /usuarios/:
 *  get:
 *      summary: Este metodo GET nos muestra los usuarios
 *      description: Este metodo GET nos muestra los usuarios
 *      responses:
 *          200:
 *              description: Test al metodo GET con mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/usuarios'
 */

/**
 * @swagger
 * /usuarios/{id}:
 *  get:
 *      summary: Este metodo GET ID nos muestra un usuario en especifico
 *      description: Este metodo GET ID nos muestra un usuario en especifico
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: El ID es requerido
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Test al metodo GET con mongoDB
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/usuarios'
 */

/**
 * @swagger
 * /usuarios/:
 *  post:
 *      summary: Este metodo POST nos agrega los usuarios
 *      description: Este metodo POST nos agrega los usuarios
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:                          
 *                      $ref: '#components/schemas/usuarios'
 *      responses:
 *          200:
 *              description: Agregado satisfactoriamente
 */

/**
 * @swagger
 * /usuarios/{id}:
 *  put:
 *      summary: Este metodo PUT nos actualiza los usuarios
 *      description: Este metodo PUT nos actualiza los usuarios
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: El ID es requerido
 *          schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:                          
 *                      $ref: '#components/schemas/usuarios'
 *      responses:
 *          200:
 *              description: Actualizado satisfactoriamente
 *              content:
 *                  application/json:
 *                      schema:   
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/usuarios'
 */

/**
 * @swagger
 * /usuarios/{id}:
 *  delete:
 *      summary: Este metodo DELETE nos elimina los usuarios
 *      description: Este metodo DELETE nos elimina los usuarios
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: El ID es requerido
 *          schema:
 *              type: string 
 *      responses:
 *          200:
 *              description: Eliminado satisfactoriamente
 *              content:
 *                  application/json:
 *                      schema:   
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/usuarios'
 */

app.listen( process.env.PORT, () => {
    console.log(`Conectado al puerto ${ process.env.PORT } `);
})