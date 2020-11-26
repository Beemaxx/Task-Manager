const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema( {
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

UserSchema.pre('save', async function (next){
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    console.log ('Just before Saving')
    next()
})


const User = mongoose.model('User', UserSchema)

module.exports = User