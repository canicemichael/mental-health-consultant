const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Therapist = require('../models/therapist');
const CustomError = require('../helpers/CustomError');
const { response } = require('../helpers/message');

async function isTherapist(req, res, next){
    const decoded = await jwt.verify(req.headers.token, 'mental-health')

    const therapist = await Therapist.findOne({_id: decoded.id})

    if (!therapist) throw new CustomError('therapist does not exist');

    if(decoded.role == 'therapist'){
        req.headers.therapist = decoded;
        next();
    } else {
        throw new CustomError('Unauthorized user', 401);
    }
}

async function isUser(req, res, next){
    const decoded = await jwt.verify(req.headers.token, 'mental-health')

    const user = await User.findOne({_id: decoded.id})

    if (!user) throw new CustomError('user does not exist');
    
    if(decoded.role == 'user'){
        req.headers.user = decoded;
        next();
    } else {
        throw new CustomError('Unauthorized user', 401);
    }
}

// another authentication level isAdmin
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        jwt.verify(authHeader, 'mental-health', (err, user) => {
            if (err) res.status(403).send(response("Token is not valid", 403));
            req.user = user;
            next();
        })
    } else {
        return res.status(401).send(response("Unauthorized user", 401))
    }
}

function verifyTokenAndAdmin(req, res, next){
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that!', 403)
            console.log("Unauthorized user testing Admin route");
        }
    })
}

module.exports.isTherapist = isTherapist;
module.exports.isUser = isUser;
module.exports.isAdmin = verifyTokenAndAdmin;