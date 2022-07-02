const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
    {
        //a program to choose from therapists that are avaibable
        therapist:{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'therapist is required']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'userID is required']
        },
        duration: {
            type: Number,
            required: [true, 'Duration is required']
        },
        location: {
            type: String,
            required: [true, 'Location is required']
        },
        dateAndTime: {
            type: Date,
            min: '2022-05-25',
            max: '2030-11-25',
            default: '2022-05-25'
        },
        phone:{
            type: Number,
            required: [true, 'phone number is required']
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'canceled', 'accepted'],
            default: 'pending',
            lowercase: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Appointment', AppointmentSchema);