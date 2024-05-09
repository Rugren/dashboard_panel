const Categorias = require("../models/categorias");
const { response } = require('express');

const getCategorias = async(req, res = response ) => {

    const categorias = await Categorias.find({}, 'nombre descripcion');

    res.status(200).json({
        ok: true,
        results: categorias,
        isSuccess: true
    })
}

const getCategoriasID = async(req, res = response) => {

    const id = req.params.id;

    try {

        const categorias = await Categorias.findById(id)
        
        res.status(200).json({
            ok: true,
            results: categorias,
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

const crearCategorias = async (req, res) => {

    try {        

        //Instanciando los objetos
        const categorias = new Categorias( req.body );

        //Almacenar en la DB
        await categorias.save();
        
        res.json({
            ok: true,
            msg: 'Categoria agregada',
            results: categorias,
            isSuccess: true
        })

    } catch (error) {
        res.json({
            ok: false,
            msg: error
        })
    }


    
}

const actualizarCategorias = async (req, res) => {    
    const uid = req.params.id;
    let data = req.body;
    try {      
        const existeCategoriaDB = await Categorias.findById( uid );
        if( !existeCategoriaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Categoria con ese ID'
            })
        }      

        
        let reg = await Categorias.findByIdAndUpdate(uid, {
            nombre: data.nombre, 
            descripcion: data.descripcion,             
            updated_at: data.updated_at, 
            created_at: data.created_at,            
        });
        //Eliminar usuario        

        res.status(200).json({
            ok: true,
            msg: 'Categoria actualizada',
            categorias: reg,
            isSuccess: true
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Fatal Error',
        })    
    }

}

const eliminarCategorias = async (req, res) => {
    
    const uid = req.params.id;

    try {
        
        const existeCategoriaDB = await Categorias.findById( uid );

        if( !existeCategoriaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Categoria con ese ID'
            })
        }


        //Eliminar usuario
        await Categorias.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Categoria Eliminada'
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'No se encontro Categoria con ese ID',
            error
        })    
    }
}

const getBuscar = async(req, res = response ) => {

    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.desde) || 0;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' )

    const [categorias, total] = await Promise.all([
        // Categoria.find({}, 'nombre descripcion more_description stock categeria imageUrl precio_venta precio_regular slug brand currency status availability options isBestSeller isNewArrival isFeatured isSpecialOffer updated_at created_at')
            // .skip(desde).limit(5),
        Categorias.find({nombre: regex}).skip(desde).limit(hasta),        
        Categorias.count()
    ])

    res.status(200).json({
        ok: true,
        results: categorias,
        total,
        isSuccess: true
    })
}


module.exports = {
    getCategorias,
    getCategoriasID,
    crearCategorias,
    actualizarCategorias,
    eliminarCategorias,
    getBuscar

}