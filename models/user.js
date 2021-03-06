const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, 'name is required']
        },
        phone:{
            type: Number,
            required: [true, 'phone number is required']
        },
        email: {
            type: String,
            required: [true, 'email is required']
        },
        password: {
            type: String,
            required: [true, 'password is required']
        },
        address: {
            type: String
        },
        imgUrl: {
            type: String,
            default: '/uploads/defaultImg.png'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        appointments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Appointment'
            }
        ]
    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', async function(next){
    try {
        const salt = 10;
        let hash = await bcrypt.hash(this.password, salt)
        this.password = hash
    } catch (error) {
        next(error)
    }
    next()
})

module.exports = mongoose.model('Users', UserSchema);