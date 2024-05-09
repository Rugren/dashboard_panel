const { Schema, model } =  require('mongoose');

const CategoriasSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    parentCategory: {
        type: String,
        required: false,
    },
    updated_at: {
        type: Date,         
    },
    created_at: {
        type: Date,
        default: Date.now    
    },   
    
},
{
    versionKey: false,
    timestamps: true
});

CategoriasSchema.method('toJSON', function(){
    const { _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Categorias', CategoriasSchema)