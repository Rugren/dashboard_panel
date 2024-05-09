const { Schema, model } =  require('mongoose');

const ProductosSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    more_description: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: false
    },
    categoria: {
        type: Array,
        required: true
    },
    imageUrls: {
        type: Array, 
        required: false       
    },
    precio_venta: {
        type: Number,
        required: true,
    },
    precio_regular: {
        type: Number,
        required: true
    },    
    slug: {
        type: String,
        default: true
    },
    brand: {
        type: String,
        default: 'Sin Marca'
    },
    currency: {
        type: String,
        default: 'USD ($)'       
    },
    status: {
        type: Boolean,
        default: false        
    },
    availability : {
        type: Boolean,       
        default: false
    },
    options : {
        type: String       
    },
    isBestSeller : {
        type: Boolean,
        default: false
    },
    isNewArrival : {
        type: Boolean,
        default: false
    },
    isFeatured : {
        type: Boolean,
        default: false
    },
    isSpecialOffer : {
        type: Boolean,
        default: false
    },
    updated_at  : {
        type: Date        
    },
    created_at: {
        type: Date,
        default: Date.now        
    }
    
},
{
    versionKey: false,
    timestamps: true
});

ProductosSchema.method('toJSON', function(){
    const { _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Productos', ProductosSchema)