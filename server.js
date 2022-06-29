require('express-async-errors');
const http = require('http')
const app = require('express')();
const server = http.createServer(app);

const port = process.env.PORT || 3040
const databaseConfig = require('./config/db');

const middlewares = require('./middlewares');
const routes = require('./routes');

const CustomError = require('./helpers/CustomError');
const errorHandler = require('./middlewares/errorHandler');

middlewares(app);

app.use('/api', routes());

app.use((req, res, next) => {
    throw new CustomError("Invalid Request", 400)
})

app.use(errorHandler);

server.listen(port, () => {
    console.log(`:: server started at port ${port}`)
    databaseConfig()
})