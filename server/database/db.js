const mongoose = require('mongoose');

//Crear la conexion a la DB

const dbCONN = async() => {
    try {
        await mongoose.connect( process.env.db_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(' Se conecto a la base de datos');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {
    dbCONN
}