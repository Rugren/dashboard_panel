const { Router } = require('express');
const { getProductos, getProductosID, crearProductos, actualizarProductos, eliminarProductos, getBuscar } = require('../controllers/productos');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');

const router = Router();

router.get('/', getProductos );

router.get('/:id', getProductosID );

    router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'El descripcion es obligatorio').not().isEmpty(),
        check('categoria', 'El categoria es obligatorio').not().isEmpty(),        
        check('precio_venta', 'El precio_venta es obligatorio').not().isEmpty(),
        check('precio_regular', 'El precio_regular es obligatorio').not().isEmpty(),
        check('slug', 'La slug es obligatoria').not().isEmpty(),
        validarCampos
    ], crearProductos );


router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'El descripcion es obligatorio').not().isEmpty(),
        check('categoria', 'El categoria es obligatorio').not().isEmpty(),        
        check('precio_venta', 'El precio_venta es obligatorio').not().isEmpty(),
        check('precio_regular', 'El precio_regular es obligatorio').not().isEmpty(),
        check('slug', 'La slug es obligatoria').not().isEmpty(),
        validarCampos
    ], actualizarProductos )

router.delete('/:id', eliminarProductos )

router.get('/productos/filtros', getBuscar );

module.exports = router;