const router = require('express').Router();
const { signinUser, signupUser, getUser, getUsers, editUser, deleteUser } = require('../controllers/userController');
const { isAdmin, isUser } = require('../middlewares/auth');


module.exports = function(){
    router.post('/signup', signupUser);
    router.post('/signin', signinUser);
    router.get('/',  getUsers);
    router.get('/:userId', isUser, getUser);
    router.put('/:userId', isUser, editUser);
    router.delete('/:userId', isUser, deleteUser);

    return router;
}