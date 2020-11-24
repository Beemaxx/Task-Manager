const express = require('express')
const { translateAliases } = require('./model/task')
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










app.listen(port, () => {
    console.log('Server is up on ' +port)
})