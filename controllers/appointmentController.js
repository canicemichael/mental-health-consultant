// what responses are we expecting to give users who use the appointment services

const { bookAppointment, cancelAppointment, acceptAppointment, approveAppointment, getAppointments, getOneAppointment } = require('../services/appointmentServices');
const { response } = require('../helpers/message');

class AppointmentController {
    async bookAppointment(req, res, next){
        const appointment = await bookAppointment(req.body);
        res.status(201).send(response("Appointment booked successfully", appointment))
    }

    async acceptAppointment(req, res, next){
        const appointment = await acceptAppointment(req.params.appointmentId);
        res.status(200).send(response("Appointment accepted", appointment))
    }

    async getOneAppointment(req, res, next){
        const appointment = await getOneAppointment(req.params.appointmentId);
        res.status(200).send(response("Appointment detail", appointment));
    }

    async getAppointments(req, res, next){
        const appointments = await getAppointments({})
        res.status(200).send(response("All Appointments", appointments));
    }

    async approveAppointment(req, res, next){
        const appointment = await approveAppointment(req.params.appointmentId);
        res.status(200).send(response("Appointment approved", appointment));
    }

    async cancelAppointment(req, res, next){
        const appointment = await cancelAppointment(req.params.appointmentId);
        res.status(200).send(response("Appointment canceled", appointment));
    }
}

module.exports = new AppointmentController();