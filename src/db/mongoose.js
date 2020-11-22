const mongoose = require('mongoose')

mongoose.connect(('mongodb://127.0.0.1:27017/task-manager-api'),{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}) 

const User = mongoose.model('User',{
    name: {
        type: String,
        require : true
    },
    age : {
        type: Number,
        validate(value){
            if(value<0) {
                throw new Error('Age must be > 0')
            }
        }
    }
})

const testuser = new User({
    name: 'Mike',
    age: -1
})

testuser.save().then(()=>{
    console.log(testuser)
}).catch((error) => {
    console.log('Error',error)
})



const Task = mongoose.model('Task', {
    Description : 
    { type :String 
    }, 
    Completed : 
    { type : Boolean 
    }
})

// const sampletask = new Task({
//     Description: "Clean the house",
//     Completed: true
// }) 

// sampletask.save().then(()=>{
//     console.log(sampletask)
// }).catch((error)=>{
//     console.log('Error', error)
// })

