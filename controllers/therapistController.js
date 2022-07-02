// what response would we give therapist functions

const { signupTherapist, signinTherapist, getTherapist, getTherapists, editTherapist, deleteTherapist } = require('../services/therapistServices');
const { response } = require('../helpers/message');
const CustomError = require('../helpers/CustomError');

class TherapistController {
    async signupTherapist(req, res, next){
        const token = await signupTherapist(req.body);
        res.status(201).send(response("Account Created", token));
    }

    async signinTherapist(req, res, next){
        const token = await signinTherapist(req.body);
        res.status(200).send(response("User signed in", token));
    }

    async getTherapists(req, res, next){
        const therapists = await getTherapists({})
        res.status(200).send(response("All Therapists", therapists));
    }

    async getTherapist(req, res, next){
        const therapist = await getTherapist(req.params.userId)
        res.status(200).send(response("Therapist Detail", therapist));
    }

    async editTherapist(req, res, next){
        const therapist = await editTherapist(req.params.therapistId, req.body)
        if(req.params.therapistId != req.headers.therapist.id) throw new CustomError("Invalid therapist", 401)
        res.status(200).send(response("Profile Updated", therapist));
    }

    async deleteTherapist(req, res, next){
        const therapist = await deleteTherapist(req.params.therapistId);
        res.status(200).send(response("therapist deleted", therapist));
    }
}

module.exports = new TherapistController();