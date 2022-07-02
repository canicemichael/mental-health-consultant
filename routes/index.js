const router = require('express').Router();
const userRoute = require('./userRoutes');
const therapistRoute = require('./therapistRoutes');
const appointmentRoute = require('./appointmentRoutes');

module.exports = function(app){
    router.use('/test', (req, res)=>{
        res.send("working yehh");
    })

    router.use('/users', userRoute());
    router.use('/therapists', therapistRoute());
    router.use('/appointments', appointmentRoute());

    return router;
}