const mongoose = require('mongoose')



const taskSchema = new mongoose.Schema( {
    Description : 
    {   type :String,
        require: true,
        trim: true
    }, 
    Completed : 
    {   type : Boolean,
        default: false
    }, 
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref: 'User',
       
    }, 
},{timestamps:true},
{ toJSON: {virtuals:true}})

taskSchema

const Task = mongoose.model('Task', taskSchema)


module.exports = Task