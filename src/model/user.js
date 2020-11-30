const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('Jsonwebtoken')

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
        unique: true,
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
    }, tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

//create token generator

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString() }, 'sampletoken') //*** Secret key ***

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


//create new function
UserSchema.statics.findByCredentials = async (email, password) => {
    
    const user = await User.findOne({ email })
    console.log(user)

    if(!user) {

        throw new Error('Unable to log in')
    }

    const isMatched = await bcrypt.compare( password, user.password)


    if(!isMatched) {
        throw new Error('Unable to log in')
    }
    
    return user
}

//Hash the plain text password before saving
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