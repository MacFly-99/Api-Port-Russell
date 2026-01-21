const mongoose = require('mongoose');

const clientOptions = {
    dbName: 'api-port-russell'
};

exports.initClientDbConnection = async () => {
    console.log('URL utilisée :', process.env.URL_MONGO);
    if (!process.env.URL_MONGO) {
        throw new Error('URL_MONGO manquante dans .env !');
    }
    await mongoose.connect(process.env.URL_MONGO, clientOptions);
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
        throw error;
    }
}