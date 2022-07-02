const CustomError = require('../helpers/CustomError');
const Appointment = require('../models/appointment');

//what can user, therapist or admin do with appointment
class AppointmentsService {
    constructor(){
        this.updateAppointment = this.updateAppointment.bind()
        this.cancelAppointment = this.cancelAppointment.bind()
        this.approveAppointment = this.approveAppointment.bind()
        this.acceptAppointment = this.acceptAppointment.bind()
    }

    async bookAppointment(data){
        const appointment = new Appointment(data)

        appointment.save()

        return appointment;
    }

    //getappointments //only for admin user
    async getAppointments(){
        return await Appointment.find({})
    }

    //getOneAppointment //only for current user
    async getOneAppointment(appmtId){
        const appointment = await Appointment.findById({_id: appmtId})
        if (!appointment) throw new CustomError("Appointment does not exist", 404);

        return appointment;
    }

    async updateAppointment(appmtId, data){
        const appointment = await Appointment.findByIdAndUpdate({_id: appmtId}, data, {new: true})
        
        if(!appointment) throw new CustomError("Appointment not found", 404);

        return appointment;
    }

    //cancelappointment //check other apps and see who can cancel
    async cancelAppointment(appmtId){
        return await this.updateAppoinment(appmtId, {
            status: "canceled"
        })
    }

    //acceptappointment //
    async acceptAppointment(appmtId){
        return await this.updateAppoinment(appmtId, { status: "accepted" })
    }

    //approveappointment
    async approveAppointment(appmtId){
        return await this.updateAppoinment(appmtId, { status: "approved" })
    }
}

module.exports = new AppointmentsService();