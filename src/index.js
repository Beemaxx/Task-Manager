const express = require('express')
const { ObjectID } = require('mongodb')
const { translateAliases, update } = require('./model/task')
const Task = require('./model/task')
const User = require('./model/user')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
require('./db/mongoose')
require('./model/user')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.post('/tasks', async (req,res)=>{ 
    const task = new Task(req.body)

    try { 
        await  task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(500).send()
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })

})


app.get('/tasks', async (req,res) => {
    
    try { 
        const task = await Task.find({})
        res.status(201).send(task)
    } catch(e){
        res.status(500).send()
    }

    // Task.find({}).then((task) => {
    //     res.status(201).send(task)
    // }).catch((error) =>{ 
    //     res.status(400).send(error)
    // })
})


app.get('/tasks/:id' , async (req,res) => {

    const taskid = req.params.id

    try { 
        const task = await Task.findById(taskid)

        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)

    } catch(e) {
        res.status(500).send()
    }

    // Task.findById(taskid).then((task)=>{
    //     if(!task){
    //        return res.status(404).send()
    //     }
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(500).send()
    // })

})

//Find Task ID and update

app.patch('/tasks/:id', async (req,res) =>{

    const TaskUpdates = Object.keys(req.body)
    const AllowedTasksUpdates = ['Completed','Description']
    const TaskUpdateisValid = TaskUpdates.every((update) => AllowedTasksUpdates.includes((update)))
   
    if (!TaskUpdateisValid){
        res.status(400).send({error :'Update is invalid'})
    }
    const taskid = req.params.id

    try {
        const task = await Task.findByIdAndUpdate(taskid, req.body, {new:true,runValidators:true})

        if(!taskid){
            res.status(404).send()
        }
            res.status(200).send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

//Delete Tasks

app.delete('/Tasks/:id', async (req,res)=>{
    const TaskID = req.params.id

    try {
        const DeleteTask = await Task.findByIdAndDelete(TaskID)

        if(!DeleteTask)
        {
            res.status(404).send()
        }
            res.status(200).send(DeleteTask + ' has been deleted')
    }catch(e) {
            res.status(404).send(e)
    }
})






app.listen(port, () => {
    console.log('Server is up on ' +port)
})