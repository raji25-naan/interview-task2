import mongoose from 'mongoose';

const user = new mongoose.Schema({

    image : {
        type : String
    },

    name : {
        type : String,
    },
        password : {
            type : String,
        },
    mobileNo : {
        type : Number,
    },
    otp : {
        type : Number
    },
    otpVerified : {
        type : Boolean,
        default : false
    },
    token : {
        type : String
    }
});

export const UserModel = mongoose.model('user', user);