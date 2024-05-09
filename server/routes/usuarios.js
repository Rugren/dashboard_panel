const { Router } = require('express');
const { getUsuarios, getUsuariosID, crearUsuarios, actualizarUsuarios, eliminarUsuarios } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');

const router = Router();

router.get('/', getUsuarios );

router.get('/:id', getUsuariosID );

    router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').not().isEmpty(),        
        validarCampos
    ], crearUsuarios );


router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').not().isEmpty(),                                
        validarCampos
    ], actualizarUsuarios )

router.delete('/:id', eliminarUsuarios )


module.exports = router;