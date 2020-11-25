const express = require('express')
const { ObjectID } = require('mongodb')
const { translateAliases, update } = require('./model/task')
const Task = require('./model/task')
const User = require('./model/user')
require('./db/mongoose')
require('./model/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(500).send()
    }

    })
    
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })


// Find users
app.get('/users', async (req,res) => {

    try {
        const users = await User.find({})
        res.status(201).send(users)

    } catch(e) {
        res.status(500).send()
    }

    // User.find({}).then((users)=>{
    //     res.status(201).send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})
// Find by ID
app.get('/users/:id', async (req,res) =>{

    const userid = req.params.id

    try { 
        const user = await User.findById(userid)

        if(!user){
            return res.status(404).send()
    }
        res.send(user)
    } catch(e) {
            res.status(500).send()
    }
    // User.findById(userid).then((user) => {
    //     if (!user) {
    //         return res.status(400).send()
    //     }
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

//Find ID & Update

app.patch('/users/:id', async(req,res) => {
        const updates = Object.keys(req.body)
        const AllowedUpdates = ['name','email','password','age']
        const isValidOperation = updates.every((update)=> AllowedUpdates.includes(update))

        if(!isValidOperation){
            return res.status(400).send({error : 'Invalid Updates'})
        }
    
        const userid = req.params.id
    try {
        const update = await User.findByIdAndUpdate(userid, req.body, {new:true,runValidators: true})

        if(!userid){
            res.status(404).send()
        }
            res.send(update)
    }catch(e) {
            res.status(500).send()
    }
})




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
        res.status(500).send()
    }
})







app.listen(port, () => {
    console.log('Server is up on ' +port)
})