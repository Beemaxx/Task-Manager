const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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



// sampletask.save().then(()=>{
//     console.log(sampletask)
// }).catch((error)=>{
//     console.log('Error', error)
// })

