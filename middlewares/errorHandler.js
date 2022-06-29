const CustomError = require('../helpers/CustomError');
const {response} = require('../helpers/message');

module.exports = (error, res, req, next) => {
    console.log(error);

    if(error instanceof CustomError ){
        res.status(400).send(response(error.message, null, false));
    } else if ( error.name == "CastError"){
        res.status(400).send(response('Invalid ID', null, false))
    } else if ( error.name == "JsonWebTokenError" ){
        res.status(400).send(response(error.message, null, false));
    } else if ( error.name == "ValidationError" ){
        res.status(400).send(response(error.message, null, false));
    } else if ( error.name == "SyntaxError" ){
        res.status(400).send(response(error.message, null, false));
    } else {
        res.status(500).send(response("Internal Error", null, false));
    }
}