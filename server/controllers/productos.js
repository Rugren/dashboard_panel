const Productos = require("../models/productos");
const { response } = require('express');

const getProductos = async(req, res = response ) => {

    const productos = await Productos.find({}, 'nombre descripcion more_description stock categoria imageUrls precio_venta precio_regular slug brand currency status availability options isBestSeller isNewArrival isFeatured isSpecialOffer updated_at created_at');

    res.status(200).json({
        ok: true,
        results: productos,
        isSuccess: true
    })
}

const getProductosID = async(req, res = response) => {

    const id = req.params.id;

    try {

        const productos = await Productos.findById(id)
        
        res.status(200).json({
            ok: true,
            results: productos,
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

const crearProductos = async (req, res) => {

    try {        

        //Instanciando los objetos
        const productos = new Productos( req.body );

        //Almacenar en la DB
        await productos.save();
        
        res.json({
            ok: true,
            msg: 'Producto agregado',
            results: productos,
            isSuccess: true
        })

    } catch (error) {
        res.json({
            ok: false,
            msg: error
        })
    }


    
}

const actualizarProductos = async (req, res) => {    
    const uid = req.params.id;
    let data = req.body;
    try {      
        const existeProductoDB = await Productos.findById( uid );
        if( !existeProductoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe producto con ese ID'
            })
        }      

        
        let reg = await Productos.findByIdAndUpdate(uid, {
            nombre: data.nombre, 
            descripcion: data.descripcion, 
            more_description: data.more_description, 
            stock: data.stock, 
            categoria: data.categoria, 
            imageUrls: data.imageUrls,
            precio_venta: data.precio_venta, 
            precio_regular: data.precio_regular, 
            slug: data.slug, 
            brand: data.brand, 
            currency: data.currency, 
            status: data.status, 
            availability: data.availability, 
            options: data.options, 
            isBestSeller: data.isBestSeller, 
            isNewArrival: data.isNewArrival, 
            isFeatured: data.isFeatured, 
            isSpecialOffer: data.isSpecialOffer, 
            updated_at: data.updated_at, 
            created_at: data.created_at,            
        });
        //Eliminar usuario        

        res.status(200).json({
            ok: true,
            msg: 'Producto actualizado',
            productos: reg,
            isSuccess: true
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Fatal Error',
        })    
    }

}

const eliminarProductos = async (req, res) => {
    
    const uid = req.params.id;

    try {
        
        const existeProductoDB = await Productos.findById( uid );

        if( !existeProductoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe producto con ese ID'
            })
        }


        //Eliminar usuario
        await Productos.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Producto Eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'No se encontro producto con ese ID',
            error
        })    
    }
}

const getBuscar = async(req, res = response ) => {

    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.desde) || 0;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' )

    const [productos, total] = await Promise.all([
        // Productos.find({}, 'nombre descripcion more_description stock categeria imageUrl precio_venta precio_regular slug brand currency status availability options isBestSeller isNewArrival isFeatured isSpecialOffer updated_at created_at')
            // .skip(desde).limit(5),
        Productos.find({}, 'nombre descripcion more_description stock categoria imageUrls precio_venta precio_regular slug brand currency status availability options isBestSeller isNewArrival isFeatured isSpecialOffer updated_at created_at')
            .skip(desde).limit(hasta),        
        Productos.count()
    ])

    res.status(200).json({
        ok: true,
        results: productos,
        total,
        isSuccess: true,
        current: 1,
        next: 2,
        previous: null
    })
}


module.exports = {
    getProductos,
    getProductosID,
    crearProductos,
    actualizarProductos,
    eliminarProductos,
    getBuscar

}