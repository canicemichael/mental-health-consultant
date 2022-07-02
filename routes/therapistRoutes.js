const router = require('express').Router();
const { signupTherapist, signinTherapist, getTherapist, getTherapists, editTherapist, deleteTherapist } = require('../controllers/therapistController');
const { isAdmin, isUser, isTherapist } = require('../middlewares/auth');


module.exports = function(){
    router.post('/signup', signupTherapist);
    router.post('/signin', signinTherapist);
    router.get('/', isAdmin, getTherapists);
    router.get('/:therapistId', isTherapist, getTherapist);
    router.put('/:therapistId', isTherapist, editTherapist);
    router.delete('/:therapistId', isTherapist, deleteTherapist);

    return router;
}