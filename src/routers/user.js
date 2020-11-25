const express = require('express')
const router = new express.Router()
const User = require('../model/user.js')

router.get('/test', (req,res)=>{
    res.send('This is a test')
})

router.post('/users', async (req,res)=>{
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
router.get('/users', async (req,res) => {

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
router.get('/users/:id', async (req,res) =>{

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

router.patch('/users/:id', async(req,res) => {
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

//Delete user

router.delete('/users/:id', async (req,res)=>{
    const UserID = req.params.id

    try {
        const DeleteUser = await User.findByIdAndDelete(UserID)

        if(!DeleteUser)
        {
            res.status(404).send()
        }
            res.status(200).send(DeleteUser + ' has been deleted')
    }catch(e) {
            res.status(404).send(e)
    }
})

module.exports = router