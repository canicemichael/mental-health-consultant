const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Therapist = require('../models/therapist');
const CustomError = require("../helpers/CustomError");

//what can therapist do? //create a class
class TherapistsService {
    
    async signupTherapist(data){
        if (await Therapist.findOne({ email: data.email})) throw new CustomError("email already exists")
        if (await Therapist.findOne({ phone: data.phone})) throw new CustomError("phone number already exists");
        if (await Therapist.findOne({ licenceID: data.licenceID})) throw new CustomError("phone number already exists");

        const therapist = new Therapist(data);

        const token = await jwt.sign({ id: data._id, role: "therapist"}, 'mental-health');

        await therapist.save();

        return token;
    }

    async signinTherapist(data){ 
        if (!data.email) throw new CustomError('No email provided')
        if (!data.password) throw new CustomError('No password provided')

        const therapist = await Therapist.findOne({email: data.email})
        if(!therapist) throw new CustomError("User doesn't exist", 400)

        const isCorrect = await bcrypt.compare(data.password, therapist.password);

        if(!isCorrect) throw new CustomError('Invalid email or password');

        const token = await jwt.sign({id: data._id, role: "therapist"}, 'mental-health')

        return token;
    }

    async getTherapist(therapistId){
        const therapist = await Therapist.findById({_id: therapistId})
        if(!therapist) throw new CustomError('therapist does not exist', 404);
        return therapist;
    }

    async getTherapists(){
        return await Therapist.find({})
    }

    async editTherapist(therapistId, data){
        const therapist = await Therapist.findByIdAndUpdate({_id: therapistId}, data, {new: true});

        if (!therapist) throw new CustomError('therapist does not exist', 404)

        return therapist;
    }

    async deleteTherapist(therapistId){
        return await Therapist.findByIdAndRemove({ _id: therapistId })
    }
}

module.exports = new TherapistsService();