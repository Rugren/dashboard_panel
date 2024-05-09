const { Schema, model } = require('mongoose');

const UsuariosSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    roles: {
        type: Array,
        required: false
    },
    tags: {
        type: Array,
        required: false
    },
    online: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    receivePromoMessage: {
        type: Boolean,
        default: false
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

UsuariosSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuarios', UsuariosSchema)