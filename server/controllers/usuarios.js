const Usuarios = require("../models/usuarios");
const { response } = require('express');

const getUsuarios = async(req, res = response ) => {

    const usuarios = await Usuarios.find({}, 'nombre email roles tags online isVerified receivePromoMessage created_at');

    res.status(200).json({
        ok: true,
        results: usuarios,
        isSuccess: true
    })
}

const getUsuariosID = async(req, res = response) => {

    const id = req.params.id;

    try {

        const usuarios = await Usuarios.findById(id)
        
        res.status(200).json({
            ok: true,
            results: usuarios,
            isSuccess: true
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error Fatal'
        })
    }
}

const crearUsuarios = async (req, res) => {

    try {        

        //Instanciando los objetos
        const usuarios = new Usuarios( req.body );

        //Almacenar en la DB
        await usuarios.save();
        
        res.json({
            ok: true,
            msg: 'Usuarios agregado',
            results: usuarios,
            isSuccess: true
        })

    } catch (error) {
        res.json({
            ok: false,
            msg: error
        })
    }


    
}

const actualizarUsuarios = async (req, res) => {    
    const uid = req.params.id;
    let data = req.body;
    try {      
        const existeUsuarioDB = await Usuarios.findById( uid );
        if( !existeUsuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese ID'
            })
        }      

        
        let reg = await Usuarios.findByIdAndUpdate(uid, {
            nombre: data.nombre,
            descripcion: data.descripcion,
            categeria: data.categeria,
            imageUrl: data.imageUrl,
            precio_venta: data.precio_venta,
            precio_regular: data.precio_regular,
            slug: data.slug
        });
        //Eliminar usuario        

        res.status(200).json({
            ok: true,
            msg: 'Usuarios actualizado',
            results: reg,
            isSuccess: true
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Fatal Error',
        })    
    }

}

const eliminarUsuarios = async (req, res) => {
    
    const uid = req.params.id;

    try {
        
        const existeUsuarioDB = await Usuarios.findById( uid );

        if( !existeUsuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese ID'
            })
        }


        //Eliminar usuario
        await Usuarios.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'No se encontro usuario con ese ID',
            error
        })    
    }
}




module.exports = {
    getUsuarios,
    getUsuariosID,
    crearUsuarios,
    actualizarUsuarios,
    eliminarUsuarios

}