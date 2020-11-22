const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(('mongodb://127.0.0.1:27017/task-manager-api'),{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}) 

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

// const testuser = new User({
//     name: '    Mike',
//     age: 15,
//     email: 'aAABC@abc.com',
//     password: 'aaPasswordaa'
// })

// testuser.save().then(()=>{
//     console.log(testuser)
// }).catch((error) => {
//     console.log('Error',error)
// })



const Task = mongoose.model('Task', {
    Description : 
    { type :String,
        require: true,
        trim: true
    }, 
    Completed : 
    { type : Boolean,
        default: false
    }
})

const sampletask = new Task({
    Description: "Clean the house             ",
}) 

sampletask.save().then(()=>{
    console.log(sampletask)
}).catch((error)=>{
    console.log('Error', error)
})

