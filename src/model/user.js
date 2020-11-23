const mongoose = require('mongoose')
const validator = require('validator')


const User = mongoose.model('User',{
    name: {
        type: String,
        require : true,
        trim : true
    },
    age : {
        type: Number,
        default: 0,
        validate(value){
            if(value<0) {
                throw new Error('Age must be > 0')
            }
        }
    }, email : {
        type: String,
        trim: true,
        tolowercase: true ,
        require: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw  new Error('Email is not valid')
            }
        }
    }, password : {
        type : String,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain password')
            }
        }
    }
})

module.exports = User