const { Schema, model } =  require('mongoose');

const CarritosSchema = Schema({
    clientName: {
        type: String,
        required: true,
    },
    priceHT: {
        type: Number,
        required: true
    },
    priceTTC: {
        type: Number,
        required: true,
    },
    taxe: {
        type: Number, 
        required: false       
    },
    total: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    updated_at: {
        type: Date        
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

CarritosSchema.method('toJSON', function(){
    const { _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Carritos', CarritosSchema)