// when you these functions, this is respnose(res.send) you should give
const { signupUser, signinUser, getUser, getUsers, editUser, deleteUser } = require('../services/userServices')
const { response } = require('../helpers/message');
const CustomError = require('../helpers/CustomError');

class UserController {
    async signupUser(req, res, next){
        const token = await signupUser(req.body);
        res.status(200).send(response("Account Created", token));
    }

    async signinUser(req, res, next){
        const token = await signinUser(req.body);
        res.status(200).send(response("Signed In", token));
    }

    async getUser(req, res, next){
        const user = await getUser(req.params.userId);
        res.status(200).send(response("User detail", user))
    }

    async getUsers(req, res, next){
        const users = await getUsers({})
        res.status(200).send(response("All Users", users))
    }

    async editUser(req, res, next){
        const user = await editUser(req.params.userId, req.body)
        if(req.params.userId != req.headers.user.id) throw new CustomError("Invalid User", 401)
        res.status(200).send(response("Profile Updated", user));
    }

    async deleteUser(req, res, next){
        const user = await deleteUser(req.params.userId);
        res.status(200).send(response("User deleted", user));
    }
}

module.exports = new UserController();