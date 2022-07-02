const mongoose = require('mongoose');
const uri = 'mongodb+srv://canice:mental-health@cluster0.te4nyfn.mongodb.net/?retryWrites=true&w=majority'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}

module.exports = function initDB(){
    mongoose
        .connect(uri, options)
        .then( () =>
            console.log('Connected to database')
        )
        .catch((err) => console.log(`Failed to connect to db `, err))
}