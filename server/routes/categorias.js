const { Router } = require('express');
const { getCategorias, getCategoriasID, crearCategorias, actualizarCategorias, eliminarCategorias, getBuscar } = require('../controllers/categorias');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');

const router = Router();

router.get('/', getCategorias );

router.get('/:id', getCategoriasID );

    router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),        
        validarCampos
    ], crearCategorias );


router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),        
        validarCampos
    ], actualizarCategorias )

router.delete('/:id', eliminarCategorias )

router.get('/categorias/filtros', getBuscar );

module.exports = router;