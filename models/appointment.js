const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const AppointmentSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, 'name is required']
        },
        location: {
            type: String,
            required: [true, 'location is required']
        },
        dateAndTime: {
            type: Date,
            min: '2022-05-25',
            max: '2030-11-25'
        },
        phone:{
            type: Number,
            required: [true, 'phone number is required']
        },
        email: {
            type: String,
            required: [true, 'email is required']
        }
    }
)
