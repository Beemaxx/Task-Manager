const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const User = require('../model/user.js')
const multer = require('multer')
const sharp = require('sharp')

router.get('/test', (req,res)=>{
    res.send('This is a test')
})

// Create a new User //
router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch(e) {
        res.status(400).send(e)
    }

    })
    
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })

//Logging in for Users

router.post('/users/login', async (req,res) => {
   // console.log(req.body.email, req.body.password)
    try { 
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch(e) {
       res.status(400).send()
    }
})

//Logging out for Users in single session

router.post('/users/logout' , auth, async (req,res) => { 
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
            
        })

        await req.user.save()

        res.send()

    }catch(e) {

        res.status(500).send()

    }
})


//Logging out for Users in all sessions

router.post('/users/logoutall', auth, async (req,res) => {
    try {
        req.user.tokens = []
        
        await req.user.save()

        res.status(200).send()
        
    } catch(e) {
        res.status(500).send()
    }
})


// Find users
router.get('/users/me', auth ,async (req,res) => {
    res.send(req.user)
    

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
            res.status(500).send(e)
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

router.patch('/users/me', auth, async(req,res) => {
        const updates = Object.keys(req.body)
        const AllowedUpdates = ['name','email','password','age']
        const isValidOperation = updates.every((update)=> AllowedUpdates.includes(update))

        if(!isValidOperation){
            return res.status(400).send({error : 'Invalid Updates'})
        }
    
        try {
            updates.forEach((update)=> req.user[update] = req.body[update])
            await req.user.save()
          
            res.send(req.user)
        }catch(e) {
            res.status(400).send(e)
    }
})

//Delete user

router.delete('/users/me', auth, async (req,res) => {

    try {
        // const DeleteUser = await User.findByIdAndDelete(req.user._id)

        // if(!DeleteUser)
        // {
        //     res.status(404).send()
        // }
        
            // res.status(200).send(DeleteUser + ' has been deleted')

        await req.user.remove()
        res.send(req.user + ' has been deleted!')
    }catch(e) {
            res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000

    }, fileFilter (req, file, cb){
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return cb( new Error('File must be either png, jpeg, jpg'))
        }
        cb(undefined,true)
    }
})

//Create avatar & Update
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()

    req.user.avatar = buffer
    await req.user.save()

    res.send()
}, (error, req, res,next ) => {
    res.status(400).send({error: error.message})
})

//Delete Avatar

router.delete('/users/me/avatar', auth, async (req,res) => {
  
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    //     }
        
    // , (error, req,res,next) => {
    //     res.status(400).send ({error: error.message})
    
})



router.get('/users/:id/avatar',async (req,res) => { 
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error ()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

module.exports = router