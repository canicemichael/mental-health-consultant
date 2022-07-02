const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CustomError = require("../helpers/CustomError");

//what can user do? the services that you offer for the user in the frontend //create a class
class UsersService {
    
    async signupUser(data){
        if (await User.findOne({ email: data.email})) throw new CustomError("email already exists")
        if (await User.findOne({ phone: data.phone})) throw new CustomError("phone number already exists");

        const user = new User(data);

        const token = await jwt.sign({ id: data._id, role: "user"}, 'mental-health');

        await user.save();

        return token;
    }

    //signinUser
    async signinUser(data){
        if (!data.email) throw new CustomError('No email provided')
        if (!data.password) throw new CustomError('No password provided')

        const user = await User.findOne({email: data.email})
        if(!user) throw new CustomError("User doesn't exist", 400)

        const isCorrect = await bcrypt.compare(data.password, user.password);

        if(!isCorrect) throw new CustomError('Invalid email or password');

        const token = await jwt.sign({id: data._id, role: "user"}, 'mental-health')

        return token;
    }

    async getUser(userId){
        const user = await User.findById({_id: userId})
        if(!user) throw new CustomError('User does not exist', 404);
        return user;
    }

    //getUsers //use isAdmin here
    async getUsers(){
        return await User.find({})
    }

    //editUser
    async editUser(userId, data){
        const user = await User.findByIdAndUpdate({_id: userId}, {$set: data}, {new: true});

        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );

        if (!user) throw new CustomError('User does not exist', 404)

        return user;
    }

    //deleteUser
    async deleteUser(userId){
        return await User.findByIdAndRemove({ _id: userId })
    }
}

module.exports = new UsersService();