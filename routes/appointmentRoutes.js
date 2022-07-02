const router = require('express').Router();
const { bookAppointment, getAppointments, getOneAppointment, acceptAppointment, approveAppointment, cancelAppointment, } = require('../controllers/appointmentController');
const { isAdmin, isUser, isTherapist } = require('../middlewares/auth');


module.exports = function(){
    router.post('/', isUser, bookAppointment);
    router.get('/', isAdmin, getAppointments);
    router.get('/:appointmentId', getOneAppointment);
    router.post('/:appointmentId/accept', acceptAppointment);
    router.post('/:appointmentId/approve', approveAppointment);
    router.post('/:appointmentId/cancel', cancelAppointment);

    return router;
}

module.exports = router;